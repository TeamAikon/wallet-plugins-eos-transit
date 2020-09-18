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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var eos_transit_1 = __importDefault(require("eos-transit"));
var AccessContextSubscribe = /** @class */ (function (_super) {
    __extends(AccessContextSubscribe, _super);
    function AccessContextSubscribe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleAccessContextUpdate = function () {
            if (!_this.unmounted)
                _this.forceUpdate();
        };
        return _this;
    }
    AccessContextSubscribe.prototype.componentDidMount = function () {
        this.unsubscribe = eos_transit_1.default.accessContext.subscribe(this.handleAccessContextUpdate);
    };
    AccessContextSubscribe.prototype.componentWillUnmount = function () {
        this.unmounted = true;
        var unsubscribe = this.unsubscribe;
        if (typeof unsubscribe === 'function')
            unsubscribe();
    };
    AccessContextSubscribe.prototype.render = function () {
        var children = this.props.children;
        if (typeof children !== 'function')
            return null;
        return children(eos_transit_1.default.accessContext);
    };
    return AccessContextSubscribe;
}(react_1.Component));
exports.AccessContextSubscribe = AccessContextSubscribe;
exports.default = AccessContextSubscribe;
//# sourceMappingURL=AccessContextSubscribe.js.map