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
Object.defineProperty(exports, "__esModule", { value: true });
var Web3_1 = __importStar(require("./Web3"));
var Web3ProviderPlugin = /** @class */ (function (_super) {
    __extends(Web3ProviderPlugin, _super);
    function Web3ProviderPlugin(metaData, additionalOptions) {
        var _this = _super.call(this, metaData, additionalOptions) || this;
        _this.assertIsDesiredNetwork = _this.assertIsDesiredNetwork.bind(_this);
        _this.getChainIdFromNetwork = _this.getChainIdFromNetwork.bind(_this);
        _this.handleOnSelectAccount = _this.handleOnSelectAccount.bind(_this);
        _this.handleOnSelectNetwork = _this.handleOnSelectNetwork.bind(_this);
        _this.popupSelectDesiredNetworkIfNeeded = _this.popupSelectDesiredNetworkIfNeeded.bind(_this);
        return _this;
    }
    Web3ProviderPlugin.prototype.connect = function (appName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var res, error_1;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 4, , 5]);
                                    return [4 /*yield*/, ((_a = window === null || window === void 0 ? void 0 : window.ethereum) === null || _a === void 0 ? void 0 : _a.enable())];
                                case 1:
                                    _b.sent();
                                    return [4 /*yield*/, _super.prototype.connect.call(this, appName, window.ethereum)];
                                case 2:
                                    res = _b.sent();
                                    // check if current selected network matches requested network, if not display network chenage popup
                                    return [4 /*yield*/, this.popupSelectDesiredNetworkIfNeeded(this.networkConfig)];
                                case 3:
                                    // check if current selected network matches requested network, if not display network chenage popup
                                    _b.sent();
                                    resolve(res);
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_1 = _b.sent();
                                    reject(error_1);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Web3ProviderPlugin.prototype.setupEventListeners = function () {
        var _a;
        // setup network change listener
        this.provider.on('network', this.handleOnSelectNetwork);
        // setup account change listener
        (_a = window === null || window === void 0 ? void 0 : window.ethereum) === null || _a === void 0 ? void 0 : _a.on('accountsChanged', this.handleOnSelectAccount);
    };
    /** Handle network change event */
    Web3ProviderPlugin.prototype.handleOnSelectNetwork = function (network, oldNetwork) {
        this.selectedNetwork = network;
        this.discover();
    };
    /** Handle account change event */
    Web3ProviderPlugin.prototype.handleOnSelectAccount = function (accounts) {
        var account = (accounts === null || accounts === void 0 ? void 0 : accounts.length) > 0 ? accounts[0] : undefined;
        this.selectedAccount = account;
        this.discover();
    };
    /** if requiredNetwork is not already selected in the wallet, trigger the wallet to prmompt the user to select the network */
    Web3ProviderPlugin.prototype.popupSelectDesiredNetworkIfNeeded = function (requiredNetwork) {
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
    Web3ProviderPlugin.prototype.getChainIdFromNetwork = function (network) {
        var chainId = network.chainId;
        var chainIdInt = Web3_1.isAString(chainId) ? parseInt(chainId) : chainId;
        var chainIdHex = "0x" + chainIdInt;
        return { chainIdInt: chainIdInt, chainIdHex: chainIdHex };
    };
    /** reject if requiredNetwork is not already selected in the wallet */
    Web3ProviderPlugin.prototype.assertIsDesiredNetwork = function (requiredNetwork) {
        var _a;
        var chainIdInt = this.getChainIdFromNetwork(requiredNetwork).chainIdInt;
        if (((_a = this.selectedNetwork) === null || _a === void 0 ? void 0 : _a.chainId) !== chainIdInt) {
            var errMsg = "Desired network not selected in wallet: Please select the it using the Wallet. Specified Network: " + JSON.stringify(requiredNetwork);
            throw new Error(errMsg);
        }
    };
    return Web3ProviderPlugin;
}(Web3_1.default));
// initialize the class and return it
var web3ProviderPlugin = function (args) {
    // plugin meta data
    var metaData = {
        id: (args === null || args === void 0 ? void 0 : args.id) || 'web3',
        name: (args === null || args === void 0 ? void 0 : args.name) || 'Web3 Web Wallet',
        shortName: (args === null || args === void 0 ? void 0 : args.shortName) || 'Web3',
        description: (args === null || args === void 0 ? void 0 : args.description) || 'Use Web3 Web Wallet to sign your Ethereum transactions',
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
    var plugin = new Web3ProviderPlugin(metaData, additionalOptions);
    // return the wallet provider
    return plugin.makeWalletProvider;
};
exports.default = web3ProviderPlugin;
//# sourceMappingURL=plugin.js.map