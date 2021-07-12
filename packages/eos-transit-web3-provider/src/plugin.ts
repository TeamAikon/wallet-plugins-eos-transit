import { ethers, providers, Signer } from 'ethers';
import { decode, encode } from '@msgpack/msgpack';
import {
  DiscoverResponse,
  DiscoveryOptions,
  NetworkConfig,
  PushTransactionArgs,
  SignatureProvider,
  SignatureProviderArgs,
  Web3WalletProviderOptions,
  WalletAuth,
  WalletProvider,
} from './types';
import { WEB3_DEFAULT_PERMISSION } from './helper';

let provider: providers.Web3Provider;
let signer: Signer;
let loggedInAccount: WalletAuth | undefined;

declare const window: any;

export function assertIsConnected(reject: any): void {
  if (!provider) {
    reject('Not connected. Call connect() before using this function');
  }
}

/** get the raw transaction from response and remove unnecessary fields */
function getRawTransaction(transaction: ethers.providers.TransactionResponse) {
  const rawTransactionObject: ethers.Transaction = {
    hash: transaction?.hash,
    to: transaction?.to,
    from: transaction?.from,
    nonce: transaction?.nonce,
    gasLimit: transaction?.gasLimit,
    gasPrice: transaction?.gasPrice,
    data: transaction?.data,
    value: transaction?.value,
    chainId: transaction?.chainId,
    r: transaction?.r,
    s: transaction?.s,
    v: transaction?.v,
    type: transaction?.type,
    accessList: transaction?.accessList,
    maxPriorityFeePerGas: transaction?.maxPriorityFeePerGas,
    maxFeePerGas: transaction?.maxFeePerGas,
  }
  return encode(rawTransactionObject, { sortKeys: true });
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

          // if the decoded transaction contains a contract, execute specified function in the contract
          if (decodedTransaction?.contract) {
            const { contract: decodedContract } = decodedTransaction;

            const address = await signer.getAddress();
            const contract = new ethers.Contract(
              decodedTransaction.to,
              decodedContract.abi,
              provider
            );
            const contractConnectedWithSigner = contract.connect(signer);

            // Web3 wallet expects the value to be a valid BigNumber not a string
            // Either convert the value to BN here to send BN as value in the transaction
            const contractParameters = [ ...decodedContract.parameters ];
            contractParameters[1] = ethers.utils.parseEther(contractParameters[1].toString());

            const transaction = await contractConnectedWithSigner.functions[
              decodedContract.method
            ](...contractParameters);

            const rawTransaction = getRawTransaction(transaction);
            const { v, r, s } = transaction;
            const signature = v && r && s ? JSON.stringify({ v, r, s }) : null;
            resolve({
              signatures: signature ? [signature] : [],
              serializedTransaction: rawTransaction
            });

          }
          // if the decoded transaction doesn't contain a contract, call sendTransaction on signer
          else {
            let finalTransaction = { ...decodedTransaction };
            // check if decodedTransaction?.value is present and if it's string, Parse it to ether
            if (
              decodedTransaction?.value &&
              typeof decodedTransaction.value === 'string'
            ) {
              finalTransaction = {
                ...decodedTransaction,
                value: ethers.utils.parseEther(decodedTransaction.value)
              };
            }
            const signedTransactionResult = await signer.sendTransaction(
              finalTransaction
            );
            const rawTransaction = getRawTransaction(signedTransactionResult);
            const { v, r, s } = signedTransactionResult;
            const signature = v && r && s ? JSON.stringify({ v, r, s }) : null;
            resolve({
              signatures: signature ? [signature] : [],
              serializedTransaction: rawTransaction
            });
          }
        } catch (error) {
          reject(error);
        }
      });
    }
  };
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

  let networkConfig: any;
  let selectedAccount: string | undefined;
  let selectedNetwork: ethers.providers.Network | undefined;

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
          selectedNetwork = await provider.getNetwork(); // get the currently selected network
          // TODO: If selectedNetwork.chainId !== networkConfig.chainId - THEN prompt used to select correct network - or select it automatically 
          // confirm current selected network matches requested network
          assertIsDesiredNetwork(networkConfig);
          signer = provider.getSigner(); // get and set the signer

          // set the first account as currently selected
          selectedAccount = (await login()).accountName
          // setup network change listener
          provider.on('network', changeNetwork);

          // setup account change listener
          // https://github.com/ethers-io/ethers.js/issues/1396
          // https://github.com/ethers-io/ethers.js/discussions/1560
          // TODO: Throw error on account change
          window.ethereum.on('accountsChanged', changeAccount);

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

    /** reject if requiredNetwork is not already selected in the wallet */
    function assertIsDesiredNetwork(
      // requiredNetwork: ethers.providers.Network,
      requiredNetwork: Omit<ethers.providers.Network, 'chainId'> & {chainId: any},
      reject?: any
    ): void {
      // TODO: selectedNetwork?.chainId type is number, requiredNetwork?.chainId type is string - fix it
      if (selectedNetwork?.chainId !== parseInt(requiredNetwork?.chainId)) {
        const errMsg = `Desired network not selected in wallet: Please select the it using the Wallet. Specified Network: ${JSON.stringify(
          requiredNetwork
        )}`;
        if(reject) reject(errMsg);
        throw new Error(errMsg)
      }
    }

    /** called when wallet user changes network */
    function changeNetwork(
      network: ethers.providers.Network,
      oldNetwork: ethers.providers.Network
    ): void {
      console.log('Selected network:', network);
      assertIsDesiredNetwork(network);
      selectedNetwork = network;
    }

    /** called when wallet user changes accounts */
    function changeAccount(accounts: string[]) {
      const account = accounts?.length > 0 ? accounts[0] : undefined;
      selectedAccount = account;
      console.log(
        'accountsChanged - accounts, selectedAccount',
        accounts,
        selectedAccount
      );
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

    /** Logout functionality is not present in web3 provider and cannot be implemented */
    function logout(accountName?: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        loggedInAccount = undefined;
        resolve(true);
      });
    }

    /** sign arbitrary string using web3 provider */
    function signArbitrary(data: string, userMessage: string): Promise<any> {
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

export default web3WalletProvider;
