"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
var io_1 = require("react-icons/io");
exports.UserMenuAddWalletButtonRoot = react_emotion_1.default('div')({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: '1px dashed #424a56',
    borderRadius: 1,
    fontSize: 14,
    backgroundColor: '#20252f',
    color: 'white',
    textAlign: 'center',
    outline: 'none',
    transition: 'all 0.2s',
    '&:hover': {
        backgroundColor: '#2e3542',
        color: 'white',
        cursor: 'pointer',
        borderColor: '#346f77'
    },
    '&:active': {
        backgroundColor: '#26c5df',
        borderColor: 'transparent'
    }
});
var iconWidth = 50;
exports.UserMenuAddWalletButtonText = react_emotion_1.default('div')({
    flex: 1,
    padding: "13px " + (iconWidth + 13) + "px 13px 0",
    textAlign: 'center'
});
exports.UserMenuAddWalletButtonIcon = react_emotion_1.default('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: iconWidth,
    padding: 13,
    fontSize: 24,
    opacity: 0.5
});
function UserMenuAddWalletButton(_a) {
    var onClick = _a.onClick;
    return (react_1.default.createElement(exports.UserMenuAddWalletButtonRoot, { onClick: onClick },
        react_1.default.createElement(exports.UserMenuAddWalletButtonIcon, null,
            react_1.default.createElement(io_1.IoIosAddCircleOutline, null)),
        react_1.default.createElement(exports.UserMenuAddWalletButtonText, null, "Add Wallet")));
}
exports.UserMenuAddWalletButton = UserMenuAddWalletButton;
exports.default = UserMenuAddWalletButton;
//# sourceMappingURL=UserMenuAddWalletButton.js.map