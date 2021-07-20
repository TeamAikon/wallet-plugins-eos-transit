import { Web3WalletProviderOptions } from './Web3';
declare const web3ProviderPlugin: (args: Web3WalletProviderOptions) => (network: import("./Web3").NetworkConfig) => import("./Web3").WalletProvider;
export default web3ProviderPlugin;
