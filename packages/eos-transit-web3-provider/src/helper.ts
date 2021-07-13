import {
  EthereumNetworkType,
} from './types'

export const WEB3_DEFAULT_PERMISSION = 'active';

export const ALL_ETHEREUM_NETWORKS: EthereumNetworkType[] = [
  EthereumNetworkType.EthMain,
  EthereumNetworkType.EthRopsten,
];

export function isAString(value: any): boolean {
  if (!value) return false
  return typeof value === 'string' || value instanceof String
}
