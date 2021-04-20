import * as base32 from 'hi-base32';
import * as msgpack from '@msgpack/msgpack/dist';
import {
  AlgoNetworkType,
  AlgoSignerAccountInfo,
  DiscoverResponse,
  WalletAuth
} from './types';

// Constants
export const FIELDS_TO_REMOVE_FROM_TXN = ['flatfee', 'tag', 'name'];
export const ALGOSIGNER_DEFAULT_PERMISSION = 'active';
export const ALL_ALGORAND_NETWORKS: AlgoNetworkType[] = [
    AlgoNetworkType.MainNet,
    AlgoNetworkType.TestNet,
    // AlgoNetworkType.BetaNet  // disabled until AlgoSigner supports this network
  ];
const ALGORAND_ADDRESS_BYTES_ONLY_LENGTH = 36;
const ALGORAND_CHECKSUM_BYTE_LENGTH = 4;

export function toPublicKeyFromAddress(address: string): string {
  const ADDRESS_MALFORMED_ERROR = 'address seems to be malformed';
  if (!isAString(address)) throw new Error(ADDRESS_MALFORMED_ERROR);

  // try to decode
  const decoded = base32.decode.asBytes(address);

  // Sanity check
  if (decoded.length !== ALGORAND_ADDRESS_BYTES_ONLY_LENGTH)
    throw new Error(ADDRESS_MALFORMED_ERROR);

  const publicKey = new Uint8Array(
    decoded.slice(
      0,
      ALGORAND_ADDRESS_BYTES_ONLY_LENGTH - ALGORAND_CHECKSUM_BYTE_LENGTH
    )
  );
  return byteArrayToHexString(publicKey) as string;
}

export function byteArrayToHexString(value: Uint8Array): string {
  return Buffer.from(value).toString('hex');
}

export function isAString(value: any) {
  if (!value) {
    return false;
  }
  return typeof value === 'string' || value instanceof String;
}

export function decodeUint8Array<T>(array: Uint8Array): T {
  return msgpack.decode(array) as T;
}

export function encodeToUint8Array(obj: any) {
  return msgpack.encode(obj, { sortKeys: true });
}

export function getWalletAuthForAccount(
  account: AlgoSignerAccountInfo
): WalletAuth {
  return {
    accountName: account.address,
    permission: ALGOSIGNER_DEFAULT_PERMISSION,
    publicKey: toPublicKeyFromAddress(account.address)
  };
}

export function processAccountForDiscovery({
  accounts,
  network,
  index
}: {
  accounts: AlgoSignerAccountInfo[];
  network: AlgoNetworkType;
  index: number;
}): DiscoverResponse {
  const keys = accounts.map(account => {
    const { accountName, permission, publicKey } = getWalletAuthForAccount(
      account
    );
    return {
      index: ++index,
      key: publicKey,
      note: JSON.stringify({
        network,
        permission,
        accountName
      })
    };
  })
  return { keys };
}

export async function discoverAccounts(network?: AlgoNetworkType): Promise<DiscoverResponse> {
  let networks: AlgoNetworkType[];

  // use provided network or, if not provided, use all networks
  networks = (network) ? [network] : ALL_ALGORAND_NETWORKS;

  let walletAccounts: DiscoverResponse = {
    keys: []
  };

  let index = 0;
  for (let network of networks) {
    let acc = await AlgoSigner.accounts({ ledger: network });
    const accountsOnNetwork = processAccountForDiscovery({ accounts: acc, index, network })
    index += acc.length;
    walletAccounts.keys.push(...accountsOnNetwork.keys)
  }  
  return walletAccounts;
}
