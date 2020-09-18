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
var WalletListItemProgressRoot = react_emotion_1.default('div')({
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'stretch',
    height: 2,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    transform: 'scaleY(0)',
    transition: 'all 0.2s',
    '&:last-child': {
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1
    }
}, function (_a) {
    var active = _a.active;
    if (active) {
        return {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'scaleY(1)'
        };
    }
    return {};
});
var progressIndeterminateAnimation = react_emotion_1.keyframes({
    from: { left: '-100%' },
    to: { left: '100%' }
});
var WalletListItemProgressBar = react_emotion_1.default('div')({
    position: 'absolute',
    height: 2,
    backgroundColor: '#26c5df',
    transition: 'all 0.1s'
}, function (_a) {
    var indeterminate = _a.indeterminate, percentComplete = _a.percentComplete;
    if (indeterminate) {
        return {
            width: '70%',
            animation: progressIndeterminateAnimation + " 2s ease-in-out infinite"
        };
    }
    if (typeof percentComplete !== 'undefined') {
        return { width: percentComplete + "%" };
    }
    return {};
});
function WalletListItemProgress(_a) {
    var active = _a.active, indeterminate = _a.indeterminate, percentComplete = _a.percentComplete;
    return (react_1.default.createElement(WalletListItemProgressRoot, { active: active },
        react_1.default.createElement(WalletListItemProgressBar, { indeterminate: indeterminate, percentComplete: percentComplete })));
}
exports.WalletListItemProgress = WalletListItemProgress;
exports.default = WalletListItemProgress;
//# sourceMappingURL=WalletListItemProgress.js.map