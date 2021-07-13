import { ethers, providers, Signer } from 'ethers';
import { decode, encode } from '@msgpack/msgpack';
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  DiscoverResponse,
  DiscoveryOptions,
  NetworkConfig,
  PushTransactionArgs,
  SignatureProvider,
  SignatureProviderArgs,
  Web3WalletProviderOptions,
  WalletAuth,
  WalletProvider
} from './types';
import { isAString, WEB3_DEFAULT_PERMISSION } from './helper';

interface WalletConnectProviderWithExtraProps extends providers.Web3Provider {
  disconnect? : any
}

let provider: WalletConnectProviderWithExtraProps;
let signer: Signer;

declare const window: any;

export function assertIsConnected(reject: any): void {
  if (!provider) {
    reject('Not connected. Call connect() before using this function');
  }
}

/** extract the raw transaction from sign response (remove unnecessary fields) */
function mapTransactionResponseToTransaction(transactionResponse: ethers.providers.TransactionResponse) {
  const {
    hash,
    blockNumber,
    blockHash,
    timestamp,
    confirmations,
    from,
    raw,
    wait,
    ...transaction // everything that is not destructured above is the transaction
  } = transactionResponse
  return encode(transaction as ethers.Transaction, { sortKeys: true });
}

export function makeSignatureProvider(): SignatureProvider {
  return {
    /** walletConnect provider doesn't support discovering keys from the wallet. */
    async getAvailableKeys(): Promise<string[]> {
      return new Promise((resolve, reject) => {
        reject('Web3: getAvailableKeys is not supported');
      });
    },

    /** Signs the provided transaction */
    async sign({
      serializedTransaction
    }: SignatureProviderArgs): Promise<PushTransactionArgs> {
      return new Promise(async (resolve, reject) => {
        try {
          assertIsConnected(reject);
          const decodedTransaction: any = decode(serializedTransaction);
          let signedTransaction
          // if the decoded transaction contains a contract, execute specified function in the contract
          if (decodedTransaction?.contract) {
            const { contract: decodedContract } = decodedTransaction;
            const contract = new ethers.Contract(
              decodedTransaction.to,
              decodedContract.abi,
              provider
            );
            const contractConnectedWithSigner = contract.connect(signer);
            signedTransaction = await contractConnectedWithSigner.functions[
              decodedContract.method
            ](...decodedContract.parameters);
          } else {
            signedTransaction = await signer.sendTransaction(decodedTransaction);
          }
          // extract and return signed transaction and signature
          const rawTransaction = mapTransactionResponseToTransaction(signedTransaction);
          const { v, r, s } = signedTransaction;
          const signature = v && r && s ? JSON.stringify({ v, r, s }) : null;
          resolve({
            signatures: signature ? [signature] : [],
            serializedTransaction: rawTransaction
          });
        } catch (error) {
          reject(error);
        }
      });
    }
  };
}

