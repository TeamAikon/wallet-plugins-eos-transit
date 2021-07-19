import { ethers, providers, Signer } from 'ethers';
import { decode, encode } from '@msgpack/msgpack';
import {
  DiscoveryAccount,
  DiscoverResponse,
  DiscoveryOptions,
  NetworkConfig,
  PushTransactionArgs,
  SignatureProvider,
  SignatureProviderArgs,
  Web3WalletProviderOptions,
  WalletAuth,
  WalletProvider,
  WalletProviderMetadata,
} from './types';
import Web3 from './Web3';
import { isAString, WEB3_DEFAULT_PERMISSION } from './helper';


declare const window: any;

class Web3ProviderPlugin extends Web3 {

  constructor(props: any) {
    super(props);
  }

  async connect(appName: string): Promise<boolean> {
    await window?.ethereum?.enable();
    return super.connect(appName, window.ethereum);
  }

}

const config: WalletProviderMetadata = {
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
  const plugin = new Web3ProviderPlugin(config);
  // return the wallet provider
  return plugin.makeWalletProvider;
};

export default web3ProviderPlugin;
