import { Web3WalletProviderOptions } from './EosTransitWeb3ProviderCore';
declare const walletConnectProviderPlugin: (args: Web3WalletProviderOptions) => (network: import("./EosTransitWeb3ProviderCore").NetworkConfig) => import("./EosTransitWeb3ProviderCore").WalletProvider;
export default walletConnectProviderPlugin;