export function walletConnectWeb3WalletProvider(args: Web3WalletProviderOptions) {
  const {
    id = 'web3',
    name = 'Wallet Connect Web3 Wallet',
    shortName = 'WalletConnect',
    description = 'Use Wallet Connect Wallet to sign your Ethereum transactions',
    errorTimeout,
    network
  } = args || {};

  let networkConfig: NetworkConfig;
  let selectedAccount: string | undefined;
  let selectedNetwork: ethers.providers.Network | undefined;
  let loggedInAccount: WalletAuth | undefined;

  return function makeWalletProvider(network: NetworkConfig): WalletProvider {
    networkConfig = network;

    /** Connect with a walletConnect provider - usually applications like Trust Wallet, CoinBase Wallet, etc */
    function connect(appName: string): Promise<boolean> {
      return new Promise(async (resolve, reject) => {
        // A Web3Provider wraps a standard Web3 provider, which is
        // what Metamask injects as window.ethereum into each page
        try {
          // create a new instance of ethers js using walletConnect provider
          const walletConnectProvider = new WalletConnectProvider({
            infuraId: '27e484dcd9e3efcfd25a83a78777cdf1',
            qrcode: true,
            rpc: {
              1: "https://mainnet.infura.io/v3/4807102366a64a28b33e10d8751c9404",
              3: "https://ropsten.infura.io/v3/4807102366a64a28b33e10d8751c9404",
            },          
          });
          await walletConnectProvider.enable();
          provider = new ethers.providers.Web3Provider(walletConnectProvider);

          // get the currently selected network
          selectedNetwork = await provider.getNetwork();
          // confirm current selected network matches requested network
          await popupSelectDesiredNetworkIfNeeded(networkConfig);
          signer = provider.getSigner(); // get the signer

          // set the first account as currently selected
          selectedAccount = (await login()).accountName;
          // setup network change listener
          provider.on('network', onSelectNetwork);
          // setup account change listener
          // https://github.com/ethers-io/ethers.js/issues/1396
          // https://github.com/ethers-io/ethers.js/discussions/1560
          window.ethereum.on('accountsChanged', onSelectAccount);

          if (provider) {
            resolve(true);
          } else {
            reject('Web3: Connect error');
          }
        } catch (error) {
          reject(error);
        }
      });
    }

    /** if requiredNetwork is not already selected in the wallet, trigger the wallet to prmompt the user to select the network */
    async function popupSelectDesiredNetworkIfNeeded(
      requiredNetwork: any & { chainId: number | string }
    ): Promise<void> {
      const { chainIdInt, chainIdHex } = getChainIdFromNetwork(requiredNetwork)
      if (selectedNetwork?.chainId === chainIdInt) return;
      // propmt the user to select the correct network
      await window?.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }]
      });
      selectedNetwork = await provider.getNetwork();
      // if desired network not selected, throw
      assertIsDesiredNetwork(requiredNetwork)
    }

    /** reject if requiredNetwork is not already selected in the wallet */
    function assertIsDesiredNetwork(
      requiredNetwork: any & { chainId: number | string }
    ): void {
      const { chainIdInt } = getChainIdFromNetwork(requiredNetwork)
      if (selectedNetwork?.chainId !== chainIdInt) {
        const errMsg = `Desired network not selected in wallet: Please select the it using the Wallet. Specified Network: ${JSON.stringify(
          requiredNetwork
        )}`;
        throw new Error(errMsg);
      }
    }

    /** convert network chainId to int if needed */
    function getChainIdFromNetwork(network: any & { chainId: number | string }): { chainIdInt: number, chainIdHex: string } {
      const { chainId } = network;
      const chainIdInt = isAString(chainId) ? parseInt(chainId) : chainId;
      const chainIdHex = `0x${chainIdInt}`
      return { chainIdInt, chainIdHex }
    }

    /** called when wallet user changes network */
    function onSelectNetwork(
      network: ethers.providers.Network,
      oldNetwork: ethers.providers.Network
    ): void {
      selectedNetwork = network;
    }

    /** called when wallet user changes accounts */
    function onSelectAccount(accounts: string[]) {
      const account = accounts?.length > 0 ? accounts[0] : undefined;
      selectedAccount = account;
    }

    /**
     * This method returns a list of all the accounts reported by the wallet
     * For walletConnect, it can't get the publicKey from the wallet so we don't return it here
     */
    async function discover(
      discoveryOptions?: DiscoveryOptions
    ): Promise<DiscoverResponse> {
      return new Promise(async (resolve, reject) => {
        try {
          const accounts = await provider.listAccounts();
          const response = accounts?.map(
            account =>
              ({
                accountName: account,
                permission: 'active'
              } as WalletAuth)
          );
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    }

    /** disconnect from the walletConnect provider */
    function disconnect(): Promise<boolean> {
      return new Promise(async (resolve, reject) => {
        try {
          await provider?.disconnect();
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    }

    /** login is not required for walletConnect provider, connecting to wallet can be considered as login */
    async function login(
      accountName?: string,
      authorization: string = WEB3_DEFAULT_PERMISSION
    ): Promise<WalletAuth> {
      return new Promise<WalletAuth>(async (resolve, reject) => {
        assertIsConnected(reject);
        try {
          const accounts = await discover();
          if (accountName) {
            const account = accounts.find(a => accountName === a.accountName);
            if (!account) {
              reject(
                `Account ${accountName} not found in wallet - can't login with it`
              );
            } else {
              resolve(account);
            }
          }
          if (!accounts || accounts.length === 0) {
            reject(
              'No accounts in wallet - please add or connect accounts in the wallet before logging in'
            );
          }
          const firstAccount = accounts[0];
          loggedInAccount = firstAccount;
          resolve(firstAccount);
        } catch (error) {
          reject(error);
        }
      });
    }

    /** Logout functionality is not present in walletConnect provider but disconnect method is present */
    function logout(accountName?: string): Promise<boolean> {
      return new Promise(async (resolve, reject) => {
        loggedInAccount = undefined;
        await disconnect();
        resolve(true);
      });
    }

    /** sign arbitrary string using walletConnect provider */
    function signArbitrary(data: string, userMessage: string): Promise<string> {
      return new Promise(async (resolve, reject) => {
        assertIsConnected(reject);
        try {
          const signedTransaction = await signer.signMessage(data);
          resolve(signedTransaction);
        } catch (err) {
          reject(err);
        }
      });
    }

    /** return the wallet provider */
    const walletProvider: WalletProvider = {
      id,
      meta: {
        name,
        shortName,
        description,
        isWalletInterface: true,
        walletMetadata: {
          name: 'unspecified',
          shortName: 'unspecified',
          description: 'unspecified'
        }
      },
      signatureProvider: makeSignatureProvider(),
      connect,
      discover,
      disconnect,
      login,
      logout,
      signArbitrary
    };

    return walletProvider;
  };
}

export default walletConnectWeb3WalletProvider;
