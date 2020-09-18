"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var LoginScreen_1 = __importDefault(require("./login/LoginScreen"));
var AuthenticatedRoute_1 = __importDefault(require("./core/AuthenticatedRoute"));
var AppLayout_1 = require("./core/AppLayout");
var HomeScreen_1 = require("./HomeScreen");
var TestScreen_1 = require("./TestScreen");
function AppRoutes() {
    return (react_1.default.createElement(AppLayout_1.AppLayout, null,
        react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/login", exact: true, component: LoginScreen_1.default }),
            react_1.default.createElement(AuthenticatedRoute_1.default, null, function () { return (react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", exact: true, component: HomeScreen_1.HomeScreen }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/test", exact: true, component: TestScreen_1.TestScreen }))); }),
            "/>")));
}
exports.AppRoutes = AppRoutes;
exports.default = AppRoutes;
//# sourceMappingURL=AppRoutes.js.map