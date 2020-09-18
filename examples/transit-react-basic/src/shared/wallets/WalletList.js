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
var WalletListItem_1 = __importDefault(require("./WalletListItem"));
var WalletStateSubscribe_1 = __importDefault(require("WalletStateSubscribe"));
// Visual components
var WalletListRoot = react_emotion_1.default('div')({
    width: '100%',
    marginBottom: 4
});
var WalletList = /** @class */ (function (_super) {
    __extends(WalletList, _super);
    function WalletList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WalletList.prototype.render = function () {
        var _a = this.props, walletProviders = _a.walletProviders, wallets = _a.wallets, onItemSelect = _a.onItemSelect, onItemDismissClick = _a.onItemDismissClick, onItemLogoutClick = _a.onItemLogoutClick, onItemReconnectClick = _a.onItemReconnectClick;
        return (react_1.default.createElement(WalletListRoot, null,
            walletProviders &&
                walletProviders.map(function (walletProvider, i) { return (react_1.default.createElement(WalletListItem_1.default, { key: i, walletProvider: walletProvider, onSelect: onItemSelect, onDismissClick: onItemDismissClick, onLogoutClick: onItemLogoutClick, onReconnectClick: onItemReconnectClick })); }),
            wallets &&
                wallets.map(function (wallet, i) { return (react_1.default.createElement(WalletStateSubscribe_1.default, { wallet: wallet, key: i }, function () { return (react_1.default.createElement(WalletListItem_1.default, { walletProvider: wallet.provider, wallet: wallet, onSelect: onItemSelect, onDismissClick: onItemDismissClick, onLogoutClick: onItemLogoutClick, onReconnectClick: onItemReconnectClick })); })); })));
    };
    return WalletList;
}(react_1.Component));
exports.WalletList = WalletList;
exports.default = WalletList;
//# sourceMappingURL=WalletList.js.map