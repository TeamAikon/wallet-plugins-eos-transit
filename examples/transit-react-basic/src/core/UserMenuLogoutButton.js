"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
var eos_transit_1 = __importDefault(require("eos-transit"));
var io_1 = require("react-icons/io");
var accessContext = eos_transit_1.default.accessContext;
exports.UserMenuLogoutButtonRoot = react_emotion_1.default('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    border: 'none',
    borderRadius: 1,
    padding: '10px 20px',
    fontSize: 14,
    backgroundColor: '#20252f',
    color: 'white',
    textAlign: 'center',
    outline: 'none',
    transition: 'all 0.2s',
    '&:hover': {
        // backgroundColor: '#2e3542',
        backgroundColor: '#98243f',
        color: 'white',
        cursor: 'pointer'
    },
    '&:active': {
        // backgroundColor: '#2e3542',
        backgroundColor: '#c3173f'
    }
});
exports.UserMenuLogoutButtonIcon = react_emotion_1.default('div')({
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10
});
exports.UserMenuLogoutButtonText = react_emotion_1.default('div')({});
function UserMenuLogoutButton(_a) {
    var onClick = _a.onClick;
    return (react_1.default.createElement(exports.UserMenuLogoutButtonRoot, { onClick: onClick },
        react_1.default.createElement(exports.UserMenuLogoutButtonText, null, "Logout"),
        react_1.default.createElement(exports.UserMenuLogoutButtonIcon, null,
            react_1.default.createElement(io_1.IoIosLogOut, null))));
}
exports.UserMenuLogoutButton = UserMenuLogoutButton;
function UserMenuLogoutButtonConnected() {
    return react_1.default.createElement(UserMenuLogoutButton, { onClick: function () { return accessContext.terminateAll(); } });
}
exports.UserMenuLogoutButtonConnected = UserMenuLogoutButtonConnected;
exports.default = UserMenuLogoutButtonConnected;
//# sourceMappingURL=UserMenuLogoutButton.js.map