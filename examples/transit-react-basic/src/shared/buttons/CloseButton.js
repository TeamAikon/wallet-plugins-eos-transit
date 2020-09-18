"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
var io_1 = require("react-icons/io");
exports.CloseButtonRoot = react_emotion_1.default('div')({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    color: 'white',
    transition: 'all 0.2s',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        color: '#26c5de',
        cursor: 'pointer'
    }
}, function (_a) {
    var size = _a.size;
    return ({
        width: size,
        height: size,
        fontSize: size * 0.8,
        '&:not(:last-child)': {
            marginRight: size / 4
        }
    });
});
function CloseButton(_a) {
    var onClick = _a.onClick, size = _a.size;
    return (react_1.default.createElement(exports.CloseButtonRoot, { size: size || 24, onClick: onClick },
        react_1.default.createElement(io_1.IoIosClose, null)));
}
exports.CloseButton = CloseButton;
exports.default = CloseButton;
//# sourceMappingURL=CloseButton.js.map