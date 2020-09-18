"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_emotion_1 = __importDefault(require("react-emotion"));
exports.ScreenContent = react_emotion_1.default('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch'
});
exports.ScreenContentHeader = react_emotion_1.default('header')({
    display: 'flex',
    padding: '25px 30px'
});
exports.ScreenContentHeaderMain = react_emotion_1.default('div')({
    flex: 1
});
exports.ScreenContentBody = react_emotion_1.default('main')({
    flex: 1,
    margin: '0 auto',
    padding: '30px 0'
}, function (_a) {
    var flex = _a.flex;
    return ({
        display: flex !== false ? 'flex' : 'block'
    });
});
exports.ScreenContentBodyContainer = react_emotion_1.default('div')({
    maxWidth: 480,
    width: 480
}, function (_a) {
    var flex = _a.flex;
    return ({
        display: flex !== false ? 'flex' : 'block',
        flexDirection: 'column'
    });
});
exports.ScreenContentFooter = react_emotion_1.default('footer')({});
//# sourceMappingURL=ScreenContent.js.map