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
var eos_transit_1 = __importDefault(require("eos-transit"));
var TransactionAddonMenuItem_1 = require("./TransactionAddonMenuItem");
var WalletStateSubscribe_1 = __importDefault(require("WalletStateSubscribe"));
// Visual components
var TransactionAddonMenuRoot = react_emotion_1.default('div')({
    minWidth: 250,
    width: 330,
    padding: '8px'
});
var TransactionAddonMenuHeader = react_emotion_1.default('header')({
    padding: '5px 0',
    fontSize: 11,
    fontWeight: 300,
    color: 'white',
    textTransform: 'uppercase',
    marginBottom: 5
});
var TransactionAddonMenu = /** @class */ (function (_super) {
    __extends(TransactionAddonMenu, _super);
    function TransactionAddonMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleItemSelect = function (wallet) {
            var onWalletSelect = _this.props.onWalletSelect;
            if (typeof onWalletSelect === 'function') {
                onWalletSelect(wallet);
            }
        };
        _this.getActiveWallets = function () {
            return eos_transit_1.default.accessContext.getActiveWallets();
        };
        return _this;
    }
    TransactionAddonMenu.prototype.render = function () {
        var _a = this, getActiveWallets = _a.getActiveWallets, handleItemSelect = _a.handleItemSelect;
        var activeWallets = getActiveWallets();
        return (react_1.default.createElement(TransactionAddonMenuRoot, null,
            react_1.default.createElement(TransactionAddonMenuHeader, null, "Run with wallet:"),
            activeWallets.map(function (wallet, i) { return (react_1.default.createElement(WalletStateSubscribe_1.default, { key: i, wallet: wallet }, function () { return react_1.default.createElement(TransactionAddonMenuItem_1.TransactionAddonMenuItem, { wallet: wallet, onSelect: handleItemSelect }); })); })));
    };
    return TransactionAddonMenu;
}(react_1.Component));
exports.TransactionAddonMenu = TransactionAddonMenu;
exports.default = TransactionAddonMenu;
//# sourceMappingURL=TransactionAddonMenu.js.map