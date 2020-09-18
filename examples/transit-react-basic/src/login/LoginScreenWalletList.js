"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
var WalletListItem_1 = __importDefault(require("../shared/wallets/WalletListItem"));
var WalletStateSubscribe_1 = __importDefault(require("../WalletStateSubscribe"));
var AccessContextSubscribe_1 = __importDefault(require("AccessContextSubscribe"));
// Visual components
var LoginScreenWalletListRoot = react_emotion_1.default('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 4
});
var LoginScreenWalletList = /** @class */ (function (_super) {
    __extends(LoginScreenWalletList, _super);
    function LoginScreenWalletList(props) {
        var _this = _super.call(this, props) || this;
        _this.handleWalletProviderSelect = function (walletProvider) {
            var onWalletProviderSelect = _this.props.onWalletProviderSelect;
            if (walletProvider && typeof onWalletProviderSelect === 'function') {
                onWalletProviderSelect(walletProvider);
            }
        };
        _this.handleReconnectClick = function (walletSession) {
            var onWalletReconnectClick = _this.props.onWalletReconnectClick;
            if (walletSession && typeof onWalletReconnectClick === 'function') {
                onWalletReconnectClick(walletSession);
            }
        };
        return _this;
    }
    LoginScreenWalletList.prototype.render = function () {
        var _a = this, handleWalletProviderSelect = _a.handleWalletProviderSelect, handleReconnectClick = _a.handleReconnectClick;
        var _b = this.props, walletProviders = _b.walletProviders, wallets = _b.wallets;
        var availableWalletProviders = walletProviders.filter(function (walletProvider) { return !wallets.some(function (w) { return w.provider.id === walletProvider.id; }); });
        return (react_1.default.createElement(AccessContextSubscribe_1.default, null, function () { return (react_1.default.createElement(LoginScreenWalletListRoot, null,
            wallets.map(function (wallet) { return (react_1.default.createElement(WalletStateSubscribe_1.default, { wallet: wallet, key: wallet.provider.id }, function () { return (react_1.default.createElement(WalletListItem_1.default, { onSelect: handleWalletProviderSelect, onReconnectClick: handleReconnectClick, walletProvider: wallet.provider, wallet: wallet, large: true, dismissable: false })); })); }),
            availableWalletProviders.map(function (walletProvider) { return (react_1.default.createElement(WalletListItem_1.default, { key: walletProvider.id, onSelect: handleWalletProviderSelect, onReconnectClick: handleReconnectClick, walletProvider: walletProvider, large: true, dismissable: false })); }))); }));
    };
    return LoginScreenWalletList;
}(react_1.Component));
exports.LoginScreenWalletList = LoginScreenWalletList;
exports.default = LoginScreenWalletList;
//# sourceMappingURL=LoginScreenWalletList.js.map