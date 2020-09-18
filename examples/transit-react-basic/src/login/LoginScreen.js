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
var react_router_1 = require("react-router");
var eos_transit_1 = __importDefault(require("eos-transit"));
var CloseButton_1 = require("../shared/buttons/CloseButton");
var LoginButton_1 = require("./LoginButton");
var LoginScreenWalletList_1 = require("./LoginScreenWalletList");
// Visual components
var LoginScreenRoot = react_emotion_1.default('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
});
var ContentPanelHeader = react_emotion_1.default('div')({
    display: 'flex',
    width: '100%',
    marginBottom: 15
});
var ContentPanelHeaderItem = react_emotion_1.default('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
}, function (_a) {
    var main = _a.main, alignEnd = _a.alignEnd;
    var style = {};
    if (main) {
        Object.assign(style, { flex: 1 });
    }
    if (alignEnd) {
        Object.assign(style, { justifyContent: 'flex-end' });
    }
    return style;
});
var ContentPanelHeading = react_emotion_1.default('span')({
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 300
});
var LoginScreen = /** @class */ (function (_super) {
    __extends(LoginScreen, _super);
    function LoginScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showLoginOptions: false
        };
        _this.switchScreen = function () {
            _this.setState(function (state) { return ({ showLoginOptions: !state.showLoginOptions }); });
        };
        _this.handleWalletProviderSelect = function (walletProvider) {
            var wallet = eos_transit_1.default.accessContext.initWallet(walletProvider);
            // wallet.connect().then(wallet.discover().then(wallet.login));
            // A callback of this kind can be supplied to the discover function, which will allow the caller to modify the list of keys before the account lookup process happens. 
            // The feature was added so that key returned from the Ledger device can be modified to have a ENU prefix when in use with the the enumivo chain 
            var keyModCallback = function (discoveryData) {
                console.log("Inside My KeyModifierCallback");
                console.log("Before data is modified");
                console.log(discoveryData);
                var modifiedDiscoveryData = discoveryData;
                if (modifiedDiscoveryData !== undefined && modifiedDiscoveryData.keys !== undefined && modifiedDiscoveryData.keys[0].key !== undefined) {
                    modifiedDiscoveryData.keys[0].key = modifiedDiscoveryData.keys[0].key.replace("EOS", "ENU");
                }
                console.log("After data is modified");
                console.log(modifiedDiscoveryData);
                return modifiedDiscoveryData;
            };
            wallet.connect().then(function () {
                var start1 = window.performance.now();
                // wallet.discover({ pathIndexList: [ 0,1 ], keyModifierFunc: keyModCallback} ).then((discoveryData: DiscoveryData) => {
                var myStorage = window.localStorage;
                var discoveryDataCached = localStorage.getItem('discoveryData');
                var presetKeyMap;
                var discoveryOptions = { pathIndexList: [0, 1] };
                if (discoveryDataCached) {
                    presetKeyMap = JSON.parse(discoveryDataCached);
                    console.log("LocalStorage contains data. presetKeyMap:");
                    console.log(presetKeyMap);
                    // Note: Setting this value will warm the discoveryData cache, this allows you to save discoveryData from a previous session and supply it again .. avoiding the network overhead of looking up the data again. 
                    // discoveryOptions.presetKeyMap = presetKeyMap;
                    // OR 
                    // discoveryOptions.presetKeyMap = [{
                    //   key: "EOS5TYtUXsbRJrz61gsQWQho6AYyCcRFgbFm4TPfrEbzb43x8Ewfq",
                    //   index: 0
                    // }];
                    if (discoveryOptions.presetKeyMap) {
                        console.log("Supply presetKeyMap and warm the cache");
                    }
                }
                wallet.discover(discoveryOptions).then(function (discoveryData) {
                    localStorage.setItem('discoveryData', JSON.stringify(discoveryData.keyToAccountMap));
                    var end1 = window.performance.now();
                    var time1 = end1 - start1;
                    console.log(time1);
                    console.log(discoveryData);
                    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
                    if (discoveryData.keyToAccountMap.length > 0) {
                        // console.log(discoveryData.keyToAccountMap.length + ' keys returned, pick one');
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
        };
        _this.handleWalletReconnectClick = function (wallet) {
            wallet.connect().then(wallet.login);
        };
        _this.isLoggedIn = function () { return !!eos_transit_1.default.accessContext.getActiveWallets().length; };
        return _this;
    }
    LoginScreen.prototype.render = function () {
        var _a = this, switchScreen = _a.switchScreen, handleWalletProviderSelect = _a.handleWalletProviderSelect, handleWalletReconnectClick = _a.handleWalletReconnectClick, isLoggedIn = _a.isLoggedIn;
        var showLoginOptions = this.state.showLoginOptions;
        var _b = eos_transit_1.default.accessContext, getWallets = _b.getWallets, getWalletProviders = _b.getWalletProviders;
        if (isLoggedIn())
            return react_1.default.createElement(react_router_1.Redirect, { to: "/" });
        return (react_1.default.createElement(LoginScreenRoot, null, showLoginOptions ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ContentPanelHeader, null,
                react_1.default.createElement(ContentPanelHeaderItem, { main: true },
                    react_1.default.createElement(ContentPanelHeading, null, "Login Options")),
                react_1.default.createElement(ContentPanelHeaderItem, { alignEnd: true },
                    react_1.default.createElement(CloseButton_1.CloseButton, { onClick: switchScreen, size: 40 }))),
            react_1.default.createElement(LoginScreenWalletList_1.LoginScreenWalletList, { walletProviders: getWalletProviders(), wallets: getWallets(), onWalletProviderSelect: handleWalletProviderSelect, onWalletReconnectClick: handleWalletReconnectClick }))) : (react_1.default.createElement(LoginButton_1.LoginButton, { onClick: switchScreen }))));
    };
    return LoginScreen;
}(react_1.Component));
exports.LoginScreen = LoginScreen;
exports.default = react_router_1.withRouter(LoginScreen);
//# sourceMappingURL=LoginScreen.js.map