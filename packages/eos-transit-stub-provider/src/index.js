"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
// A fake wallet provider that does nothing and always
// errors on connection attempts. Useful for demoing.
var accountPublickey;
function logIfDebugEnabled(msg) {
    var debug = localStorage.getItem('DEBUG');
    if (debug === 'true') {
        console.log('IN WALLET: ' + msg);
    }
}
function makeSignatureProvider(network) {
    return {
        getAvailableKeys: function () {
            return __awaiter(this, void 0, void 0, function () {
                var arr;
                return __generator(this, function (_a) {
                    logIfDebugEnabled('In getAvailableKeys');
                    logIfDebugEnabled('Return Key: ' + accountPublickey);
                    arr = [accountPublickey];
                    return [2 /*return*/, arr];
                });
            });
        },
        sign: function (signatureProviderArgs) {
            return __awaiter(this, void 0, void 0, function () {
                var signatureArray, respone;
                return __generator(this, function (_a) {
                    logIfDebugEnabled('In Sign');
                    signatureArray = [''];
                    respone = {
                        signatures: signatureArray,
                        serializedTransaction: signatureProviderArgs.serializedTransaction
                    };
                    return [2 /*return*/, respone];
                });
            });
        }
    };
}
function discover(discoveryOptions) {
    logIfDebugEnabled('The discover() method of myWallet was called');
    // You probably do not need to implement this method.
    return new Promise(function (resolve, reject) {
        var discoveryInfo = {
            keys: [],
            note: 'Wallet does not support discovery'
        };
        resolve(discoveryInfo);
    });
}
function signArbitrary(data, userMessage) {
    return new Promise(function (resolve, reject) {
        reject('not implemented');
    });
}
function stubWalletProvider(_a) {
    var id = _a.id, name = _a.name, shortName = _a.shortName, description = _a.description, errorTimeout = _a.errorTimeout;
    return function makeWalletProvider(network) {
        function connect(appName) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    reject("Cannot connect to \"" + shortName + "\" wallet provider");
                }, errorTimeout || 2500);
            });
        }
        function disconnect() {
            return Promise.resolve();
        }
        // Authentication
        function login(accountName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            setTimeout(function () {
                                reject("Cannot login to \"" + shortName + "\" wallet provider");
                            }, errorTimeout || 2500);
                        })];
                });
            });
        }
        function logout(accountName) {
            return Promise.resolve(true);
        }
        var walletProvider = {
            id: id,
            meta: {
                name: name,
                shortName: shortName,
                description: description
            },
            signatureProvider: makeSignatureProvider(network),
            connect: connect,
            discover: discover,
            disconnect: disconnect,
            login: login,
            logout: logout,
            signArbitrary: signArbitrary
        };
        return walletProvider;
    };
}
exports.stubWalletProvider = stubWalletProvider;
exports.default = stubWalletProvider;
// force rebuild 2
//# sourceMappingURL=index.js.map