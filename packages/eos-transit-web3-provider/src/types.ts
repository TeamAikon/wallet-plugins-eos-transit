declare global {
  var Web3: Web3Type;
}

export declare type KeyModifierCallback = (
  discoveryData: DiscoveryData
) => DiscoveryData;

export declare type KeyLookupCallback = (
  discoveryData: DiscoveryData,
  callback: DiscoverContinueCallback
) => void;

export declare type DiscoverContinueCallback = (
  discoveredAccounts: DiscoveryAccount[]
) => void;

export type Web3Type = {
  connect(): Promise<boolean>;
  accounts(props: ConnectProps): Promise<Web3AccountInfo[]>;
  sign(TxnObject: TxnObject): Promise<Web3SignSuccessResponse>;
  send(props: SignProps): Promise<Web3TransactionSuccessResponse>;
}
type ConnectProps = {
  ledger: string;
}

export type TxnObject = {
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

type SignProps = {
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

export type Web3AccountInfo = {
  address: string;
}
export type Web3SignSuccessResponse = {
  txID: string;
  blob: string;
}
export type Web3TransactionSuccessResponse = {
  txId: string;
}

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

/** stringified account info - account, authorization, network */
export type DiscoverResponse = WalletAuth[];

export type SignatureProviderArgs = {
  serializedTransaction: Uint8Array;
  requiredKeys: string[];
}

export type PushTransactionArgs = {
  signatures: string[];
  serializedTransaction: Uint8Array;
}

export type DiscoveryData = {
  keyToAccountMap: DiscoveryAccount[];
  keys?: {
    index: number;
    key: string;
  }[];
}

export type DiscoveryAccount = {
  index: number;
  key: string;
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
