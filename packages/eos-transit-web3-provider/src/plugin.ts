import { providers } from 'ethers';
import Web3, { WalletProviderMetadata } from './Web3';

/** Check if the given value is a string or instance of string */
export function isAString(value: any): boolean {
  if (!value) return false
  return typeof value === 'string' || value instanceof String
}

declare const window: any;

class Web3ProviderPlugin extends Web3 {

  constructor(metaData: WalletProviderMetadata) {
    super(metaData);

    this.assertIsDesiredNetwork = this.assertIsDesiredNetwork.bind(this);
    this.getChainIdFromNetwork = this.getChainIdFromNetwork.bind(this);
    this.handleOnSelectAccount = this.handleOnSelectAccount.bind(this);
    this.handleOnSelectNetwork = this.handleOnSelectNetwork.bind(this);
    this.popupSelectDesiredNetworkIfNeeded = this.popupSelectDesiredNetworkIfNeeded.bind(this);
  }

  async connect(appName: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await window?.ethereum?.enable();
        const res = await super.connect(appName, window.ethereum);

        // confirm current selected network matches requested network
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

// plugin meta data
const metaData: WalletProviderMetadata = {
  id: 'web3',
  name: 'Web3 Web Wallet',
  shortName: 'Web3',
  description: 'Use Web3 Web Wallet to sign your Ethereum transactions',
  isWalletInterface: true,
  walletMetadata: {
    name: 'unspecified',
    shortName: 'unspecified',
    description: 'unspecified'
  }
};


const web3ProviderPlugin = () => {
  const plugin = new Web3ProviderPlugin(metaData);
  // return the wallet provider
  return plugin.makeWalletProvider;
};

export default web3ProviderPlugin;
