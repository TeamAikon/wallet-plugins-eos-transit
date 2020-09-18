"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
require("minireset.css");
require("./initDefaultAccessContext");
var AppRoutes_1 = __importDefault(require("./AppRoutes"));
var globalStyles_1 = require("./globalStyles");
var AccessContextSubscribe_1 = __importDefault(require("AccessContextSubscribe"));
globalStyles_1.applyGlobalStyles();
var Root = function () { return (react_1.default.createElement(AccessContextSubscribe_1.default, null, function () { return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(AppRoutes_1.default, null))); })); };
react_dom_1.render(react_1.default.createElement(Root, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map