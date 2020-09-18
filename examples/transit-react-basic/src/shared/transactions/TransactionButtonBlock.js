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
var TransactionButton_1 = __importDefault(require("./TransactionButton"));
var TransactionAddonBlock_1 = require("./TransactionAddonBlock");
// Visual components
var TransactionButtonBlockRoot = react_emotion_1.default('div')({});
var TransactionButtonInnerContainer = react_emotion_1.default('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s, transform 0.1s'
});
var TransactionButtonStatusLabel = react_emotion_1.default('div')(function (_a) {
    var success = _a.success, hasError = _a.hasError;
    return ({
        padding: '8px 0',
        fontSize: 11,
        fontWeight: 300,
        color: success ? '#29d892' : hasError ? '#e87494' : 'white',
        textAlign: 'center'
    });
});
var TransactionButtonBlock = /** @class */ (function (_super) {
    __extends(TransactionButtonBlock, _super);
    function TransactionButtonBlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleTransactionButtonClick = function () {
            var defaultWallet = _this.props.defaultWallet;
            if (defaultWallet) {
                _this.requestTransaction(defaultWallet);
            }
        };
        _this.handleWalletSelect = function (wallet) {
            return _this.requestTransaction(wallet);
        };
        _this.requestTransaction = function (wallet) {
            var onTransactionRequested = _this.props.onTransactionRequested;
            if (wallet && typeof onTransactionRequested === 'function') {
                onTransactionRequested(wallet);
            }
        };
        return _this;
    }
    TransactionButtonBlock.prototype.render = function () {
        var _a = this, handleTransactionButtonClick = _a.handleTransactionButtonClick, handleWalletSelect = _a.handleWalletSelect;
        var _b = this.props, disabled = _b.disabled, inProgress = _b.inProgress, progressMessage = _b.progressMessage, hasError = _b.hasError, errorMessage = _b.errorMessage, success = _b.success, successMessage = _b.successMessage;
        return (react_1.default.createElement(TransactionButtonBlockRoot, null,
            react_1.default.createElement(TransactionButtonInnerContainer, null,
                react_1.default.createElement(TransactionButton_1.default, { onClick: handleTransactionButtonClick, inProgress: inProgress, success: success, disabled: disabled || inProgress || success, danger: hasError }),
                react_1.default.createElement(TransactionAddonBlock_1.TransactionAddonBlock, { disabled: disabled || inProgress || success, success: success, danger: hasError, onWalletSelect: handleWalletSelect })),
            react_1.default.createElement(TransactionButtonStatusLabel, { success: success, hasError: hasError }, inProgress
                ? progressMessage
                : hasError
                    ? errorMessage
                    : success
                        ? successMessage
                        : '')));
    };
    return TransactionButtonBlock;
}(react_1.Component));
exports.TransactionButtonBlock = TransactionButtonBlock;
exports.default = TransactionButtonBlock;
//# sourceMappingURL=TransactionButtonBlock.js.map