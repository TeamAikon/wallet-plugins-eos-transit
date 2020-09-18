"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_emotion_1 = __importDefault(require("react-emotion"));
exports.DropdownContent = react_emotion_1.default('div')({
    position: 'absolute',
    zIndex: 20,
    top: '100%',
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: '#171c24',
    color: 'white',
    boxShadow: '0 5px 30px -8px rgba(0, 0, 0, 0.5)',
    transform: 'scale(0)',
    transition: 'all 0.2s'
}, function (_a) {
    var alignRight = _a.alignRight, visible = _a.visible;
    return {
        display: 'block',
        visibility: visible ? 'visible' : 'hidden',
        // display: visible ? 'block' : 'none',
        right: alignRight ? 0 : 'auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) scaleY(1)' : 'scaleX(0.95) scaleY(0.9)',
        transformOrigin: 'top right'
    };
});
exports.DropdownContent.displayName = 'DropdownContent';
exports.default = exports.DropdownContent;
//# sourceMappingURL=DropdownContent.js.map