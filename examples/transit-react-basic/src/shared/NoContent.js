"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
var NoContentRoot = react_emotion_1.default('div')({
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
});
var NoContentFrame = react_emotion_1.default('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px 20px',
    border: '1px dashed rgba(255, 255, 255, 0.3)',
    textAlign: 'center'
});
var NoContentIcon = react_emotion_1.default('div')({
    fontSize: 36,
    color: 'rgba(255, 255, 255, 0.8)',
    '&:not(:last-child)': {
        marginBottom: 20
    }
});
var Message = react_emotion_1.default('div')({
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
    lineHeight: 1.2,
    '&:not(:last-child)': {
        marginBottom: 10
    }
});
var Sublabel = react_emotion_1.default('div')({
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    lineHeight: 1.2
});
function NoContent(_a) {
    var icon = _a.icon, message = _a.message, note = _a.note, className = _a.className;
    var Icon = icon;
    return (react_1.default.createElement(NoContentRoot, { className: className },
        react_1.default.createElement(NoContentFrame, null,
            Icon && (react_1.default.createElement(NoContentIcon, null,
                react_1.default.createElement(Icon, null))),
            react_1.default.createElement(Message, null, message),
            react_1.default.createElement(Sublabel, null, note))));
}
exports.NoContent = NoContent;
exports.default = NoContent;
//# sourceMappingURL=NoContent.js.map