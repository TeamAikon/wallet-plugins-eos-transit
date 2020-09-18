"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_emotion_1 = __importDefault(require("react-emotion"));
exports.Input = react_emotion_1.default('input')({
    padding: 18,
    fontSize: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    // borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    // borderColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 2,
    color: 'white',
    backgroundColor: 'transparent',
    outline: 'none',
    transition: 'all 0.2s',
    '&:focus': {
        borderColor: '#26c5df'
    },
    '&:not([type=checkbox]):not([type=file])': {
        width: '100%'
    },
    '&[disabled]': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: 'rgba(255, 255, 255, 0.3)'
    }
});
exports.Input.displayName = 'Input';
exports.default = exports.Input;
//# sourceMappingURL=Input.js.map