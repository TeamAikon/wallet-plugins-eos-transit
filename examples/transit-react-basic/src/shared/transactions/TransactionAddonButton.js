"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_emotion_1 = __importDefault(require("react-emotion"));
exports.TransactionAddonButton = react_emotion_1.default('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 44,
    padding: '10px 15px',
    color: 'white',
    fontSize: 18,
    fontWeight: 300,
    backgroundColor: '#2e3542',
    border: 'none',
    borderLeft: '1px solid rgba(0, 0, 0, 0.3)',
    outline: 'none',
    textTransform: 'uppercase',
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    boxShadow: '0 7px 15px -4px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.2s, transform 0.1s',
    '& strong': {
        fontWeight: 600
    },
    '&:hover': {
        backgroundColor: '#40495a',
        borderColor: 'transparent',
        cursor: 'pointer'
    },
    '&:active': {
        backgroundColor: '#485163',
        boxShadow: '0 4px 15px -7px rgba(0, 0, 0, 0.8)',
        transform: 'translateY(1px)'
    }
}, function (_a) {
    var disabled = _a.disabled, success = _a.success, danger = _a.danger;
    var style = {};
    if (disabled) {
        Object.assign(style, {
            '&, &:hover': {
                borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
                backgroundColor: '#2e3542',
                boxShadow: '0 7px 15px -4px rgba(0, 0, 0, 0.4)',
                color: '#576b7d',
                cursor: 'default'
            },
            '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 7px 15px -4px rgba(0, 0, 0, 0.4)',
            }
        });
    }
    if (danger) {
        Object.assign(style, {
            backgroundColor: '#582a30',
            borderColor: 'rgba(0, 0, 0, 0.3)',
            color: '#e87494',
            '&:hover, &:active': {
                backgroundColor: disabled ? '#582a30' : '#802e38',
                cursor: disabled ? 'default' : 'pointer'
            }
        });
    }
    if (success) {
        Object.assign(style, {
            '&, &:hover': {
                backgroundColor: '#11a067',
                borderColor: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                cursor: 'default'
            }
        });
    }
    return style;
});
exports.default = exports.TransactionAddonButton;
//# sourceMappingURL=TransactionAddonButton.js.map