"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEB3_DEFAULT_PERMISSION = exports.cloneObjectWithoutSpecificKeys = exports.isAString = exports.EthereumNetworkType = void 0;
var ethers_1 = require("ethers");
var msgpack_1 = require("@msgpack/msgpack");
var EthereumNetworkType;
(function (EthereumNetworkType) {
    EthereumNetworkType["EthMain"] = "eth_main";
    EthereumNetworkType["EthRopsten"] = "eth_ropsten";
})(EthereumNetworkType = exports.EthereumNetworkType || (exports.EthereumNetworkType = {}));
/** Export all helper functions */
/** Check if the given value is a string or instance of string */
function isAString(value) {
    if (!value)
        return false;
    return typeof value === 'string' || value instanceof String;
}
exports.isAString = isAString;
/** Clone and return a new object without given keys */
function cloneObjectWithoutSpecificKeys(originalObject, keysToRemove) {
    var newObject = Object.assign({}, originalObject);
    if (keysToRemove && keysToRemove.length > 0) {
        keysToRemove.map(function (key) {
            if (newObject[key]) {
                delete newObject[key];
            }
        });
    }
    return newObject;
}
exports.cloneObjectWithoutSpecificKeys = cloneObjectWithoutSpecificKeys;
exports.WEB3_DEFAULT_PERMISSION = 'active';
/**
 * Web3 plugin class, This contains all the common methods for all Web3 providers.
 * this supports browser based extensions and walletConnect
 */
