"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var eos_transit_1 = __importDefault(require("eos-transit"));
var NoContent_1 = require("../shared/NoContent");
var WalletList_1 = require("../shared/wallets/WalletList");
var accessContext = eos_transit_1.default.accessContext;
function AvailableWalletList(_a) {
    var onItemSelect = _a.onItemSelect;
    var addedWallets = accessContext.getWallets();
    var availableWalletProviders = accessContext.getWalletProviders();
    // d.filter((walletProvider) => !addedWallets.some((w) => w.provider.id === walletProvider.id));
    if (!availableWalletProviders.length) {
        return react_1.default.createElement(NoContent_1.NoContent, { message: "No available wallet providers" });
    }
    return (react_1.default.createElement(WalletList_1.WalletList, { walletProviders: availableWalletProviders, onItemSelect: function (walletProvider) {
            // TODO: Implement in a cleaner way
            if (typeof onItemSelect === 'function') {
                onItemSelect();
            }
            var wallet = accessContext.initWallet(walletProvider);
            var start = window.performance.now();
            wallet.connect().then(function () {
                var end = window.performance.now();
                var time = end - start;
                console.log(time);
                wallet.discover({ pathIndexList: [0] }).then(function (discoveryData) {
                    console.log(discoveryData);
                    // console.timeEnd('someFunction');
                    if (discoveryData.keyToAccountMap.length > 0) {
                        var index = 0;
                        var keyObj = discoveryData.keyToAccountMap[index];
                        var accountName = keyObj.accounts[0].account;
                        var authorization = keyObj.accounts[0].authorization;
                        wallet.login(accountName, authorization);
                    }
                    else {
                        // 0 keys returned, we need to user to select an account
                        wallet.login();
                    }
                });
            });
        } }));
}
exports.AvailableWalletList = AvailableWalletList;
exports.default = AvailableWalletList;
//# sourceMappingURL=AvailableWalletList.js.map