export const ALGOSIGNER_DEFAULT_PERMISSION = 'active';

export interface AlgoSignerType {
  connect(): Promise<boolean>;
  accounts(props: ConnectProps): Promise<AlgoSignerAccountInfo[]>;
  sign(TxnObject: TxnObject): Promise<AlgoSignerSignSuccessResponse>;
  send(props: SignProps): Promise<AlgoSignerTransactionSuccessResponse>;
}

declare global {
  var AlgoSigner: AlgoSignerType;
}

interface ConnectProps {
  ledger: string;
}

interface SignProps {
  tx: string;
  ledger: string;
}

export interface AlgoSignerAccountInfo {
  address: string;
}

export interface AlgoSignerSignSuccessResponse {
  txID: string;
  blob: string;
}

export interface AlgoSignerTransactionSuccessResponse {
  txId: string;
}

type AccountPublicKey = string;

/** stringified account info - account, authorization, network */
export type DiscoverResponse = {
  key: {
    index: number;
    key: AccountPublicKey;
  };
  note: string;
};

export interface TxnObject {
  to: string;
  from: string;
  fee: number;
  type: AlgorandTransactionTypeCode;
  amount: number;
  firstRound: number;
  lastRound: number;
  genesisID: string;
  genesisHash: string;
  note: string;
}

export enum AlgoNetworkType {
  TestNet = 'TestNet',
  MainNet = 'MainNet',
  BetaNet = 'BetaNet'
}

export interface AlgoSignerAccount {
  account: string;
  permission: string;
  publicKey: string;
}

export interface SignatureProviderArgs {
  serializedTransaction: Uint8Array;
  requiredKeys: string[];
}

export enum AlgorandTransactionTypeCode {
  AssetConfig = 'acfg',
  AssetFreeze = 'afrz',
  AssetTransfer = 'axfer',
  KeyRegistration = 'keyreg',
  Payment = 'pay'
}

export type AlgorandTxEncodedForChain = {
  rcv?: Buffer; // Buffer.from(to.publicKey)
  name?: string;
  tag?: Buffer; // Buffer.from(...)
  amt?: number; // integer
  note?: Buffer; // Buffer.from(note)
  snd?: Buffer; // Buffer.from(from.publicKey)
  type?: AlgorandTransactionTypeCode; // type
  fv?: number; // firstRound
  lv?: number; // lastRound
  fee?: number; // fee
  gen?: string; // genesisID
  gn?: string; // genesisHash - Buffer.from(genesisHash, 'base64')
  lx?: Buffer; // Buffer.from(lease),
  grp?: Buffer; // group
  voteKey?: Buffer; // voteKey
  selkey?: Buffer; // selectionKey
  votefst?: number; // voteFirst
  votelst?: number; // voteLast
  votekd?: number; // voteKeyDilution
  caid?: number; // assetIndex
  apar?: {
    t?: number; // assetTotal
    df?: boolean; // assetDefaultFrozen
    dc?: number; // assetDecimals
    m?: Buffer; // Buffer.from(assetManager.publicKey)
    r?: Buffer; // Buffer.from(assetReserve.publicKey)
    f?: Buffer; // Buffer.from(assetFreeze.publicKey)
    c?: Buffer; // Buffer.from(assetClawback.publicKey)
    an?: string; // assetName
    un?: string; // assetUnitName
    au?: string; // assetURL
    am?: string; // Buffer.from(assetMetadataHash)
  };
  apid?: number; // appIndex,
  apan?: number; // appOnComplete
  apls?: {
    nui?: number; // appLocalInts
    nbs?: number; // appLocalByteSlices
  };
  apgs?: {
    nui?: number; // appGlobalInts,
    nbs?: number; // appGlobalByteSlices
  };
  apfa?: number[]; // appForeignApps,
  apap?: Buffer; // Buffer.from(appApprovalProgram)
  apsu?: Buffer; // Buffer.from(appClearProgram)
  apaa?: Buffer[]; // appArgs.forEach((arg) => { txn.apaa.push(Buffer.from(arg))
  apat?: Buffer[]; // appAccounts.forEach((decodedAddress) => { txn.apat.push(Buffer.from(decodedAddress.publicKey))
  aclose?: Buffer; // Buffer.from(closeRemainderTo.publicKey)
  asnd?: Buffer; // Buffer.from(assetRevocationTarget.publicKey)
  fadd?: Buffer; // Buffer.from(freezeAccount.publicKey)
  afrz?: boolean; // freezeState
  reKeyTo?: Buffer; // Buffer.from(reKeyTo.publicKey)
};

export type AlgorandRawTransactionStruct = {
  txn: AlgorandTxEncodedForChain;
  sig: Buffer;
  sgnr?: Buffer;
};

export interface DiscoveryData {
  keyToAccountMap: DiscoveryAccount[];
  keys?: {
    index: number;
    key: string;
  }[];
}
export interface DiscoveryAccount {
  index: number;
  key: string;
  accounts: {
    account: string;
    authorization: string;
  }[];
}

export declare type KeyModifierCallback = (
  discoveryData: DiscoveryData
) => DiscoveryData;
export declare type DiscoverContinueCallback = (
  discoveredAccounts: DiscoveryAccount[]
) => void;
export declare type KeyLookupCallback = (
  discoveryData: DiscoveryData,
  callback: DiscoverContinueCallback
) => void;

export interface DiscoveryOptions {
  pathIndexList: number[];
  keyModifierFunc?: KeyModifierCallback;
  keyLookupFunc?: KeyLookupCallback;
  presetKeyMap?: any;
}

export interface WalletProviderMetadata {
  name?: string;
  shortName?: string;
  description?: string;
}

export interface WalletAuth {
  accountName: string;
  permission: string;
  publicKey: string;
}

export interface WalletProvider {
  id: string;
  meta?: WalletProviderMetadata;
  signatureProvider: SignatureProvider;
  connect(appName: string): Promise<boolean>;
  discover(discoveryOptions: DiscoveryOptions): Promise<DiscoverResponse[]>;
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

export interface PushTransactionArgs {
  signatures: string[];
  serializedTransaction: Uint8Array;
}

export interface SignatureProvider {
  /** Public keys associated with the private keys that the `SignatureProvider` holds */
  getAvailableKeys: () => Promise<string[]>;
  /** Sign a transaction */
  sign: (args: SignatureProviderArgs) => Promise<PushTransactionArgs>;
}

export interface PushTransactionArgs {
  signatures: string[];
  serializedTransaction: Uint8Array;
}

export interface NetworkConfig {
  name?: string;
  protocol?: string;
  host: string;
  port?: number;
  chainId: string;
}

export interface AlgoSignerWalletProviderOptions {
  id: string;
  name: string;
  shortName: string;
  description?: string;
  errorTimeout?: number;
  network?: AlgoNetworkType;
}
