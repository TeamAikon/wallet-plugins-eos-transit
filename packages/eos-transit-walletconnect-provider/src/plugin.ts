import { ethers, providers, Signer } from 'ethers';
import { decode, encode } from '@msgpack/msgpack';
import {
  DiscoveryAccount,
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

let provider: providers.Web3Provider;
let signer: Signer;
let accountToPublicKeyCache: { account: string; publicKey: string }[] = [];
let discoveredAccounts: WalletAuth[];

declare const window: any;

export function assertIsConnected(reject: any): void {
  if (!provider) {
    reject('Not connected. Call connect() before using this function');
  }
}

/** extract the raw transaction from sign response (remove unnecessary fields) */
function mapTransactionResponseToTransaction(
  transactionResponse: ethers.providers.TransactionResponse
) {
  const {
    to,
    from,
    nonce,
    gasLimit,
    gasPrice,
    data,
    value,
    chainId,
    r,
    s,
    v
  } = transactionResponse;
  const transaction = {
    to,
    from,
    nonce,
    gasLimit,
    gasPrice,
    data,
    value,
    chainId,
    r,
    s,
    v
  };
  return transaction as ethers.Transaction;
}

export function makeSignatureProvider(): SignatureProvider {
  return {
    /** Web3 provider doesn't support discovering keys from the wallet. */
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
          let signedTransaction: ethers.providers.TransactionResponse;
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
          const { hash, from, r, s, v, ...transaction } = mapTransactionResponseToTransaction(signedTransaction);
          const signature = ethers.utils.joinSignature({ r, s, v } as {r:string, s:string, v:number});
          const raw = ethers.utils.serializeTransaction(transaction);
          const msgHash = ethers.utils.keccak256(raw);
          const publicKey = getPublicKeyFromSignedHash(msgHash, signature);
          console.log('sign address:', from);
          console.log('sign public key:', publicKey);
          addToAccountToPublicKeyMap(from as string, publicKey);
          resolve({
            signatures: signature ? [signature] : [],
            serializedTransaction: encode(raw)
          });
        } catch (error) {
          reject(error);
        }
      });
    }
  };
}

/** add a newly used public key so that it can show up next time discover is called */
function addToAccountToPublicKeyMap(account: string, publicKey: string) {
  const newKey = { account, publicKey };
  accountToPublicKeyCache.push(newKey);
}

/** extract a public key using the transaction/message hash and signature */
export function getPublicKeyFromSignedHash(
  messageHash: string,
  signature: string
) {
  const msgHashBytes = ethers.utils.arrayify(messageHash);
  let publicKey = ethers.utils.recoverPublicKey(msgHashBytes, signature);
  return publicKey;
}

