"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
var WalletListItemStatusLabel = react_emotion_1.default('div')(function (_a) {
    var large = _a.large, success = _a.success, error = _a.error;
    return ({
        fontSize: large ? 13 : 11,
        color: error ? '#e84a75' : success ? '#26c5df' : 'rgba(255, 255, 255, 0.45)'
    });
});
// Helpers
function renderProviderDescription(walletProvider, large) {
    var providerDescription = walletProvider.meta && walletProvider.meta.description;
    return (react_1.default.createElement(WalletListItemStatusLabel, { large: large }, providerDescription));
}
function WalletListItemStatus(_a) {
    var walletProvider = _a.walletProvider, wallet = _a.wallet, large = _a.large;
    if (!wallet) {
        return renderProviderDescription(walletProvider, large);
    }
    var hasError = wallet.hasError, errorMessage = wallet.errorMessage, inProgress = wallet.inProgress, active = wallet.active, auth = wallet.auth;
    var username = (auth && auth.accountName + "@" + auth.permission) || 'unknown';
    return hasError ? (react_1.default.createElement(WalletListItemStatusLabel, { error: true, large: large }, errorMessage)) : active ? (react_1.default.createElement(WalletListItemStatusLabel, { success: true, large: large },
        "Connected ",
        username ? react_1.default.createElement("span", null,
            "as ",
            username) : null)) : inProgress ? (react_1.default.createElement(WalletListItemStatusLabel, { large: large }, "Connecting to wallet, please stand by...")) : (renderProviderDescription(walletProvider, large));
}
exports.WalletListItemStatus = WalletListItemStatus;
exports.default = WalletListItemStatus;
//# sourceMappingURL=WalletListItemStatus.js.map