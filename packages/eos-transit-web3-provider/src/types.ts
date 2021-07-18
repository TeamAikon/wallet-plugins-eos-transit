export enum EthereumNetworkType {
  EthMain = 'eth_main',
  EthRopsten = 'eth_ropsten',
}

export type WalletAuth = {
  accountName: string;
  permission: string;
  publicKey?: string;
}

export type Web3WalletProviderOptions = {
  id: string;
  name: string;
  shortName: string;
  description?: string;
  errorTimeout?: number;
  network?: EthereumNetworkType;
}

export type WalletProviderMetadata = {
  id: string,
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

export interface WalletProvider {
  id: string;
  meta?: WalletProviderMetadata;
  signatureProvider: SignatureProvider;
  connect(appName: string): Promise<boolean>;
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

export type SignatureProvider = {
  /** Public keys associated with the private keys that the `SignatureProvider` holds */
  getAvailableKeys: () => Promise<string[]>;
  /** Sign a transaction */
  sign: (args: SignatureProviderArgs) => Promise<PushTransactionArgs>;
}

/** no discover options needed for Web3 */
export type DiscoveryOptions = {
}

export type SignatureProviderArgs = {
  serializedTransaction: Uint8Array;
  requiredKeys: string[];
}

export type PushTransactionArgs = {
  signatures: string[];
  serializedTransaction: Uint8Array;
}

export type DiscoverResponse = {
  keyToAccountMap: DiscoveryAccount[];
  keys?: {
    index: number;
    key: string | undefined;
  }[];
}

export type DiscoveryAccount = {
  index: number;
  key: string | undefined;
  accounts: {
    account: string;
    authorization: string;
  }[];
}

export type NetworkConfig = {
  name?: string;
  protocol?: string;
  host: string;
  port?: number;
  chainId: string;
}