export function web3WalletProvider(args: Web3WalletProviderOptions) {
  const {
    id = 'web3',
    name = 'Web3 Web Wallet',
    shortName = 'Web3',
    description = 'Use Web3 Web Wallet to sign your Ethereum transactions',
    errorTimeout,
    network
  } = args || {};

  let networkConfig: NetworkConfig;
  let selectedAccount: string | undefined;
  let selectedNetwork: ethers.providers.Network | undefined;
  let loggedInAccount: WalletAuth | undefined;

  return function makeWalletProvider(network: NetworkConfig): WalletProvider {
    networkConfig = network;

    /** Connect with a web3 provider - usually browser extension like MetaMask */
    function connect(appName: string): Promise<boolean> {
      return new Promise(async (resolve, reject) => {
        // A Web3Provider wraps a standard Web3 provider, which is
        // what Metamask injects as window.ethereum into each page
        try {
          // create a new instance of ethers js using web3 provider
          await window.ethereum
            .enable()
            .then(
              (provider = new ethers.providers.Web3Provider(
                window.ethereum,
                'any'
              ))
            );
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
      const { chainIdInt, chainIdHex } = getChainIdFromNetwork(requiredNetwork);
      if (selectedNetwork?.chainId === chainIdInt) return;
      // propmt the user to select the correct network
      await window?.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }]
      });
      selectedNetwork = await provider.getNetwork();
      // if desired network not selected, throw
      assertIsDesiredNetwork(requiredNetwork);
    }

    /** reject if requiredNetwork is not already selected in the wallet */
    function assertIsDesiredNetwork(
      requiredNetwork: any & { chainId: number | string }
    ): void {
      const { chainIdInt } = getChainIdFromNetwork(requiredNetwork);
      if (selectedNetwork?.chainId !== chainIdInt) {
        const errMsg = `Desired network not selected in wallet: Please select the it using the Wallet. Specified Network: ${JSON.stringify(
          requiredNetwork
        )}`;
        throw new Error(errMsg);
      }
    }

    /** convert network chainId to int if needed */
    function getChainIdFromNetwork(
      network: any & { chainId: number | string }
    ): { chainIdInt: number; chainIdHex: string } {
      const { chainId } = network;
      const chainIdInt = isAString(chainId) ? parseInt(chainId) : chainId;
      const chainIdHex = `0x${chainIdInt}`;
      return { chainIdInt, chainIdHex };
    }

    /** called when wallet user changes network */
    function onSelectNetwork(
      network: ethers.providers.Network,
      oldNetwork: ethers.providers.Network
    ): void {
      selectedNetwork = network;
      discover();
    }

    /** called when wallet user changes accounts */
    function onSelectAccount(accounts: string[]) {
      const account = accounts?.length > 0 ? accounts[0] : undefined;
      selectedAccount = account;
      discover();
    }

    /**
     * This method returns a list of all the accounts reported by the wallet
     * For web3, it can't get the publicKey from the wallet so we don't return it here
     */
    async function discover(
      discoveryOptions?: DiscoveryOptions
    ): Promise<DiscoverResponse> {
      return new Promise(async (resolve, reject) => {
        try {
          const accounts = await provider.listAccounts();
          const { accountMap, keys } = composeKeyToAccountMap(accounts);
          const response = {
            keyToAccountMap: accountMap,
            keys
          };
          discoveredAccounts = accountMap.map(am => ({
            publicKey: am.key,
            accountName: am.accounts[0].account,
            permission: am.accounts[0].authorization
          }));
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    }

    // Example: keyToAccountMap: [{
    //   index: 0,
    //   key: {publicKey},
    //   accounts: [{
    //       account: {chainAccount},
    //       authorization: ‘active’
    //   }]
    // },{
    /** compose a map between public keys and the accounts/permission used by each one */
    function composeKeyToAccountMap(accounts: string[]) {
      const accountMap: DiscoveryAccount[] = accounts?.map((account, index) => {
        const publicKey = accountToPublicKeyCache.find(
          a => a.account === account
        )?.publicKey;
        let keyMap = {
          index,
          key: publicKey, // if we have a public key in the cache (captured when signing a tx), add it here)
          accounts: [
            {
              account,
              authorization: 'active'
            }
          ]
        };
        return keyMap;
      });
      const keys = accountMap.map(km => ({ index: km.index, key: km?.key }));
      return { accountMap, keys };
    }

    /** disconnect method is not supported by web3 provider (programmatically), User can directly disconnect from the wallet/extension */
    function disconnect(): Promise<boolean> {
      return Promise.resolve(true);
    }

    /** login is not required for web3 provider, connecting to wallet can be considered as login */
    async function login(
      accountName?: string,
      authorization: string = WEB3_DEFAULT_PERMISSION
    ): Promise<WalletAuth> {
      return new Promise<WalletAuth>(async (resolve, reject) => {
        assertIsConnected(reject);
        try {
          await discover();
          if (accountName) {
            const account = discoveredAccounts.find(a => accountName === a.accountName);
            if (!account) {
              reject(
                `Account ${accountName} not found in wallet - can't login with it`
              );
            } else {
              resolve(account);
            }
          }
          if (!discoveredAccounts || discoveredAccounts.length === 0) {
            reject(
              'No accounts in wallet - please add or connect accounts in the wallet before logging in'
            );
          }
          const firstAccount = discoveredAccounts[0];
          loggedInAccount = firstAccount;
          resolve(firstAccount);
        } catch (error) {
          reject(error);
        }
      });
    }

    /** Logout functionality is not present in web3 provider and cannot be implemented */
    function logout(accountName?: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        loggedInAccount = undefined;
        resolve(true);
      });
    }

    /** sign arbitrary string using web3 provider 
        Returns the signed prefixed-message. This MUST treat:
        - Bytes as a binary message
        - string as a UTF8-message
        i.e. "0x1234" is a SIX (6) byte string, NOT 2 bytes of data  
      */
    function signArbitrary(data: string, userMessage: string): Promise<string> {
      return new Promise(async (resolve, reject) => {
        assertIsConnected(reject);
        try {
          const signature = await signer.signMessage(data);
          const dataHash = ethers.utils.hashMessage(data);
          const address = ethers.utils.verifyMessage(data, signature);
          const publicKey = getPublicKeyFromSignedHash(dataHash, signature);
          console.log('signArbitrary address:', address);
          console.log('signArbitrary public key:', publicKey);
          addToAccountToPublicKeyMap(address, publicKey);
          resolve(signature);
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
        isWalletInterface: true, // web3 is a wallet abstraction - not a specific wallet
        walletMetadata: {
          name: 'unspecified', // TODO: Get wallet name from web3 provider
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

export default web3WalletProvider;
