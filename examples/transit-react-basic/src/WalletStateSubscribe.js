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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var WalletStateSubscribe = /** @class */ (function (_super) {
    __extends(WalletStateSubscribe, _super);
    function WalletStateSubscribe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleWalletStateUpdate = function () {
            if (!_this.unmounted)
                _this.forceUpdate();
        };
        return _this;
    }
    WalletStateSubscribe.prototype.componentDidMount = function () {
        var wallet = this.props.wallet;
        this.unsubscribe = wallet.subscribe(this.handleWalletStateUpdate);
    };
    WalletStateSubscribe.prototype.componentWillUnmount = function () {
        this.unmounted = true;
        var unsubscribe = this.unsubscribe;
        if (typeof unsubscribe === 'function')
            unsubscribe();
    };
    WalletStateSubscribe.prototype.render = function () {
        var _a = this.props, children = _a.children, wallet = _a.wallet;
        if (typeof children !== 'function')
            return null;
        return children(wallet.state);
    };
    return WalletStateSubscribe;
}(react_1.Component));
exports.WalletStateSubscribe = WalletStateSubscribe;
exports.default = WalletStateSubscribe;
//# sourceMappingURL=WalletStateSubscribe.js.map