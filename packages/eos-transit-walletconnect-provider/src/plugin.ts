import { ethers, providers, utils } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
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
  isHexString
} from './EosTransitWeb3ProviderCore';

declare const window: any;

// wallet connect config options
const ERROR_TIMEOUT_IN_MILLISECONDS = 120000; // timeout in ms if the user fails to connect
const WALLET_CONNECT_INFURA_ID = '4807102366a64a28b33e10d8751c9404';
const WALLET_CONNECT_DISPLAY_QR_CODE = true;
const WALLET_CONNECT_RPC_ENDPOINTS = {
  1: `https://mainnet.infura.io/v3/${WALLET_CONNECT_INFURA_ID}`,
  3: `https://ropsten.infura.io/v3/${WALLET_CONNECT_INFURA_ID}`,
  4: `https://rinkeby.infura.io/v3/${WALLET_CONNECT_INFURA_ID}`,
  5: `https://goerli.infura.io/v3/${WALLET_CONNECT_INFURA_ID}`,
  42: `https://kovan.infura.io/v3/${WALLET_CONNECT_INFURA_ID}`,
};

let walletConnectProvider: WalletConnectProvider;

class WalletConnectProviderPlugin extends EosTransitWeb3ProviderCore {
  constructor(
    pluginMetaData: PluginMetaData,
    additionalOptions: Web3WalletProviderAdditionalOptions
  ) {
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
          rpc: WALLET_CONNECT_RPC_ENDPOINTS
        });

        // set timeout for user to connect to provider
        if (!this.provider) {
          this.setErrorTimeout(this.handleConnectTimeout, reject);
        }

        // display the QR code for user to connect using walletConnect
        await walletConnectProvider.enable();

        const res = await super.connect(appName, walletConnectProvider);

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async discover(
    discoveryOptions?: DiscoveryOptions
  ): Promise<DiscoverResponse> {
    return super.discover(discoveryOptions);
  }

  async disconnect(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await walletConnectProvider.disconnect();
      resolve(true);
    });
  }

  async login(
    accountName?: string,
    authorization: string = WEB3_DEFAULT_PERMISSION
  ): Promise<WalletAuth> {
    return super.login(accountName, authorization);
  }

  async logout(accountName?: string): Promise<boolean> {
    return super.logout(accountName);
  }

  /** set timeout for connect, signArbitrary and sign methods */
  setErrorTimeout(callback: Function, reject: any): void {
    return super.setErrorTimeout(callback, reject);
  }

  /** handle connect method timeout */
  async handleConnectTimeout(reject: any) {
    if (!this.provider) {
      const errorMessage = `Connection timed out, Please try connecting again.`;
      // close the connect QR code modal
      walletConnectProvider?.qrcodeModal?.close();
      await this.disconnect();
      reject(errorMessage);
    }
  }

  /** handle transaction methods timeout - signArbitrary & sign */
  async handleTransactionTimeout(reject: any) {
    if (!this.provider || this.isTransactionRequestPending) {
      const errorMessage = `Transaction timed out, Please try executing the transaction again.`;
      await this.disconnect();
      reject(errorMessage);
    }
  }

  async signArbitrary(data: string, userMessage: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        this.assertIsConnected(reject);
        // set error timeout
        this.setErrorTimeout(this.handleTransactionTimeout, reject);
        this.isTransactionRequestPending = true;
        let dataBytes: Uint8Array;

        // convert string into UInt8Array
        if (isHexString(data)) {
          dataBytes = utils.arrayify(data, { allowMissingPrefix: true }); // convert hex string (e.g. 'A0D045') to UInt8Array - '0x' prefix is optional
        } else {
          dataBytes = utils.toUtf8Bytes(data); // from 'any UTF8 string' to Uint8Array
        }

        const walletAddress = await this.signer.getAddress();
        const signature = await this.provider.send('personal_sign', [
          dataBytes,
          walletAddress
        ]);

        const dataHash = ethers.utils.hashMessage(dataBytes);
        const address = ethers.utils.verifyMessage(dataBytes, signature);
        const publicKey = this.getPublicKeyFromSignedHash(dataHash, signature);
        this.addToAccountToPublicKeyMap(address, publicKey);
        this.isTransactionRequestPending = false;
        this.clearErrorTimeout();
        resolve(signature);
      } catch (err) {
        this.isTransactionRequestPending = false;
        this.clearErrorTimeout();
        reject(err);
      }
      this.clearErrorTimeout();
    });
  }

  async sign({
    serializedTransaction,
    requiredKeys
  }: SignatureProviderArgs): Promise<PushTransactionArgs> {
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

  getCurrentWalletProviderMeta() {
    return super.getCurrentWalletProviderMeta();
  }

  getPublicKeyFromSignedHash(messageHash: string, signature: string): string {
    return super.getPublicKeyFromSignedHash(messageHash, signature);
  }

  mapTransactionResponseToTransaction(
    transactionResponse: providers.TransactionResponse
  ) {
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
  handleOnSelectNetwork(
    network: providers.Network,
    oldNetwork: providers.Network
  ): void {}

  /** Handle account change event */
  handleOnSelectAccount(accounts: string[]) {}

  /** convert network chainId to int if needed */
  getChainIdFromNetwork(
    network: any & { chainId: number | string }
  ): { chainIdInt: number; chainIdHex: string } {
    const { chainId } = network;
    const chainIdInt = isAString(chainId) ? parseInt(chainId) : chainId;
    const chainIdHex = `0x${chainIdInt}`;
    return { chainIdInt, chainIdHex };
  }

  /** Get the current wallet provider name */
  getCurrentWalletProviderName(): string {
    let providerName: string = 'unspecified';

    try {
      if (walletConnectProvider?.wc?.peerMeta?.name) {
        providerName = walletConnectProvider.wc.peerMeta.name;
      }
    } catch (error) {
      console.log('getCurrentWalletProviderName::error', error);
    }

    return providerName;
  }

  /** reject if requiredNetwork is not already selected in the wallet */
  assertIsDesiredNetwork(
    requiredNetwork: any & { chainId: number | string }
  ): void {
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
    description:
      args?.description ||
      'Use WalletConnect Wallet to sign your Ethereum transactions',
    isWalletInterface: true,
    walletMetadata: {
      id: 'unspecified',
      name: 'unspecified',
      shortName: 'unspecified',
      description: 'unspecified'
    }
  };

  // additional optional args that might be passed while initializing the plugin
  const additionalOptions: Web3WalletProviderAdditionalOptions = {
    errorTimeout: args?.errorTimeout || ERROR_TIMEOUT_IN_MILLISECONDS,
    network: args?.network
  };

  const plugin = new WalletConnectProviderPlugin(
    pluginMetaData,
    additionalOptions
  );

  // return the wallet provider - This implements the eos-transit plugin interface
  return plugin.makeWalletProvider;
};

export default walletConnectProviderPlugin;
