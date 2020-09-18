"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
exports.MenuSectionHeaderButtonRoot = react_emotion_1.default('div')({
    display: 'flex',
    alignItems: 'center',
    padding: '6px 10px',
    borderRadius: 1,
    fontSize: 11,
    fontWeight: 300,
    backgroundColor: '#20252f',
    color: 'white',
    textAlign: 'center',
    outline: 'none',
    transition: 'all 0.2s',
    textTransform: 'uppercase',
    '&:hover': {
        backgroundColor: '#2e3542',
        color: 'white',
        cursor: 'pointer',
        borderColor: '#346f77'
    },
    '&:active': {
        backgroundColor: '#40495a',
        // backgroundColor: '#26c5df',
        borderColor: 'transparent'
    }
}, function (_a) {
    var iconOnly = _a.iconOnly, danger = _a.danger;
    var style = {};
    if (iconOnly) {
        Object.assign(style, { paddingLeft: 6, paddingRight: 6 });
    }
    if (danger) {
        Object.assign(style, {
            '&:hover, &:active': {
                backgroundColor: '#802e38'
            }
        });
    }
    return style;
});
exports.MenuSectionHeaderButtonIcon = react_emotion_1.default('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    opacity: 0.5,
    '&:not(:last-child)': {
        marginRight: 6
    }
});
exports.MenuSectionHeaderButtonText = react_emotion_1.default('div')({
    flex: 1,
    textAlign: 'center'
});
function MenuSectionHeaderButton(_a) {
    var onClick = _a.onClick, icon = _a.icon, iconOnly = _a.iconOnly, danger = _a.danger, children = _a.children;
    var Icon = icon;
    return (react_1.default.createElement(exports.MenuSectionHeaderButtonRoot, { onClick: onClick, iconOnly: iconOnly, danger: danger },
        Icon && (react_1.default.createElement(exports.MenuSectionHeaderButtonIcon, null,
            react_1.default.createElement(Icon, null))),
        children && (react_1.default.createElement(exports.MenuSectionHeaderButtonText, null, children))));
}
exports.MenuSectionHeaderButton = MenuSectionHeaderButton;
exports.default = MenuSectionHeaderButton;
//# sourceMappingURL=MenuSectionHeaderButton.js.map