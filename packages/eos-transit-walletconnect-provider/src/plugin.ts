import { providers } from 'ethers';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3, {
  WalletProviderMetadata,
  Web3WalletProviderOptions,
  Web3WalletProviderAdditionalOptions,
  isAString,
} from './Web3';

declare const window: any;

// wallet connect config options
const WALLET_CONNECT_INFURA_ID = '27e484dcd9e3efcfd25a83a78777cdf1';
const WALLET_CONNECT_DISPLAY_QR_CODE = true;
const WALLET_CONNECT_RPC_ENDPOINTS = {
  1: "https://mainnet.infura.io/v3/4807102366a64a28b33e10d8751c9404",
  3: "https://ropsten.infura.io/v3/4807102366a64a28b33e10d8751c9404",
};

class WalletConnectProviderPlugin extends Web3 {

  constructor(metaData: WalletProviderMetadata, additionalOptions: Web3WalletProviderAdditionalOptions) {
    super(metaData, additionalOptions);

    this.assertIsDesiredNetwork = this.assertIsDesiredNetwork.bind(this);
    this.getChainIdFromNetwork = this.getChainIdFromNetwork.bind(this);
    this.handleOnSelectAccount = this.handleOnSelectAccount.bind(this);
    this.handleOnSelectNetwork = this.handleOnSelectNetwork.bind(this);
    this.popupSelectDesiredNetworkIfNeeded = this.popupSelectDesiredNetworkIfNeeded.bind(this);
  }

  async connect(appName: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {

        // initialize new wallet connect web3 provider
        const walletConnectProvider = new WalletConnectProvider({
          infuraId: WALLET_CONNECT_INFURA_ID, // Required
          qrcode: WALLET_CONNECT_DISPLAY_QR_CODE,
          rpc: WALLET_CONNECT_RPC_ENDPOINTS,
        });

        // display the QR code for user to connect using walletConnect
        const displayQRCode = await walletConnectProvider.enable();

        const res = await super.connect(appName, walletConnectProvider);

        // check if current selected network matches requested network, if not display network chenage popup
        await this.popupSelectDesiredNetworkIfNeeded(this.networkConfig);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  setupEventListeners() {
    // setup network change listener
    this.provider.on('network', this.handleOnSelectNetwork);

    // setup account change listener
    window?.ethereum?.on('accountsChanged', this.handleOnSelectAccount);
  }

  /** Handle network change event */
  handleOnSelectNetwork(network: providers.Network, oldNetwork: providers.Network): void {
    this.selectedNetwork = network;
    this.discover();
  }

  /** Handle account change event */
  handleOnSelectAccount(accounts: string[]) {
    const account = accounts?.length > 0 ? accounts[0] : undefined;
    this.selectedAccount = account;
    this.discover();
  }

  /** if requiredNetwork is not already selected in the wallet, trigger the wallet to prmompt the user to select the network */
  async popupSelectDesiredNetworkIfNeeded(requiredNetwork: any & { chainId: number | string }): Promise<void> {
    const { chainIdInt, chainIdHex } = this.getChainIdFromNetwork(requiredNetwork);
    if (this.selectedNetwork?.chainId === chainIdInt) return;
    // propmt the user to select the correct network
    await window?.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }]
    });
    this.selectedNetwork = await this.provider.getNetwork();
    // if desired network not selected, throw
    this.assertIsDesiredNetwork(requiredNetwork);
  }

  /** convert network chainId to int if needed */
  getChainIdFromNetwork(network: any & { chainId: number | string }): { chainIdInt: number; chainIdHex: string } {
    const { chainId } = network;
    const chainIdInt = isAString(chainId) ? parseInt(chainId) : chainId;
    const chainIdHex = `0x${chainIdInt}`;
    return { chainIdInt, chainIdHex };
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
  const metaData: WalletProviderMetadata = {
    id: args?.id || 'walletconnect',
    name: args?.name || 'WalletConnect Wallet',
    shortName: args?.shortName || 'WalletConnect',
    description: args?.description || 'Use WalletConnect Wallet to sign your Ethereum transactions',
    isWalletInterface: true,
    walletMetadata: {
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

  const plugin = new WalletConnectProviderPlugin(metaData, additionalOptions);

  // return the wallet provider
  return plugin.makeWalletProvider;
};

export default walletConnectProviderPlugin;
