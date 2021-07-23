import { providers } from 'ethers';
import WalletConnectProvider from "@walletconnect/web3-provider";
import EosTransitWeb3ProviderCore, {
  DiscoveryOptions,
  DiscoverResponse,
  isAString,
  NetworkConfig,
  PluginMetaData,
  PushTransactionArgs,
  SignatureProvider,
  SignatureProviderArgs,
  WalletAuth,
  WalletProvider,
  WEB3_DEFAULT_PERMISSION,
  Web3WalletProviderAdditionalOptions,
  Web3WalletProviderOptions,
} from './EosTransitWeb3ProviderCore';

declare const window: any;

// wallet connect config options
const WALLET_CONNECT_INFURA_ID = '27e484dcd9e3efcfd25a83a78777cdf1';
const WALLET_CONNECT_DISPLAY_QR_CODE = true;
const WALLET_CONNECT_RPC_ENDPOINTS = {
  1: "https://mainnet.infura.io/v3/4807102366a64a28b33e10d8751c9404",
  3: "https://ropsten.infura.io/v3/4807102366a64a28b33e10d8751c9404",
};

let walletConnectProvider: WalletConnectProvider;

class WalletConnectProviderPlugin extends EosTransitWeb3ProviderCore {

  constructor(pluginMetaData: PluginMetaData, additionalOptions: Web3WalletProviderAdditionalOptions) {
    super(pluginMetaData, additionalOptions);

    this.assertIsDesiredNetwork = this.assertIsDesiredNetwork.bind(this);
    this.getChainIdFromNetwork = this.getChainIdFromNetwork.bind(this);
    this.handleOnSelectAccount = this.handleOnSelectAccount.bind(this);
    this.handleOnSelectNetwork = this.handleOnSelectNetwork.bind(this);
  }

  async connect(appName: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {

        // initialize new wallet connect web3 provider
        walletConnectProvider = new WalletConnectProvider({
          infuraId: WALLET_CONNECT_INFURA_ID, // Required
          qrcode: WALLET_CONNECT_DISPLAY_QR_CODE,
          rpc: WALLET_CONNECT_RPC_ENDPOINTS,
        });

        // display the QR code for user to connect using walletConnect
        await walletConnectProvider.enable();

        const res = await super.connect(appName, walletConnectProvider);

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async discover(discoveryOptions?: DiscoveryOptions): Promise<DiscoverResponse> {
    return super.discover(discoveryOptions);
  }

  async disconnect(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await walletConnectProvider.disconnect();  
      resolve(true);
    });
  }

  async login(accountName?: string, authorization: string = WEB3_DEFAULT_PERMISSION): Promise<WalletAuth> {
    return super.login(accountName, authorization);
  }

  async logout(accountName?: string): Promise<boolean> {
    return super.logout(accountName);
  }

  async signArbitrary(data: string, userMessage: string): Promise<string> {
    return super.signArbitrary(data, userMessage);
  }

  async sign({ serializedTransaction, requiredKeys }: SignatureProviderArgs): Promise<PushTransactionArgs> {
    return super.sign({ serializedTransaction, requiredKeys });
  }

  makeSignatureProvider(): SignatureProvider {
    return super.makeSignatureProvider();
  }

  makeWalletProvider(network: NetworkConfig): WalletProvider {
    return super.makeWalletProvider(network);
  }

  addToAccountToPublicKeyMap(account: string, publicKey: string) {
    return super.addToAccountToPublicKeyMap(account, publicKey);
  }

  assertIsConnected(reject: any): void {
    return super.assertIsConnected(reject);
  }

  composeKeyToAccountMap(accounts: string[]) {
    return super.composeKeyToAccountMap(accounts);
  }

  async getAvailableKeys(): Promise<string[]> {
    return super.getAvailableKeys();
  }

  getCurrentWalletProvider() {
    return super.getCurrentWalletProvider();
  }

  getPublicKeyFromSignedHash(messageHash: string, signature: string): string {
    return super.getPublicKeyFromSignedHash(messageHash, signature);
  }

  mapTransactionResponseToTransaction(transactionResponse: providers.TransactionResponse) {
    return super.mapTransactionResponseToTransaction(transactionResponse);
  }

  /** setup all event listeners here. We listen for events like
   *  - network change
   *  - accounts change
   */
  setupEventListeners() {
    // setup network change listener
    // setup account change listener
  }

  /** Handle network change event */
  handleOnSelectNetwork(network: providers.Network, oldNetwork: providers.Network): void {
  }

  /** Handle account change event */
  handleOnSelectAccount(accounts: string[]) {
  }

  /** convert network chainId to int if needed */
  getChainIdFromNetwork(network: any & { chainId: number | string }): { chainIdInt: number; chainIdHex: string } {
    const { chainId } = network;
    const chainIdInt = isAString(chainId) ? parseInt(chainId) : chainId;
    const chainIdHex = `0x${chainIdInt}`;
    return { chainIdInt, chainIdHex };
  }

  /** Get the current wallet provider name */
  getCurrentWalletProviderName(): string {
    let providerName: string = 'unspecified';
    return providerName;
  }

  /** reject if requiredNetwork is not already selected in the wallet */
  assertIsDesiredNetwork(requiredNetwork: any & { chainId: number | string }): void {
    const { chainIdInt } = this.getChainIdFromNetwork(requiredNetwork);
    if (this.selectedNetwork?.chainId !== chainIdInt) {
      const errMsg = `Desired network not selected in wallet: Please select the it using the Wallet. Specified Network: ${JSON.stringify(
        requiredNetwork
      )}`;
      throw new Error(errMsg);
    }
  }

}


// initialize the class and return it
const walletConnectProviderPlugin = (args: Web3WalletProviderOptions) => {

  // plugin meta data
  const pluginMetaData: PluginMetaData = {
    id: args?.id || 'walletconnect',
    name: args?.name || 'WalletConnect Wallet',
    shortName: args?.shortName || 'WalletConnect',
    description: args?.description || 'Use WalletConnect Wallet to sign your Ethereum transactions',
    isWalletInterface: true,
    walletMetadata: {
      id: 'unspecified',
      name: 'unspecified',
      shortName: 'unspecified',
      description: 'unspecified'
    },
  };

  // additional optional args that might be passed while initializing the plugin
  const additionalOptions: Web3WalletProviderAdditionalOptions = {
    errorTimeout: args?.errorTimeout,
    network: args?.network,
  }

  const plugin = new WalletConnectProviderPlugin(pluginMetaData, additionalOptions);

  // return the wallet provider - This implements the eos-transit plugin interface
  return plugin.makeWalletProvider;
};

export default walletConnectProviderPlugin;
