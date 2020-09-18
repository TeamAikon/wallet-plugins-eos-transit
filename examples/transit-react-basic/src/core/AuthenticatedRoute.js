"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
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
var react_router_dom_1 = require("react-router-dom");
var eos_transit_1 = __importDefault(require("eos-transit"));
function AuthenticatedRoute(_a) {
    var children = _a.children, component = _a.component, otherwiseRedirectTo = _a.otherwiseRedirectTo, rest = __rest(_a, ["children", "component", "otherwiseRedirectTo"]);
    function renderComponent(props) {
        if (typeof children === 'function') {
            return children(props);
        }
        if (react_1.Component) {
            return react_1.default.createElement(react_1.Component, __assign({}, props));
        }
        return null;
    }
    return (react_1.default.createElement(react_router_dom_1.Route, __assign({}, rest, { render: function (props) {
            var isLoggedIn = !!eos_transit_1.default.accessContext.getActiveWallets().length;
            if (isLoggedIn)
                return renderComponent(props);
            return (react_1.default.createElement(react_router_dom_1.Redirect, { to: {
                    pathname: otherwiseRedirectTo || '/login',
                    state: { from: props.location }
                } }));
        } })));
}
exports.AuthenticatedRoute = AuthenticatedRoute;
exports.default = react_router_dom_1.withRouter(AuthenticatedRoute);
//# sourceMappingURL=AuthenticatedRoute.js.map