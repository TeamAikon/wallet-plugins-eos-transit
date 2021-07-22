"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_provider_1 = __importDefault(require("@walletconnect/web3-provider"));
var EosTransitWeb3ProviderCore_1 = __importStar(require("./EosTransitWeb3ProviderCore"));
// wallet connect config options
var WALLET_CONNECT_INFURA_ID = '27e484dcd9e3efcfd25a83a78777cdf1';
var WALLET_CONNECT_DISPLAY_QR_CODE = true;
var WALLET_CONNECT_RPC_ENDPOINTS = {
    1: "https://mainnet.infura.io/v3/4807102366a64a28b33e10d8751c9404",
    3: "https://ropsten.infura.io/v3/4807102366a64a28b33e10d8751c9404",
};
var walletConnectProvider;
var WalletConnectProviderPlugin = /** @class */ (function (_super) {
    __extends(WalletConnectProviderPlugin, _super);
    function WalletConnectProviderPlugin(metaData, additionalOptions) {
        var _this = _super.call(this, metaData, additionalOptions) || this;
        _this.assertIsDesiredNetwork = _this.assertIsDesiredNetwork.bind(_this);
        _this.getChainIdFromNetwork = _this.getChainIdFromNetwork.bind(_this);
        _this.handleOnSelectAccount = _this.handleOnSelectAccount.bind(_this);
        _this.handleOnSelectNetwork = _this.handleOnSelectNetwork.bind(_this);
        _this.popupSelectDesiredNetworkIfNeeded = _this.popupSelectDesiredNetworkIfNeeded.bind(_this);
        return _this;
    }
    WalletConnectProviderPlugin.prototype.connect = function (appName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var res, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    // initialize new wallet connect web3 provider
                                    walletConnectProvider = new web3_provider_1.default({
                                        infuraId: WALLET_CONNECT_INFURA_ID,
                                        qrcode: WALLET_CONNECT_DISPLAY_QR_CODE,
                                        rpc: WALLET_CONNECT_RPC_ENDPOINTS,
                                    });
                                    // display the QR code for user to connect using walletConnect
                                    return [4 /*yield*/, walletConnectProvider.enable()];
                                case 1:
                                    // display the QR code for user to connect using walletConnect
                                    _a.sent();
                                    console.log('walletConnectProvider', walletConnectProvider);
                                    return [4 /*yield*/, _super.prototype.connect.call(this, appName, walletConnectProvider)];
                                case 2:
                                    res = _a.sent();
                                    // check if current selected network matches requested network, if not display network chenage popup
                                    return [4 /*yield*/, this.popupSelectDesiredNetworkIfNeeded(this.networkConfig)];
                                case 3:
                                    // check if current selected network matches requested network, if not display network chenage popup
                                    _a.sent();
                                    resolve(res);
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_1 = _a.sent();
                                    reject(error_1);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    // async sign() {
    //   super.sign();
    // }
    WalletConnectProviderPlugin.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, walletConnectProvider.disconnect()];
                                case 1:
                                    _a.sent();
                                    resolve(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    WalletConnectProviderPlugin.prototype.setupEventListeners = function () {
        // setup network change listener
        this.provider.on('chainChanged', this.handleOnSelectNetwork);
        // setup account change listener
        // window?.ethereum?.on('accountsChanged', this.handleOnSelectAccount);
    };
    /** Handle network change event */
    WalletConnectProviderPlugin.prototype.handleOnSelectNetwork = function (network, oldNetwork) {
        console.log('handleOnSelectNetwork', network);
        this.selectedNetwork = network;
        this.discover();
    };
    /** Handle account change event */
    WalletConnectProviderPlugin.prototype.handleOnSelectAccount = function (accounts) {
        console.log('handleOnSelectAccount', accounts);
        var account = (accounts === null || accounts === void 0 ? void 0 : accounts.length) > 0 ? accounts[0] : undefined;
        this.selectedAccount = account;
        this.discover();
    };
    /** if requiredNetwork is not already selected in the wallet, trigger the wallet to prmompt the user to select the network */
    WalletConnectProviderPlugin.prototype.popupSelectDesiredNetworkIfNeeded = function (requiredNetwork) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, chainIdInt, chainIdHex, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = this.getChainIdFromNetwork(requiredNetwork), chainIdInt = _b.chainIdInt, chainIdHex = _b.chainIdHex;
                        if (((_a = this.selectedNetwork) === null || _a === void 0 ? void 0 : _a.chainId) === chainIdInt)
                            return [2 /*return*/];
                        // propmt the user to select the correct network
                        return [4 /*yield*/, (window === null || window === void 0 ? void 0 : window.ethereum.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: chainIdHex }]
                            }))];
                    case 1:
                        // propmt the user to select the correct network
                        _d.sent();
                        _c = this;
                        return [4 /*yield*/, this.provider.getNetwork()];
                    case 2:
                        _c.selectedNetwork = _d.sent();
                        // if desired network not selected, throw
                        this.assertIsDesiredNetwork(requiredNetwork);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** convert network chainId to int if needed */
    WalletConnectProviderPlugin.prototype.getChainIdFromNetwork = function (network) {
        var chainId = network.chainId;
        var chainIdInt = EosTransitWeb3ProviderCore_1.isAString(chainId) ? parseInt(chainId) : chainId;
        var chainIdHex = "0x" + chainIdInt;
        return { chainIdInt: chainIdInt, chainIdHex: chainIdHex };
    };
    /** reject if requiredNetwork is not already selected in the wallet */
    WalletConnectProviderPlugin.prototype.assertIsDesiredNetwork = function (requiredNetwork) {
        var _a;
        var chainIdInt = this.getChainIdFromNetwork(requiredNetwork).chainIdInt;
        if (((_a = this.selectedNetwork) === null || _a === void 0 ? void 0 : _a.chainId) !== chainIdInt) {
            var errMsg = "Desired network not selected in wallet: Please select the it using the Wallet. Specified Network: " + JSON.stringify(requiredNetwork);
            throw new Error(errMsg);
        }
    };
    return WalletConnectProviderPlugin;
}(EosTransitWeb3ProviderCore_1.default));
// initialize the class and return it
var walletConnectProviderPlugin = function (args) {
    // plugin meta data
    var pluginMetaData = {
        id: (args === null || args === void 0 ? void 0 : args.id) || 'walletconnect',
        name: (args === null || args === void 0 ? void 0 : args.name) || 'WalletConnect Wallet',
        shortName: (args === null || args === void 0 ? void 0 : args.shortName) || 'WalletConnect',
        description: (args === null || args === void 0 ? void 0 : args.description) || 'Use WalletConnect Wallet to sign your Ethereum transactions',
        isWalletInterface: true,
        walletMetadata: {
            name: 'unspecified',
            shortName: 'unspecified',
            description: 'unspecified'
        },
    };
    // additional optional args that might be passed while initializing the plugin
    var additionalOptions = {
        errorTimeout: args === null || args === void 0 ? void 0 : args.errorTimeout,
        network: args === null || args === void 0 ? void 0 : args.network,
    };
    var plugin = new WalletConnectProviderPlugin(pluginMetaData, additionalOptions);
    // return the wallet provider
    return plugin.makeWalletProvider;
};
exports.default = walletConnectProviderPlugin;
//# sourceMappingURL=plugin.js.map