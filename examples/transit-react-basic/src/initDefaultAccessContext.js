"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var eos_transit_1 = require("eos-transit");
var eos_transit_stub_provider_1 = __importDefault(require("eos-transit-stub-provider"));
// import anchorlink from 'eos-transit-anchorlink-provider';
var appName = 'Sample Dapp';
var walContext = eos_transit_1.initDefaultAccessContext({
    appName: appName,
    network: {
        host: 'api-kylin.eosasia.one',
        port: 80,
        protocol: 'http',
        chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'
    },
    walletProviders: [
        eos_transit_stub_provider_1.default()
    ]
});
// walContext.addWalletProvider(ledger({ pathIndexList: [ 0, 1, 2, 35 ] }));
// transport?: 'TransportWebAuthn' | 'TransportU2F | TransportWebBLE';
// name = 'Ledger Nano S',
// shortName = 'Ledger Nano S',
//# sourceMappingURL=initDefaultAccessContext.js.map