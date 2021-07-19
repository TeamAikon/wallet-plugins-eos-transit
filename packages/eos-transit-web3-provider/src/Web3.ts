import { ethers, providers, Signer } from 'ethers';
import { decode, encode } from '@msgpack/msgpack';

/** all Types used within Web3Plugin Class */

export type DiscoveryAccount = {
  index: number;
  key: string | undefined;
  accounts: {
    account: string;
    authorization: string;
  }[];
}

/** no discover options needed for Web3 */
export type DiscoveryOptions = {
}

export type DiscoverResponse = {
  keyToAccountMap: DiscoveryAccount[];
  keys?: {
    index: number;
    key: string | undefined;
  }[];
}

export type NetworkConfig = {
  name?: string;
  protocol?: string;
  host: string;
  port?: number;
  chainId: string;
}

export type PushTransactionArgs = {
  signatures: string[];
  serializedTransaction: Uint8Array;
}

export type SignatureProvider = {
  /** Public keys associated with the private keys that the `SignatureProvider` holds */
  getAvailableKeys: () => Promise<string[]>;
  /** Sign a transaction */
  sign: (args: SignatureProviderArgs) => Promise<PushTransactionArgs>;
}

export type SignatureProviderArgs = {
  serializedTransaction: Uint8Array;
  requiredKeys: string[];
}

export interface WalletProvider {
  id?: string;
  meta?: WalletProviderMetadata;
  signatureProvider: SignatureProvider;
  connect(appName: string, web3Provider?: providers.ExternalProvider): Promise<boolean>;
  discover(discoveryOptions: DiscoveryOptions): Promise<DiscoverResponse>;
  disconnect(): Promise<boolean>;
  login(
    accountName?: string,
    authorization?: string,
    index?: number,
    key?: string
  ): Promise<WalletAuth>;
  logout(accountName?: string): Promise<boolean>;
  signArbitrary(data: string, userMessage: string): Promise<string>;
}

export type WalletAuth = {
  accountName: string;
  permission: string;
  publicKey?: string;
}

export type WalletProviderMetadata = {
  id?: string,
  name?: string;
  shortName?: string;
  description?: string;
  isWalletInterface?: boolean;
  walletMetadata?: {
    name?: string;
    shortName?: string;
    description?: string;
  }
}

export const WEB3_DEFAULT_PERMISSION = 'active';


/**
 * Web3 plugin class, This contains all the common methods for all Web3 providers.
 * this supports browser based extensions and walletConnect
 */
class Web3Plugin {
  accountToPublicKeyCache: { account: string; publicKey: string }[] = [];
  discoveredAccounts: WalletAuth[] = [];
  loggedInAccount: WalletAuth | undefined;
  metaData: WalletProviderMetadata
  networkConfig: NetworkConfig;
  provider: providers.Web3Provider;
  selectedAccount: string | undefined;
  selectedNetwork: providers.Network | undefined;
  signer: Signer;
  
  constructor(metaData: WalletProviderMetadata) {
    this.metaData = metaData;

    // set the method binding here
    this.assertIsConnected = this.assertIsConnected.bind(this);
    this.connect = this.connect.bind(this);
    this.discover = this.discover.bind(this);
    this.getAvailableKeys = this.getAvailableKeys.bind(this);
    this.login = this.login.bind(this);
    this.makeSignatureProvider = this.makeSignatureProvider.bind(this);
    this.makeWalletProvider = this.makeWalletProvider.bind(this);
    this.setupEventListeners = this.setupEventListeners.bind(this);
    this.sign = this.sign.bind(this);
    this.signArbitrary = this.signArbitrary.bind(this);
  }

  /** Connect with the given provider and return boolen response. */
  connect(appName: string, web3Provider: providers.ExternalProvider): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        // create a new instance of ethers js using web3 provider
        this.provider = new ethers.providers.Web3Provider(web3Provider, 'any');
        // set the signer
        this.signer = this.provider.getSigner(); // get the signer from provider

        // setup the event listeners here.
        this.setupEventListeners();

        // return the response
        if (this.provider) {
          resolve(true);
        } else {
          reject(`${this.metaData.id}: Connect error`);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * This method returns a list of all the accounts reported by the wallet
   * For web3 providers, it can't get the publicKey from the wallet so we don't return it here
   */
  async discover(discoveryOptions?: DiscoveryOptions): Promise<DiscoverResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const accounts = await this.provider.listAccounts();
        const { accountMap, keys } = this.composeKeyToAccountMap(accounts);
        const response = {
          keyToAccountMap: accountMap,
          keys
        };
        this.discoveredAccounts = accountMap.map(am => ({
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

  /** Disconnect from the currently connected web3 provider */
  async disconnect(): Promise<boolean> {
    return Promise.resolve(true);
  }

  /** Login is not required for web3 provider, connecting to wallet can be considered as login */
  async login(accountName?: string, authorization: string = WEB3_DEFAULT_PERMISSION): Promise<WalletAuth> {
    return new Promise<WalletAuth>(async (resolve, reject) => {
      this.assertIsConnected(reject);
      try {
        await this.discover();
        if (accountName) {
          const account = this.discoveredAccounts.find(a => accountName === a.accountName);
          if (!account) {
            reject(
              `Account ${accountName} not found in wallet - can't login with it`
            );
          } else {
            resolve(account);
          }
        }
        if (!this.discoveredAccounts || this.discoveredAccounts.length === 0) {
          reject(
            'No accounts in wallet - please add or connect accounts in the wallet before logging in'
          );
        }
        const firstAccount = this.discoveredAccounts[0];
        this.loggedInAccount = firstAccount;
        resolve(firstAccount);
      } catch (error) {
        reject(error);
      }
    });
  }

  /** Logout functionality is not present in web3 provider and cannot be implemented */
  async logout(accountName?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.loggedInAccount = undefined;
      resolve(true);
    });
  }

  /** Sign arbitrary string using web3 provider 
    Returns the signed prefixed-message. This MUST treat:
    - Bytes as a binary message
    - string as a UTF8-message
    i.e. "0x1234" is a SIX (6) byte string, NOT 2 bytes of data  
  */
  async signArbitrary(data: string, userMessage: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.assertIsConnected(reject);
      try {
        const signature = await this.signer.signMessage(data);
        const dataHash = ethers.utils.hashMessage(data);
        const address = ethers.utils.verifyMessage(data, signature);
        const publicKey = this.getPublicKeyFromSignedHash(dataHash, signature);
        this.addToAccountToPublicKeyMap(address, publicKey);
        resolve(signature);
      } catch (err) {
        reject(err);
      }
    });
  }

