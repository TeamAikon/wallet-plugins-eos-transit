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
var helpers_1 = require("../helpers");
var WalletProviderIcon_1 = require("../wallets/WalletProviderIcon");
// Visual components
var TransactionAddonMenuItemRoot = react_emotion_1.default('div')({
    display: 'flex',
    width: '100%',
    // padding: '10px 10px',
    fontSize: 12,
    borderRadius: 1,
    backgroundColor: '#2e3542',
    transition: 'all 0.2s',
    '&:not(:last-child)': {
        marginBottom: 2
    },
    '&:hover': {
        backgroundColor: '#40495a',
        cursor: 'pointer'
    },
    '&:active': {
        backgroundColor: '#3a576b'
    }
});
var TransactionAddonMenuItemIcon = react_emotion_1.default('div')({
    flexShrink: 0,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 40,
    padding: 10,
    fontSize: 18,
    color: '#26c5df'
});
var TransactionAddonMenuItemBody = react_emotion_1.default('div')({
    flex: 1,
    padding: '10px 10px 10px 0'
});
var TransactionAddonMenuItemLabel = react_emotion_1.default('div')({
    color: '#26c5df',
    '&:not(:last-child)': {
        marginBottom: 2
    }
});
var TransactionAddonMenuItemSublabel = react_emotion_1.default('div')({
    fontSize: 11,
    color: 'white',
    '&:not(:last-child)': {
        marginBottom: 2
    }
});
var TransactionAddonMenuItemBalance = react_emotion_1.default('div')({
    padding: '10px 15px 10px 0',
    width: 130,
    fontSize: 14,
    fontWeight: 300,
    '&:not(:last-child)': {
        marginBottom: 8
    },
    '& strong': {
        fontWeight: 400
    },
    '& small': {
        fontSize: 14
    }
});
var TransactionAddonMenuItem = /** @class */ (function (_super) {
    __extends(TransactionAddonMenuItem, _super);
    function TransactionAddonMenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            var _a = _this.props, onSelect = _a.onSelect, wallet = _a.wallet;
            if (typeof onSelect === 'function') {
                onSelect(wallet);
            }
        };
        return _this;
    }
    TransactionAddonMenuItem.prototype.render = function () {
        var handleClick = this.handleClick;
        var wallet = this.props.wallet;
        var auth = wallet.auth, accountInfo = wallet.accountInfo;
        return (react_1.default.createElement(TransactionAddonMenuItemRoot, { onClick: handleClick },
            react_1.default.createElement(TransactionAddonMenuItemIcon, null,
                react_1.default.createElement(WalletProviderIcon_1.WalletProviderIcon, { providerId: wallet.provider.id })),
            auth && (react_1.default.createElement(TransactionAddonMenuItemBody, null,
                react_1.default.createElement(TransactionAddonMenuItemLabel, null,
                    auth.accountName,
                    "@",
                    auth.permission),
                wallet.provider.meta &&
                    wallet.provider.meta.shortName && (react_1.default.createElement(TransactionAddonMenuItemSublabel, null,
                    "using ",
                    wallet.provider.meta.shortName)))),
            accountInfo && (react_1.default.createElement(TransactionAddonMenuItemBalance, null,
                react_1.default.createElement("strong", null, helpers_1.toNumber(accountInfo.core_liquid_balance).toFixed(4)),
                ' ',
                react_1.default.createElement("small", null, "EOS")))));
    };
    return TransactionAddonMenuItem;
}(react_1.Component));
exports.TransactionAddonMenuItem = TransactionAddonMenuItem;
exports.default = TransactionAddonMenuItem;
//# sourceMappingURL=TransactionAddonMenuItem.js.map