"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var eos_transit_1 = __importDefault(require("eos-transit"));
var UserDropdown_1 = require("./UserDropdown");
var accessContext = eos_transit_1.default.accessContext;
function UserBlock(_a) {
    var children = _a.children, username = _a.username;
    return react_1.default.createElement(UserDropdown_1.UserDropdown, { username: username });
}
exports.UserBlock = UserBlock;
function UserBlockConnected(_a) {
    var children = _a.children;
    var isLoggedIn = !!accessContext.getActiveWallets().length;
    if (!isLoggedIn)
        return null;
    var auth = accessContext.getActiveWallets()[0].auth;
    var username = (auth && auth.accountName + "@" + auth.permission) || void 0;
    return react_1.default.createElement(UserBlock, { username: username }, children);
}
exports.UserBlockConnected = UserBlockConnected;
exports.default = UserBlockConnected;
//# sourceMappingURL=UserBlock.js.map