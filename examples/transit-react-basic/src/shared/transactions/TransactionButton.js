"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
var io_1 = require("react-icons/io");
var EosLogo_1 = require("../EosLogo");
var SpinnerIcon_1 = require("../icons/SpinnerIcon");
var TransactionButtonRoot = react_emotion_1.default('button')({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    padding: '10px 15px',
    color: 'white',
    fontSize: 12,
    fontWeight: 300,
    backgroundColor: '#2e3542',
    border: 'none',
    outline: 'none',
    textTransform: 'uppercase',
    borderTopLeftRadius: 1,
    borderBottomLeftRadius: 1,
    boxShadow: '0 7px 15px -4px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.2s, transform 0.1s',
    '& strong': {
        fontWeight: 600
    },
    '&:hover': {
        backgroundColor: '#40495a',
        cursor: 'pointer'
    },
    '&:active': {
        backgroundColor: '#485163',
        boxShadow: '0 4px 15px -7px rgba(0, 0, 0, 0.8)',
        transform: 'translateY(1px) scale(1)'
    }
}, function (_a) {
    var disabled = _a.disabled, inProgress = _a.inProgress, success = _a.success, danger = _a.danger;
    var style = {};
    if (disabled || inProgress) {
        Object.assign(style, {
            '&, &:hover': {
                backgroundColor: '#2e3542',
                boxShadow: '0 7px 15px -4px rgba(0, 0, 0, 0.4)',
                transform: 'translateY(0px) scale(1)',
                color: inProgress ? 'white' : '#576b7d',
                cursor: 'default'
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
                boxShadow: '0 7px 15px -4px rgba(0, 0, 0, 0.4)',
                transform: 'translateY(0px) scale(1)',
                color: 'white',
                cursor: 'default'
            }
        });
    }
    return style;
});
var TransactionButtonIcon = react_emotion_1.default('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    marginRight: 8,
    fontSize: 18,
    '& svg': {
        width: '100%',
        maxHeight: '100%'
    }
});
var TransactionButtonText = react_emotion_1.default('div')({
    flex: 1,
    padding: '0, 10px',
    textAlign: 'center'
});
var TransactionButton = /** @class */ (function (_super) {
    __extends(TransactionButton, _super);
    function TransactionButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransactionButton.prototype.render = function () {
        var _a = this.props, onClick = _a.onClick, inProgress = _a.inProgress, disabled = _a.disabled, success = _a.success, danger = _a.danger;
        return (react_1.default.createElement(TransactionButtonRoot, { type: "button", onClick: onClick, inProgress: inProgress, disabled: disabled, success: success, danger: danger },
            react_1.default.createElement(TransactionButtonIcon, null, inProgress ? (react_1.default.createElement(SpinnerIcon_1.SpinnerIcon, { size: 20 })) : danger ? (react_1.default.createElement(io_1.IoIosCloseCircle, null)) : success ? (react_1.default.createElement(io_1.IoMdCheckmark, null)) : (react_1.default.createElement(EosLogo_1.EosLogo, null))),
            react_1.default.createElement(TransactionButtonText, null, inProgress
                ? 'Processing...'
                : danger
                    ? 'Failed. Try again'
                    : success
                        ? 'Successful!'
                        : 'Run transaction')));
    };
    return TransactionButton;
}(react_1.Component));
exports.TransactionButton = TransactionButton;
exports.default = TransactionButton;
//# sourceMappingURL=TransactionButton.js.map