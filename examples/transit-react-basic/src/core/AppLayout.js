"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var screen_1 = require("../shared/screen");
var LogoLink_1 = require("../shared/LogoLink");
var UserBlock_1 = __importDefault(require("./UserBlock"));
function AppLayout(_a) {
    var children = _a.children;
    return (react_1.default.createElement(screen_1.ScreenLayout, null,
        react_1.default.createElement(screen_1.ScreenContentHeader, null,
            react_1.default.createElement(screen_1.ScreenContentHeaderMain, null,
                react_1.default.createElement(LogoLink_1.LogoLink, { to: "/" })),
            react_1.default.createElement(UserBlock_1.default, null)),
        react_1.default.createElement(screen_1.ScreenContentBody, null,
            react_1.default.createElement(screen_1.ScreenContentBodyContainer, null, children))));
}
exports.AppLayout = AppLayout;
exports.default = AppLayout;
//# sourceMappingURL=AppLayout.js.map