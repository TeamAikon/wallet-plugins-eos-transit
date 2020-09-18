import { initDefaultAccessContext } from 'eos-transit';
import scatterWalletProvider from 'eos-transit-scatter-provider';

const appName = 'Sample Dapp';

const walContext = initDefaultAccessContext({
	appName,
	network: {
		host: 'api-kylin.eosasia.one',
		port: 80,
		protocol: 'http',
		chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'
	},
	walletProviders: [ 
		scatterWalletProvider(),
	]
});
