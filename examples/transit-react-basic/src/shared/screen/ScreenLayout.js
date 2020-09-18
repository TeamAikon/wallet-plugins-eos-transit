"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_emotion_1 = __importDefault(require("react-emotion"));
exports.ScreenLayout = react_emotion_1.default('div')({
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch'
});
exports.default = exports.ScreenLayout;
//# sourceMappingURL=ScreenLayout.js.map