  /** Signs the provided transaction */
  async sign({ serializedTransaction }: SignatureProviderArgs): Promise<PushTransactionArgs> {
    return new Promise(async (resolve, reject) => {
      try {
        this.assertIsConnected(reject);
        const decodedTransaction: any = decode(serializedTransaction);
        let signedTransaction: ethers.providers.TransactionResponse;
        // if the decoded transaction contains a contract, execute specified function in the contract
        if (decodedTransaction?.contract) {
          const { contract: decodedContract } = decodedTransaction;
          const contract = new ethers.Contract(
            decodedTransaction.to,
            decodedContract.abi,
            this.signer
          );
          const contractConnectedWithSigner = contract.connect(this.signer);
          signedTransaction = await contractConnectedWithSigner.functions[
            decodedContract.method
          ](...decodedContract.parameters);
        } else {
          signedTransaction = await this.signer.sendTransaction(decodedTransaction);
        }
        // extract and return signed transaction and signature
        const { hash, from, r, s, v, ...transaction } = this.mapTransactionResponseToTransaction(signedTransaction);
        const signature = ethers.utils.joinSignature({ r, s, v } as {r:string, s:string, v:number});
        const raw = ethers.utils.serializeTransaction(transaction);
        const msgHash = ethers.utils.keccak256(raw);
        const publicKey = this.getPublicKeyFromSignedHash(msgHash, signature);
        this.addToAccountToPublicKeyMap(from as string, publicKey);
        resolve({
          signatures: signature ? [signature] : [],
          serializedTransaction: encode(raw)
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /** Make the signature provider, this contains sign and getAvailableKeys methods */
  makeSignatureProvider(): SignatureProvider {
    return {
      sign: this.sign,
      getAvailableKeys: this.getAvailableKeys,
    }
  }

  /** This contains all the methods required and used by the eos-transit plugin */
  makeWalletProvider(): WalletProvider {
    return {
      id: this.metaData.id,
      meta: {
        name: this.metaData.name,
        shortName: this.metaData.shortName,
        description: this.metaData.description,
        isWalletInterface: this.metaData.isWalletInterface,
        walletMetadata: {
          name: this.metaData?.walletMetadata?.name,
          shortName: this.metaData?.walletMetadata?.shortName,
          description: this.metaData?.walletMetadata?.description
        }
      },
      signatureProvider: this.makeSignatureProvider(),
      connect: this.connect,
      discover: this.discover,
      disconnect: this.disconnect,
      login: this.login,
      logout: this.logout,
      signArbitrary: this.signArbitrary
    }
  }

  /** Helper Methods
   * These are all the helper methods used by this class and web3 providers.
   */

  /** Setup all event listeners here
   * Each subclass must use this method to setup event listeners
  */
  setupEventListeners() {
    // setup event listeners
  }

  /** Compose a map between public keys and the accounts/permission used by each one */
  private composeKeyToAccountMap(accounts: string[]) {
    const accountMap: DiscoveryAccount[] = accounts?.map((account, index) => {
      const publicKey = this.accountToPublicKeyCache.find(
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

  /** Check if the provider exists or not. If not throw */
  private assertIsConnected(reject: any): void {
    if (!this.provider) {
      reject('Not connected. Call connect() before using this function');
    }
  }

  /** Extract a public key using the transaction/message hash and signature */
  private getPublicKeyFromSignedHash(messageHash: string, signature: string): string {
    const msgHashBytes = ethers.utils.arrayify(messageHash);
    let publicKey = ethers.utils.recoverPublicKey(msgHashBytes, signature);
    return publicKey;  
  }

  /** Add a newly used public key so that it can show up next time discover is called */
  private addToAccountToPublicKeyMap(account: string, publicKey: string) {
    const newKey = { account, publicKey };
    this.accountToPublicKeyCache.push(newKey);  
  }

  /** Extract the raw transaction from sign response (remove unnecessary fields) */
  private mapTransactionResponseToTransaction(transactionResponse: ethers.providers.TransactionResponse) {
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

  /** Web3 provider doesn't support discovering keys from the wallet. */
  private async getAvailableKeys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      reject(`${this.metaData.id}: getAvailableKeys is not supported`);
    });
  }

}

export default Web3Plugin;