var Web3Plugin = /** @class */ (function () {
    function Web3Plugin(metaData, additionalOptions) {
        this.accountToPublicKeyCache = [];
        this.discoveredAccounts = [];
        this.metaData = metaData;
        this.additionalOptions = additionalOptions;
        // set the method binding here
        this.assertIsConnected = this.assertIsConnected.bind(this);
        this.connect = this.connect.bind(this);
        this.discover = this.discover.bind(this);
        this.getAvailableKeys = this.getAvailableKeys.bind(this);
        this.login = this.login.bind(this);
        this.makeSignatureProvider = this.makeSignatureProvider.bind(this);
        this.makeWalletProvider = this.makeWalletProvider.bind(this);
        this.setupEventListeners = this.setupEventListeners.bind(this);
        this.sign = this.sign.bind(this);
        this.signArbitrary = this.signArbitrary.bind(this);
    }
    /** Connect with the given provider and return boolen response. */
    Web3Plugin.prototype.connect = function (appName, web3Provider) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    // create a new instance of ethers js using web3 provider
                    this.provider = new ethers_1.ethers.providers.Web3Provider(web3Provider, 'any');
                    // set the signer
                    this.signer = this.provider.getSigner(); // get the signer from provider
                    // setup the event listeners here.
                    this.setupEventListeners();
                    // return the response
                    if (this.provider) {
                        resolve(true);
                    }
                    else {
                        reject(this.metaData.id + ": Connect error");
                    }
                }
                catch (error) {
                    reject(error);
                }
                return [2 /*return*/];
            });
        }); });
    };
    /**
     * This method returns a list of all the accounts reported by the wallet
     * For web3 providers, it can't get the publicKey from the wallet so we don't return it here
     */
    Web3Plugin.prototype.discover = function (discoveryOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var accounts, _a, accountMap, keys, response, error_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.provider.listAccounts()];
                                case 1:
                                    accounts = _b.sent();
                                    _a = this.composeKeyToAccountMap(accounts), accountMap = _a.accountMap, keys = _a.keys;
                                    response = {
                                        keyToAccountMap: accountMap,
                                        keys: keys
                                    };
                                    this.discoveredAccounts = accountMap.map(function (am) { return ({
                                        publicKey: am.key,
                                        accountName: am.accounts[0].account,
                                        permission: am.accounts[0].authorization
                                    }); });
                                    resolve(response);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _b.sent();
                                    reject(error_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /** Disconnect from the currently connected web3 provider */
    Web3Plugin.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(true)];
            });
        });
    };
    /** Login is not required for web3 provider, connecting to wallet can be considered as login */
    Web3Plugin.prototype.login = function (accountName, authorization) {
        if (authorization === void 0) { authorization = exports.WEB3_DEFAULT_PERMISSION; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var account, firstAccount, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.assertIsConnected(reject);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.discover()];
                                case 2:
                                    _a.sent();
                                    if (accountName) {
                                        account = this.discoveredAccounts.find(function (a) { return accountName === a.accountName; });
                                        if (!account) {
                                            reject("Account " + accountName + " not found in wallet - can't login with it");
                                        }
                                        else {
                                            resolve(account);
                                        }
                                    }
                                    if (!this.discoveredAccounts || this.discoveredAccounts.length === 0) {
                                        reject('No accounts in wallet - please add or connect accounts in the wallet before logging in');
                                    }
                                    firstAccount = this.discoveredAccounts[0];
                                    this.loggedInAccount = firstAccount;
                                    resolve(firstAccount);
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_2 = _a.sent();
                                    reject(error_2);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /** Logout functionality is not present in web3 provider and cannot be implemented */
    Web3Plugin.prototype.logout = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.loggedInAccount = undefined;
                        resolve(true);
                    })];
            });
        });
    };
    /** Sign arbitrary string using web3 provider
      Returns the signed prefixed-message. This MUST treat:
      - Bytes as a binary message
      - string as a UTF8-message
      i.e. "0x1234" is a SIX (6) byte string, NOT 2 bytes of data
    */
    Web3Plugin.prototype.signArbitrary = function (data, userMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var signature, dataHash, address, publicKey, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.assertIsConnected(reject);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.signer.signMessage(data)];
                                case 2:
                                    signature = _a.sent();
                                    dataHash = ethers_1.ethers.utils.hashMessage(data);
                                    address = ethers_1.ethers.utils.verifyMessage(data, signature);
                                    publicKey = this.getPublicKeyFromSignedHash(dataHash, signature);
                                    this.addToAccountToPublicKeyMap(address, publicKey);
                                    resolve(signature);
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_1 = _a.sent();
                                    reject(err_1);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /** Signs the provided transaction */
    Web3Plugin.prototype.sign = function (_a) {
        var serializedTransaction = _a.serializedTransaction;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var decodedTransaction, signedTransaction, decodedContract, contract, contractConnectedWithSigner, _a, hash, from, r, s, v, transaction, signature, raw, msgHash, publicKey, error_3;
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _c.trys.push([0, 5, , 6]);
                                    this.assertIsConnected(reject);
                                    decodedTransaction = msgpack_1.decode(serializedTransaction);
                                    signedTransaction = void 0;
                                    if (!(decodedTransaction === null || decodedTransaction === void 0 ? void 0 : decodedTransaction.contract)) return [3 /*break*/, 2];
                                    decodedContract = decodedTransaction.contract;
                                    contract = new ethers_1.ethers.Contract(decodedTransaction.to, decodedContract.abi, this.signer);
                                    contractConnectedWithSigner = contract.connect(this.signer);
                                    return [4 /*yield*/, (_b = contractConnectedWithSigner.functions)[decodedContract.method].apply(_b, __spread(decodedContract.parameters))];
                                case 1:
                                    signedTransaction = _c.sent();
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, this.signer.sendTransaction(decodedTransaction)];
                                case 3:
                                    signedTransaction = _c.sent();
                                    _c.label = 4;
                                case 4:
                                    _a = this.mapTransactionResponseToTransaction(signedTransaction), hash = _a.hash, from = _a.from, r = _a.r, s = _a.s, v = _a.v, transaction = __rest(_a, ["hash", "from", "r", "s", "v"]);
                                    signature = ethers_1.ethers.utils.joinSignature({ r: r, s: s, v: v });
                                    raw = ethers_1.ethers.utils.serializeTransaction(transaction);
                                    msgHash = ethers_1.ethers.utils.keccak256(raw);
                                    publicKey = this.getPublicKeyFromSignedHash(msgHash, signature);
                                    this.addToAccountToPublicKeyMap(from, publicKey);
                                    resolve({
                                        signatures: signature ? [signature] : [],
                                        serializedTransaction: msgpack_1.encode(raw)
                                    });
                                    return [3 /*break*/, 6];
                                case 5:
                                    error_3 = _c.sent();
                                    reject(error_3);
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /** Make the signature provider, this contains sign and getAvailableKeys methods */
    Web3Plugin.prototype.makeSignatureProvider = function () {
        return {
            sign: this.sign,
            getAvailableKeys: this.getAvailableKeys,
        };
    };
    /** This contains all the methods required and used by the eos-transit plugin */
    Web3Plugin.prototype.makeWalletProvider = function (network) {
        this.networkConfig = network;
        return {
            id: this.metaData.id,
            meta: cloneObjectWithoutSpecificKeys(this.metaData, ['id']),
            signatureProvider: this.makeSignatureProvider(),
            connect: this.connect,
            discover: this.discover,
            disconnect: this.disconnect,
            login: this.login,
            logout: this.logout,
            signArbitrary: this.signArbitrary
        };
    };
    /** Helper Methods
     * These are all the helper methods used by this class and web3 providers.
     */
    /** Setup all event listeners here
     * Each subClass must implement this method to setup event listeners
    */
    Web3Plugin.prototype.setupEventListeners = function () {
        // setup event listeners
    };
    /** Compose a map between public keys and the accounts/permission used by each one */
    Web3Plugin.prototype.composeKeyToAccountMap = function (accounts) {
        var _this = this;
        var accountMap = accounts === null || accounts === void 0 ? void 0 : accounts.map(function (account, index) {
            var _a;
            var publicKey = (_a = _this.accountToPublicKeyCache.find(function (a) { return a.account === account; })) === null || _a === void 0 ? void 0 : _a.publicKey;
            var keyMap = {
                index: index,
                key: publicKey,
                accounts: [
                    {
                        account: account,
                        authorization: 'active'
                    }
                ]
            };
            return keyMap;
        });
        var keys = accountMap.map(function (km) { return ({ index: km.index, key: km === null || km === void 0 ? void 0 : km.key }); });
        return { accountMap: accountMap, keys: keys };
    };
    /** Check if the provider exists or not. If not throw */
    Web3Plugin.prototype.assertIsConnected = function (reject) {
        if (!this.provider) {
            reject('Not connected. Call connect() before using this function');
        }
    };
    /** Extract a public key using the transaction/message hash and signature */
    Web3Plugin.prototype.getPublicKeyFromSignedHash = function (messageHash, signature) {
        var msgHashBytes = ethers_1.ethers.utils.arrayify(messageHash);
        var publicKey = ethers_1.ethers.utils.recoverPublicKey(msgHashBytes, signature);
        return publicKey;
    };
    /** Add a newly used public key so that it can show up next time discover is called */
    Web3Plugin.prototype.addToAccountToPublicKeyMap = function (account, publicKey) {
        var newKey = { account: account, publicKey: publicKey };
        this.accountToPublicKeyCache.push(newKey);
    };
    /** Extract the raw transaction from sign response (remove unnecessary fields) */
    Web3Plugin.prototype.mapTransactionResponseToTransaction = function (transactionResponse) {
        var to = transactionResponse.to, from = transactionResponse.from, nonce = transactionResponse.nonce, gasLimit = transactionResponse.gasLimit, gasPrice = transactionResponse.gasPrice, data = transactionResponse.data, value = transactionResponse.value, chainId = transactionResponse.chainId, r = transactionResponse.r, s = transactionResponse.s, v = transactionResponse.v;
        var transaction = {
            to: to,
            from: from,
            nonce: nonce,
            gasLimit: gasLimit,
            gasPrice: gasPrice,
            data: data,
            value: value,
            chainId: chainId,
            r: r,
            s: s,
            v: v
        };
        return transaction;
    };
    /** Web3 provider doesn't support discovering keys from the wallet. */
    Web3Plugin.prototype.getAvailableKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        reject(_this.metaData.id + ": getAvailableKeys is not supported");
                    })];
            });
        });
    };
    return Web3Plugin;
}());
exports.default = Web3Plugin;
//# sourceMappingURL=Web3.js.map