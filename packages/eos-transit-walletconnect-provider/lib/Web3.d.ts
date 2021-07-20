import { providers, Signer } from 'ethers';
/** all Types used within Web3Plugin Class */
export declare type DiscoveryAccount = {
    index: number;
    key: string | undefined;
    accounts: {
        account: string;
        authorization: string;
    }[];
};
/** no discover options needed for Web3 */
export declare type DiscoveryOptions = {};
export declare type DiscoverResponse = {
    keyToAccountMap: DiscoveryAccount[];
    keys?: {
        index: number;
        key: string | undefined;
    }[];
};
export declare enum EthereumNetworkType {
    EthMain = "eth_main",
    EthRopsten = "eth_ropsten"
}
export declare type NetworkConfig = {
    name?: string;
    protocol?: string;
    host: string;
    port?: number;
    chainId: string;
};
export declare type PushTransactionArgs = {
    signatures: string[];
    serializedTransaction: Uint8Array;
};
export declare type SignatureProvider = {
    /** Public keys associated with the private keys that the `SignatureProvider` holds */
    getAvailableKeys: () => Promise<string[]>;
    /** Sign a transaction */
    sign: (args: SignatureProviderArgs) => Promise<PushTransactionArgs>;
};
export declare type SignatureProviderArgs = {
    serializedTransaction: Uint8Array;
    requiredKeys: string[];
};
export interface WalletProvider {
    id?: string;
    meta?: WalletProviderMetadata;
    signatureProvider: SignatureProvider;
    connect(appName: string, web3Provider?: providers.ExternalProvider): Promise<boolean>;
    discover(discoveryOptions: DiscoveryOptions): Promise<DiscoverResponse>;
    disconnect(): Promise<boolean>;
    login(accountName?: string, authorization?: string, index?: number, key?: string): Promise<WalletAuth>;
    logout(accountName?: string): Promise<boolean>;
    signArbitrary(data: string, userMessage: string): Promise<string>;
}
export declare type WalletAuth = {
    accountName: string;
    permission: string;
    publicKey?: string;
};
export declare type WalletProviderMetadata = {
    id?: string;
    name?: string;
    shortName?: string;
    description?: string;
    isWalletInterface?: boolean;
    walletMetadata?: {
        name?: string;
        shortName?: string;
        description?: string;
    };
};
export declare type Web3WalletProviderOptions = {
    id: string;
    name: string;
    shortName: string;
    description?: string;
    errorTimeout?: number;
    network?: EthereumNetworkType;
};
export declare type Web3WalletProviderAdditionalOptions = {
    errorTimeout?: number;
    network?: EthereumNetworkType;
};
/** Export all helper functions */
/** Check if the given value is a string or instance of string */
export declare function isAString(value: any): boolean;
/** Clone and return a new object without given keys */
export declare function cloneObjectWithoutSpecificKeys(originalObject: Object, keysToRemove: string[]): Object;
export declare const WEB3_DEFAULT_PERMISSION = "active";
/**
 * Web3 plugin class, This contains all the common methods for all Web3 providers.
 * this supports browser based extensions and walletConnect
 */
declare class Web3Plugin {
    accountToPublicKeyCache: {
        account: string;
        publicKey: string;
    }[];
    discoveredAccounts: WalletAuth[];
    loggedInAccount: WalletAuth | undefined;
    metaData: WalletProviderMetadata;
    additionalOptions: Web3WalletProviderAdditionalOptions;
    networkConfig: NetworkConfig;
    provider: providers.Web3Provider;
    selectedAccount: string | undefined;
    selectedNetwork: providers.Network | undefined;
    signer: Signer;
    constructor(metaData: WalletProviderMetadata, additionalOptions: Web3WalletProviderAdditionalOptions);
    /** Connect with the given provider and return boolen response. */
    connect(appName: string, web3Provider: providers.ExternalProvider): Promise<boolean>;
    /**
     * This method returns a list of all the accounts reported by the wallet
     * For web3 providers, it can't get the publicKey from the wallet so we don't return it here
     */
    discover(discoveryOptions?: DiscoveryOptions): Promise<DiscoverResponse>;
    /** Disconnect from the currently connected web3 provider */
    disconnect(): Promise<boolean>;
    /** Login is not required for web3 provider, connecting to wallet can be considered as login */
    login(accountName?: string, authorization?: string): Promise<WalletAuth>;
    /** Logout functionality is not present in web3 provider and cannot be implemented */
    logout(accountName?: string): Promise<boolean>;
    /** Sign arbitrary string using web3 provider
      Returns the signed prefixed-message. This MUST treat:
      - Bytes as a binary message
      - string as a UTF8-message
      i.e. "0x1234" is a SIX (6) byte string, NOT 2 bytes of data
    */
    signArbitrary(data: string, userMessage: string): Promise<string>;
    /** Signs the provided transaction */
    sign({ serializedTransaction }: SignatureProviderArgs): Promise<PushTransactionArgs>;
    /** Make the signature provider, this contains sign and getAvailableKeys methods */
    makeSignatureProvider(): SignatureProvider;
    /** This contains all the methods required and used by the eos-transit plugin */
    makeWalletProvider(network: NetworkConfig): WalletProvider;
    /** Helper Methods
     * These are all the helper methods used by this class and web3 providers.
     */
    /** Setup all event listeners here
     * Each subClass must implement this method to setup event listeners
    */
    setupEventListeners(): void;
    /** Compose a map between public keys and the accounts/permission used by each one */
    private composeKeyToAccountMap;
    /** Check if the provider exists or not. If not throw */
    private assertIsConnected;
    /** Extract a public key using the transaction/message hash and signature */
    private getPublicKeyFromSignedHash;
    /** Add a newly used public key so that it can show up next time discover is called */
    private addToAccountToPublicKeyMap;
    /** Extract the raw transaction from sign response (remove unnecessary fields) */
    private mapTransactionResponseToTransaction;
    /** Web3 provider doesn't support discovering keys from the wallet. */
    private getAvailableKeys;
}
export default Web3Plugin;
