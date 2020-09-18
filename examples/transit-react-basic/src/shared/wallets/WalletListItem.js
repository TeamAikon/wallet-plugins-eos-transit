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
var io_1 = require("react-icons/io");
var SpinnerIcon_1 = require("../icons/SpinnerIcon");
var WalletListItemProgress_1 = require("./WalletListItemProgress");
var WalletListItemStatus_1 = require("./WalletListItemStatus");
var WalletListItemInfo_1 = require("./WalletListItemInfo");
var WalletProviderIcon_1 = require("./WalletProviderIcon");
// TODO: Connected backgroundColor: '#2b5a65'
var WalletListItemRoot = react_emotion_1.default('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2e3542',
    borderRadius: 1,
    transition: 'all 0.2s',
    '&:not(:last-child)': {
        marginBottom: 5
    }
}, function (_a) {
    var large = _a.large, active = _a.active, hasError = _a.hasError;
    // TODO: Organize this mess better
    var style = {};
    if (large) {
        Object.assign(style, {
            '&:not(:last-child)': {
                marginBottom: 15
            }
        });
    }
    if (hasError) {
        Object.assign(style, {
            backgroundColor: '#582a30'
        }, (active && {
            '&:hover': {
                backgroundColor: '#802e38',
                cursor: 'pointer'
            }
        }) ||
            void 0);
    }
    else if (active) {
        Object.assign(style, {
            '&:hover': {
                backgroundColor: '#40495a',
                cursor: 'pointer'
            },
            '&:active': {
                backgroundColor: '#3a576b'
            }
        });
    }
    return style;
});
var WalletListItemContent = react_emotion_1.default('div')({
    flex: 1,
    display: 'flex'
});
var WalletListItemIcon = react_emotion_1.default('div')(function (_a) {
    var large = _a.large, hasError = _a.hasError;
    return ({
        flexShrink: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: large ? 80 : 50,
        padding: large ? 18 : 13,
        fontSize: large ? 30 : 20,
        color: hasError ? '#d42543' : '#26c5df'
    });
});
var WalletListItemBody = react_emotion_1.default('div')(function (_a) {
    var large = _a.large;
    return ({
        flex: 1,
        padding: large ? '22px 22px 22px 0' : '13px 13px 12px 0'
    });
});
var WalletListItemBodyTop = react_emotion_1.default('div')({
    display: 'flex'
});
var WalletListItemBodyTopMain = react_emotion_1.default('div')({
    flex: 1
});
var WalletListItemBodyTopActions = react_emotion_1.default('div')({
    paddingLeft: 10
});
var WalletListItemTitle = react_emotion_1.default('div')(function (_a) {
    var large = _a.large;
    return ({
        padding: 0,
        paddingTop: 2,
        fontSize: large ? 16 : 14,
        color: 'white',
        '&:not(:last-child)': {
            marginBottom: large ? 8 : 6
        }
    });
});
var WalletListItemLabel = react_emotion_1.default('div')(function (_a) {
    var large = _a.large;
    return ({
        fontSize: large ? 16 : 12,
        color: 'rgba(255, 255, 255, 0.4)'
    });
});
exports.WalletListItemConnectButton = react_emotion_1.default('button')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    border: 'none',
    borderRadius: 1,
    padding: '8px 20px',
    fontSize: 11,
    fontWeight: 300,
    textAlign: 'center',
    backgroundColor: '#98243f',
    color: 'white',
    textTransform: 'uppercase',
    outline: 'none',
    transition: 'all 0.2s',
    '&:last-child': {
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1
    },
    '&:hover': {
        // backgroundColor: '#2e3542',
        backgroundColor: '#ab2847',
        color: 'white',
        cursor: 'pointer'
    },
    '&:active': {
        // backgroundColor: '#2e3542',
        backgroundColor: '#c3173f'
    }
});
exports.WalletListItemDismissButton = react_emotion_1.default('button')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 19,
    height: 19,
    border: 'none',
    borderRadius: 1,
    padding: 0,
    fontSize: 19,
    fontWeight: 300,
    lineHeight: 1,
    textAlign: 'center',
    // backgroundColor: '#98243f',
    backgroundColor: 'transparent',
    color: 'white',
    opacity: 0.5,
    outline: 'none',
    transition: 'all 0.2s',
    '&:hover': {
        // backgroundColor: '#2e3542',
        // backgroundColor: '#ab2847',
        color: 'white',
        opacity: 1,
        cursor: 'pointer'
    },
    '&:active': {
    // backgroundColor: '#2e3542',
    // backgroundColor: '#c3173f'
    }
});
var WalletListItem = /** @class */ (function (_super) {
    __extends(WalletListItem, _super);
    function WalletListItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSelect = function () {
            var isSelectable = _this.isSelectable;
            if (!isSelectable())
                return;
            var _a = _this.props, onSelect = _a.onSelect, walletProvider = _a.walletProvider;
            if (typeof onSelect === 'function') {
                onSelect(walletProvider);
            }
        };
        _this.handleReconnectClick = function () {
            var _a = _this.props, onReconnectClick = _a.onReconnectClick, wallet = _a.wallet;
            if (wallet && typeof onReconnectClick === 'function') {
                onReconnectClick(wallet);
            }
        };
        _this.handleLogoutClick = function () {
            var _a = _this.props, onLogoutClick = _a.onLogoutClick, wallet = _a.wallet;
            if (wallet && typeof onLogoutClick === 'function') {
                onLogoutClick(wallet);
            }
        };
        _this.handleDismissClick = function () {
            var _a = _this.props, onDismissClick = _a.onDismissClick, wallet = _a.wallet;
            if (wallet && typeof onDismissClick === 'function') {
                onDismissClick(wallet);
            }
        };
        _this.isSelectable = function () {
            var wallet = _this.props.wallet;
            return !wallet;
        };
        return _this;
    }
    WalletListItem.prototype.render = function () {
        var _a = this.props, large = _a.large, dismissable = _a.dismissable;
        var _b = this, isSelectable = _b.isSelectable, handleSelect = _b.handleSelect, handleReconnectClick = _b.handleReconnectClick, handleDismissClick = _b.handleDismissClick, handleLogoutClick = _b.handleLogoutClick;
        var _c = this.props, walletProvider = _c.walletProvider, wallet = _c.wallet;
        // Note: Temp hackery
        var walletState = (wallet && wallet.state) || {};
        var accountInfo = walletState.accountInfo;
        var hasError = (wallet && wallet.hasError) || false;
        var inProgress = (wallet && wallet.inProgress) || false;
        var active = (wallet && wallet.active) || false;
        var providerName = walletProvider.meta && walletProvider.meta.name;
        var IconComponent = this.props.iconComponent;
        var icon = inProgress ? (react_1.default.createElement(SpinnerIcon_1.SpinnerIcon, { size: large ? 26 : 24 })) : IconComponent ? (react_1.default.createElement(IconComponent, null)) : (react_1.default.createElement(WalletProviderIcon_1.WalletProviderIcon, { providerId: walletProvider.id }));
        return (react_1.default.createElement(WalletListItemRoot, { hasError: hasError, active: isSelectable(), large: large, onClick: handleSelect },
            react_1.default.createElement(WalletListItemContent, null,
                react_1.default.createElement(WalletListItemIcon, { hasError: hasError, large: large }, icon),
                react_1.default.createElement(WalletListItemBody, { large: large },
                    react_1.default.createElement(WalletListItemBodyTop, null,
                        react_1.default.createElement(WalletListItemBodyTopMain, null,
                            react_1.default.createElement(WalletListItemTitle, { large: large }, providerName),
                            react_1.default.createElement(WalletListItemStatus_1.WalletListItemStatus, { walletProvider: walletProvider, wallet: wallet, large: large })),
                        dismissable !== false && (react_1.default.createElement(react_1.default.Fragment, null,
                            active && (react_1.default.createElement(WalletListItemBodyTopActions, null,
                                react_1.default.createElement(exports.WalletListItemDismissButton, { onClick: handleLogoutClick },
                                    react_1.default.createElement(io_1.IoIosLogOut, null)))),
                            hasError && (react_1.default.createElement(WalletListItemBodyTopActions, null,
                                react_1.default.createElement(exports.WalletListItemDismissButton, { onClick: handleDismissClick },
                                    react_1.default.createElement(io_1.IoMdClose, null))))))),
                    accountInfo && (react_1.default.createElement(WalletListItemInfo_1.WalletListItemInfo, { accountInfo: accountInfo, compact: true })))),
            react_1.default.createElement(WalletListItemProgress_1.WalletListItemProgress, { active: inProgress, indeterminate: true }),
            hasError && (react_1.default.createElement(exports.WalletListItemConnectButton, { onClick: handleReconnectClick }, "Reconnect"))));
    };
    return WalletListItem;
}(react_1.Component));
exports.WalletListItem = WalletListItem;
exports.default = WalletListItem;
//# sourceMappingURL=WalletListItem.js.map