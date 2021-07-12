import { ethers, providers, Signer} from 'ethers';
import { decode, encode } from '@msgpack/msgpack';
import {
  WalletAuth,
  Web3WalletProviderOptions,
  WalletProvider,
  DiscoveryOptions,
  DiscoverResponse,
  SignatureProvider,
  SignatureProviderArgs,
  PushTransactionArgs,
  NetworkConfig,
} from './types';
import {
  WEB3_DEFAULT_PERMISSION,
} from './helper';

let provider: providers.Web3Provider;
let signer: Signer;

declare const window: any;

export function assertIsConnected(reject: any): void { 
  if(!provider) {
    reject('Not connected. Call connect() before using this function');
  }
}

export function makeSignatureProvider(): SignatureProvider {
  return {
    /** This doesn't exist in web3 provider */
    async getAvailableKeys(): Promise<string[]> {
      return new Promise((resolve, reject) => {
        reject('not implemented');
      });
    },

    /** Signs the provided transaction */
    async sign({
      serializedTransaction
    }: SignatureProviderArgs): Promise<PushTransactionArgs> {
      return new Promise(async (resolve, reject) => {
        try {
          assertIsConnected(reject)
          const decodedTransaction: any = decode(serializedTransaction);
  
          // if the decoded transaction contains a contract, execute specified function in the contract
          if ( decodedTransaction?.contract ) {
            const { contract: decodedContract } = decodedTransaction;

            const address = await signer.getAddress();
            const contract = new ethers.Contract(address, decodedContract.abi, provider);
            const connected = contract.connect(signer);
            const transaction = await connected.functions[decodedContract.method](...decodedContract.parameters);
            // let data = await contract.staticCall.transfer(toAddress, amount);

            resolve({
              signatures: transaction,
              serializedTransaction,
            });
          }
          // if the decoded transaction doesn't contain a contract, call sendTransaction on signer
          else {
            let finalTransaction = { ...decodedTransaction }
            // check if decodedTransaction?.value is present and if it's string, Parse it to ether
            if ( decodedTransaction?.value && typeof decodedTransaction.value === 'string' ) {
              finalTransaction = {
                ...decodedTransaction,
                value: ethers.utils.parseEther(decodedTransaction.value),
              }
            }
            const signedTransactionResult = await signer.sendTransaction(finalTransaction);
            const {v, r, s, raw} = signedTransactionResult
            const signature = (v && r && s) ? JSON.stringify({ v, r, s }) : null
            resolve({
              signatures: signature ? [signature] : [],
              serializedTransaction: encode(raw),
            });
          }
        } catch (error) {
          reject(error);
        }

      })
    },
  }
}



export function web3WalletProvider(
  args: Web3WalletProviderOptions
) {

  const {
    id = 'web3',
    name = 'Web3 Web Wallet',
    shortName = 'Web3',
    description = 'Use Web3 Web Wallet to sign your Ethereum transactions',
    errorTimeout,
    network
  } = args || {};

  let networkConfig: any;
  let selectedAccount: string;
  let currentNetwork: any;

  return function makeWalletProvider(network: NetworkConfig): WalletProvider {
    networkConfig = network;

    /** Connect with a web3 provider - usually browser extension like MetaMask */
    function connect(appName: string): Promise<boolean> {
      return new Promise(async (resolve, reject) => {
        // A Web3Provider wraps a standard Web3 provider, which is
        // what Metamask injects as window.ethereum into each page
        try {
          // create a new instance of ethers js using web3 provider
          await window.ethereum.enable().then(provider = (new ethers.providers.Web3Provider(window.ethereum, 'any')));
          const network = await provider.getNetwork(); // get the network

          // make sure user is connected to the same network as specified
          const specifiedNetworkId = parseInt(networkConfig?.chainId);
          const currentNetworkId = network?.chainId;
          if ( specifiedNetworkId !== currentNetworkId ) {
            throw new Error(`Invalid Network, Please select the specified network in the Wallet. Specified Network: ${JSON.stringify(networkConfig)} | Selected Network: ${JSON.stringify(network)}`);
          }

          signer = provider.getSigner(); // get and set the signer

          // get all accounts
          const accounts = await provider.send('eth_requestAccounts', [] ) || [];
          selectedAccount = accounts.length > 0 ? accounts[0] : null;

          // setup network change listener
          provider.on('network', (network: any, oldNetwork: any) => {
            currentNetwork = network;
            const currentNetworkId = parseInt(network?.chainId);
            if ( specifiedNetworkId !== currentNetworkId ) {
              throw new Error(`Invalid Network, Please select the specified network in the Wallet. Specified Network: ${JSON.stringify(networkConfig)} | Selected Network: ${JSON.stringify(network)}`);
            }
          })
        
          // setup account change listener
          // https://github.com/ethers-io/ethers.js/issues/1396
          // https://github.com/ethers-io/ethers.js/discussions/1560
          // TODO: Throw error on account change
          window.ethereum.on('accountsChanged', (accounts: any) => {
            const account = accounts.length > 0 ? accounts[0] : null;
            selectedAccount = account;
            console.log('accountsChanged - account, selectedAccount', account, selectedAccount);
          })

          if (provider) {
            resolve(true);
          } else {
            reject('Web3: Connect error');
          }
        } catch (error) {
          reject(`Web3: Connect Error: ${error}`);
        }
      });
    }


    /**
     * This method is currently not supported as web3 wallets doesn't support this functionality
     * This method should list all the accounts user has in their wallet
     */
    async function discover(discoveryOptions: DiscoveryOptions): Promise<DiscoverResponse> {
      return new Promise(async (resolve, reject) => {
        reject('Web3: Discover is not supported');
      });
    }

    /** disconnect method is not present in web3 provider (programmatically), User can directly disconnect from the extension */
    function disconnect(): Promise<boolean> {
      return Promise.resolve(true);
    }
    
    /** login is not required for web3 provider, connecting to wallet can be considered as login */
    function login(accountName: string, authorization: string = WEB3_DEFAULT_PERMISSION) : Promise<WalletAuth> {
      return new Promise<WalletAuth>(async (resolve, reject) => {
        assertIsConnected(reject)
        try {
          const accounts = await provider.send('eth_requestAccounts', [] );
          const account = accounts[0];
          const output = {
            permission: 'active',
            accountName: account,
          }
          return resolve(output);
        } catch (error) {
          reject(error);
        }
      });
    }

    /** Logout functionality is not present in web3 provider and cannot be implemented */
    function logout(accountName?: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }

    /** sign arbitrary string using web3 provider */
    function signArbitrary(data: string, userMessage: string): Promise<any> {
      return new Promise(async (resolve, reject) => {
        assertIsConnected(reject)
        try {
          const signedTransaction = await signer.signMessage(data);
          const splitSignature = ethers.utils.splitSignature(signedTransaction);
          resolve(signedTransaction)
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
          description: 'unspecified',
        },
      },
      signatureProvider: makeSignatureProvider(),
      connect,
      discover,
      disconnect,
      login,
      logout,
      signArbitrary
    }

    return walletProvider;

  }

}

export default web3WalletProvider;
