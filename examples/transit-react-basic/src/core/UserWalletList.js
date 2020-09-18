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
function UserWalletList() {
    var wallets = accessContext.getWallets();
    if (!wallets.length) {
        return (react_1.default.createElement(NoContent_1.NoContent, { message: "No active wallets", note: "Please add one to use the application" }));
    }
    return (react_1.default.createElement(WalletList_1.WalletList, { wallets: wallets, onItemDismissClick: function (wallet) { return wallet.terminate(); }, onItemLogoutClick: function (wallet) { return wallet.terminate(); }, onItemReconnectClick: function (wallet) { return wallet.connect(); } }));
}
exports.UserWalletList = UserWalletList;
exports.default = UserWalletList;
//# sourceMappingURL=UserWalletList.js.map