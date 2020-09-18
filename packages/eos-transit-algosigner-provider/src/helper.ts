
import * as base32 from "hi-base32";
import * as msgpack from "@msgpack/msgpack";
import { AlgoAccount, AlgoNetworkType, AlgoSignerAccountInfo, ALGOSIGNER_DEFAULT_PERMISSION, WalletAuth } from "./types";

const ALGORAND_ADDRESS_BYTES_ONLY_LENGTH = 36;
const ALGORAND_CHECKSUM_BYTE_LENGTH = 4;


export function toPublicKeyFromAddress(address: string): string {
    const ADDRESS_MALFORMED_ERROR = 'address seems to be malformed'
    if (!isAString(address)) throw new Error(ADDRESS_MALFORMED_ERROR)
  
    // try to decode
    const decoded = base32.decode.asBytes(address)
  
    // Sanity check
    if (decoded.length !== ALGORAND_ADDRESS_BYTES_ONLY_LENGTH) throw new Error(ADDRESS_MALFORMED_ERROR)
  
    const publicKey = new Uint8Array(decoded.slice(0, ALGORAND_ADDRESS_BYTES_ONLY_LENGTH - ALGORAND_CHECKSUM_BYTE_LENGTH))
    return byteArrayToHexString(publicKey) as string
}


export function  byteArrayToHexString(value: Uint8Array): string {
    return Buffer.from(value).toString('hex')
}


export function isAString(value: any) {
    if (!value) {
      return false
    }
    return typeof value === 'string' || value instanceof String
}



export function decodeUint8Array(array: Uint8Array){
    return msgpack.decode(array);
}

export function encodeToUint8Array(obj: any){
    return msgpack.encode(obj, {sortKeys: true});

}



export function processAccount(account: AlgoSignerAccountInfo): WalletAuth{
  
    return   {
      accountName: account.address,
      permission: ALGOSIGNER_DEFAULT_PERMISSION,
      publicKey: toPublicKeyFromAddress(account.address)
    }
    
  }
  
  export function processAccountForDiscovery({accounts, network, index}:{accounts: AlgoSignerAccountInfo[], network: AlgoNetworkType, index: number}): AlgoAccount[]{
    return accounts.map(account => (
        {
            key: {
                index: ++index,
                key: toPublicKeyFromAddress(account.address),
            },
            note: JSON.stringify({
                network,
                account: account.address
            })
        }
    ));
  }


  export async function discoverAccounts(network?: AlgoNetworkType){
    let networks: AlgoNetworkType[];

    if(network !== undefined)
      networks = [network];
    else
      networks = [AlgoNetworkType.MainNet, AlgoNetworkType.TestNet, AlgoNetworkType.BetaNet];

    let walletAccounts: AlgoAccount[] = [];

    let index = 0;
    for(let net of networks){
      let acc = await AlgoSigner.accounts({ledger: AlgoNetworkType.TestNet});
      walletAccounts = [...walletAccounts, ...processAccountForDiscovery({accounts: acc, index, network: net})];
      index += acc.length;
    }

    return walletAccounts;
  }