import { ethers } from 'ethers';
import { decode } from '@msgpack/msgpack';
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
} from './helper'

let provider: any
let signer: any

declare const window: any

export function makeSignatureProvider(): SignatureProvider {
  return {
    async getAvailableKeys(): Promise<string[]> {
      return new Promise((resolve, reject) => {
        reject('not implemented');
      });
    },

    async sign({
      serializedTransaction
    }: SignatureProviderArgs): Promise<PushTransactionArgs> {
      return new Promise(async (resolve, reject) => {
        try {
          const decoded: any = decode(serializedTransaction)
          console.log('decoded', decoded)
  
          if ( decoded.contract ) {
            const { contract: decodedContract } = decoded

            const address = await signer.getAddress()
            const contract = new ethers.Contract(address, decodedContract.abi, provider)
            const connected = contract.connect(signer)
            const transaction = await connected.functions[decodedContract.method](...decodedContract.parameters)
            // let data = await contract.staticCall.transfer(toAddress, amount);

            resolve({
              signatures: transaction,
              serializedTransaction,
            })
          } else {
            let finalTransaction = { ...decoded }
            if ( decoded?.value && typeof decoded.value === 'string' ) {
              finalTransaction = {
                ...decoded,
                value: ethers.utils.parseEther(decoded.value),
              }
            }
            const sendTransaction = await signer.sendTransaction(finalTransaction)
            resolve({
              signatures: sendTransaction,
              serializedTransaction,
            })

          }
        } catch (error) {
          reject(error)
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
  } = args || {}

  return function makeWalletProvider(network: NetworkConfig): WalletProvider {
    console.log('web3WalletProvider:makeWalletProvider :: network', network)

    /** Verifies that the Web3 extension exists and password has been entered.  */
    function connect(appName: string): Promise<boolean> {
      return new Promise(async (resolve, reject) => {
        console.log('web3WalletProvider::web3WalletProvider::connect::appName', appName)
        console.log('network', network)
        // A Web3Provider wraps a standard Web3 provider, which is
        // what Metamask injects as window.ethereum into each page
        try {
          // provider = await new ethers.providers.Web3Provider(window.ethereum, 'any')
          // TODO: Remove the code below and it might be deprecated in future
          await window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum, 'any'))

          console.log('web3WalletProvider::web3WalletProvider::provider', provider)
          const accounts = await provider.send('eth_requestAccounts')
          console.log('web3WalletProvider::web3WalletProvider::accounts', accounts)
          signer = provider.getSigner()
          console.log('signer', signer)

          const network = await provider.getNetwork()
          console.log('network', network)
          const chainId = network.chainId
          console.log('chainId', chainId)


          // setup chainChanged listener
          // TODO: Update the types
          provider.on('network', (network: any, oldNetwork: any) => {
            console.log('CONNECT::netowrk changed event')
            console.log('network::new', network)
            console.log('network::oldNetwork', oldNetwork)
            console.log('network.chainId', network.chainId)
          })
        
          // setup accountsChanged listener
          // https://github.com/ethers-io/ethers.js/issues/1396
          // https://github.com/ethers-io/ethers.js/discussions/1560
          window.ethereum.on('accountsChanged', (accounts: any) => {
            console.log('CONNECT::accountsChanged changed event')
            console.log('accountsChanged::accounts', accounts)            
          })
          

          if (accounts.length > 0) {
            resolve(true)
          } else {
            reject('Web3: Error Getting Accounts')
          }
        } catch (error) {
          console.log('error', error)
          reject('Web3: Connect Error')
        }
      })
    }


    /**
     * This method is currently not supported as web3 wallets doesn't support this functionality
     * This method should list all the accounts user has in their wallet
     */
    async function discover(discoveryOptions: DiscoveryOptions): Promise<DiscoverResponse> {
      return new Promise(async (resolve, reject) => {
        reject('Web3: Discover is not supported')
      })
    }


    function disconnect(): Promise<boolean> {
      console.log('web3WalletProvider::disconnect')
      return Promise.resolve(true);
    }
    

    function login(accountName: string, authorization: string = WEB3_DEFAULT_PERMISSION) : Promise<WalletAuth> {
      return new Promise<WalletAuth>(async (resolve, reject) => {
        try {
          const accounts = await provider.send('eth_requestAccounts')
          const account = accounts[0]
          const output = {
            permission: 'active',
            accountName: account,
          }
          return resolve(output)  
        } catch (error) {
          reject(error)
        }
      })
    }

    function logout(accountName?: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }

    function signArbitrary(data: string, userMessage: string): Promise<any> {
      return new Promise(async (resolve, reject) => {
        try {
          const signedTransaction = await signer.signMessage(data)
          const splitSignature = ethers.utils.splitSignature(signedTransaction)
          resolve(signedTransaction)
        } catch (err) {
          reject(err) 
        }
      })
    }

    const walletProvider: WalletProvider = {
      id,
      meta: {
        name,
        shortName,
        description
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
