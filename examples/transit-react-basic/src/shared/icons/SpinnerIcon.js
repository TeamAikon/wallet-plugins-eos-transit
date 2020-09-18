"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_emotion_1 = __importStar(require("react-emotion"));
var spinAnimation = react_emotion_1.keyframes({
    '0%': { transform: "rotate(0deg)" },
    '100%': { transform: "rotate(359deg)" }
});
exports.SpinnerIconRoot = react_emotion_1.default('div')({
    display: 'inline-flex',
    '&:after': {
        content: '" "',
        display: 'block',
        margin: 1,
        borderRadius: '50%',
        border: '2px solid #fff',
        borderColor: '#fff transparent #fff transparent',
        animation: spinAnimation + " 1.2s infinite linear"
    }
}, function (_a) {
    var size = _a.size;
    return ({
        '&:after': {
            width: size,
            height: size
        },
        '&:not(:last-child)': {
            marginRight: size / 2
        }
    });
});
function SpinnerIcon(_a) {
    var size = _a.size;
    return react_1.default.createElement(exports.SpinnerIconRoot, { size: size || 16 });
}
exports.SpinnerIcon = SpinnerIcon;
exports.default = SpinnerIcon;
//# sourceMappingURL=SpinnerIcon.js.map