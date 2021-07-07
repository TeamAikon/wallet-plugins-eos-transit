export interface Web3Type {
  connect(): Promise<boolean>;
  accounts(props: ConnectProps): Promise<Web3AccountInfo[]>;
  sign(TxnObject: TxnObject): Promise<Web3SignSuccessResponse>;
  send(props: SignProps): Promise<Web3TransactionSuccessResponse>;
}
interface ConnectProps {
  ledger: string;
}
export interface TxnObject {
  to: string;
  from: string;
  fee: number;
  type: EthereumTransactionTypeCode;
  amount: number;
  firstRound: number;
  lastRound: number;
  genesisID: string;
  genesisHash: string;
  note: string;
}
interface SignProps {
  tx: string;
  ledger: string;
}

export enum EthereumTransactionTypeCode {
  AssetConfig = 'acfg',
  AssetFreeze = 'afrz',
  AssetTransfer = 'axfer',
  KeyRegistration = 'keyreg',
  Payment = 'pay'
}

export interface Web3AccountInfo {
  address: string;
}
export interface Web3SignSuccessResponse {
  txID: string;
  blob: string;
}
export interface Web3TransactionSuccessResponse {
  txId: string;
}

declare global {
  var Web3: Web3Type;
}

export enum EthereumNetworkType {
  eth_main = 'eth_main',
  eth_ropsten = 'eth_ropsten',
}

export interface WalletAuth {
  accountName: string;
  permission: string;
  publicKey?: string;
}

export interface Web3WalletProviderOptions {
  id: string;
  name: string;
  shortName: string;
  description?: string;
  errorTimeout?: number;
  network?: EthereumNetworkType;
}

export interface WalletProviderMetadata {
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

export interface SignatureProvider {
  /** Public keys associated with the private keys that the `SignatureProvider` holds */
  getAvailableKeys: () => Promise<string[]>;
  /** Sign a transaction */
  sign: (args: SignatureProviderArgs) => Promise<PushTransactionArgs>;
}
export interface DiscoveryOptions {
  pathIndexList: number[];
  keyModifierFunc?: KeyModifierCallback;
  keyLookupFunc?: KeyLookupCallback;
  presetKeyMap?: any;
}

/** stringified account info - account, authorization, network */
export type DiscoverResponse = {
  keys: {
    index: number;
    key: AccountPublicKey;
    note: string;
  }[];
};

type AccountPublicKey = string;

export interface SignatureProviderArgs {
  serializedTransaction: Uint8Array;
  requiredKeys: string[];
}

export interface PushTransactionArgs {
  signatures: string[];
  serializedTransaction: Uint8Array;
}

export declare type KeyModifierCallback = (
  discoveryData: DiscoveryData
) => DiscoveryData;

export declare type KeyLookupCallback = (
  discoveryData: DiscoveryData,
  callback: DiscoverContinueCallback
) => void;

export interface DiscoveryData {
  keyToAccountMap: DiscoveryAccount[];
  keys?: {
    index: number;
    key: string;
  }[];
}
export declare type DiscoverContinueCallback = (
  discoveredAccounts: DiscoveryAccount[]
) => void;

export interface DiscoveryAccount {
  index: number;
  key: string;
  accounts: {
    account: string;
    authorization: string;
  }[];
}

export interface SignatureProvider {
  getAvailableKeys: () => Promise<string[]>;
  sign: (args: SignatureProviderArgs) => Promise<PushTransactionArgs>;
}

export interface NetworkConfig {
  name?: string;
  protocol?: string;
  host: string;
  port?: number;
  chainId: string;
}
