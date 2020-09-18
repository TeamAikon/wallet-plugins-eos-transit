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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
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
var eos_transit_1 = __importDefault(require("eos-transit"));
var TransactionButtonBlock_1 = require("./shared/transactions/TransactionButtonBlock");
var forms_1 = require("./shared/forms");
var eosActions_1 = require("./core/eosActions");
var react_router_dom_1 = require("react-router-dom");
var accessContext = eos_transit_1.default.accessContext;
// Visual components
var PaymentFormRoot = react_emotion_1.default('div')({
    marginBottom: 20,
    padding: 30
});
var PaymentFormActions = react_emotion_1.default(forms_1.FormActions)({
    paddingTop: 20
});
var PaymentFormTitle = react_emotion_1.default('h1')({
    margin: 0,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 600,
    textTransform: 'uppercase',
    color: 'white'
});
var TestLinkTitle = react_emotion_1.default('h1')({
    margin: 0,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 600,
    textTransform: 'uppercase',
    color: 'white'
});
var PaymentFormResetButton = react_emotion_1.default('button')({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    margin: '30px auto',
    padding: '10px 15px',
    color: 'white',
    fontSize: 12,
    fontWeight: 300,
    backgroundColor: '#2e3542',
    border: 'none',
    outline: 'none',
    // textTransform: 'uppercase',
    borderRadius: 1,
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
});
var defaultProgressMessage = 'Transaction in progress, please stand by';
var defaultSuccessMessage = 'Transaction completed. See console for details';
var defaultErrorMessage = 'Transaction failed. See console for details';
var DEFAULT_STATE = {
    receiverName: 'wozzawozza55',
    amount: 0.0001,
    txnCount: 1,
    inProgress: false,
    hasError: false,
    success: false
};
var PaymentForm = /** @class */ (function (_super) {
    __extends(PaymentForm, _super);
    function PaymentForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = __assign({}, DEFAULT_STATE);
        _this.handleAmountChange = function (event) {
            _this.setState({ amount: Number(event.currentTarget.value) });
        };
        _this.handleTxnCountChange = function (event) {
            _this.setState({ txnCount: Number(event.currentTarget.value) });
        };
        _this.handleSubmit = function (wallet) {
            var _a = _this.state, amount = _a.amount, receiverName = _a.receiverName, txnCount = _a.txnCount;
            if (!wallet) {
                _this.setState({ hasError: true, errorMessage: defaultErrorMessage });
                return;
            }
            _this.setState({
                inProgress: true,
                hasError: false,
                success: false,
                progressMessage: defaultProgressMessage
            });
            // return stake(wallet)
            // 	.then((result: any) => {
            // 		this.setState({
            // 			inProgress: false,
            // 			hasError: false,
            // 			success: true,
            // 			successMessage: defaultSuccessMessage
            // 		});
            // 	})
            // 	.catch((error: any) => {
            // 		console.error('[txn] Error', error);
            // 		this.setState({
            // 			inProgress: false,
            // 			hasError: true,
            // 			success: false,
            // 			errorMessage: error && error.message ? error.message : defaultErrorMessage
            // 		});
            // 	});		
            return eosActions_1.transfer(wallet, receiverName, amount, "", txnCount)
                .then(function (result) {
                _this.setState({
                    inProgress: false,
                    hasError: false,
                    success: true,
                    successMessage: defaultSuccessMessage
                });
            })
                .catch(function (error) {
                console.error('[txn] Error', error);
                _this.setState({
                    inProgress: false,
                    hasError: true,
                    success: false,
                    errorMessage: error && error.message ? error.message : defaultErrorMessage
                });
            });
        };
        _this.resetForm = function () {
            _this.setState(__assign({}, DEFAULT_STATE));
        };
        _this.getDefaultWallet = function () {
            var activeWallets = accessContext.getActiveWallets();
            if (!activeWallets || !activeWallets.length)
                return void 0;
            return activeWallets[0];
        };
        return _this;
    }
    PaymentForm.prototype.test = function () {
        alert('ssss');
        // history.push('/my-new-location')
    };
    PaymentForm.prototype.render = function () {
        var _a = this, getDefaultWallet = _a.getDefaultWallet, handleAmountChange = _a.handleAmountChange, handleTxnCountChange = _a.handleTxnCountChange, handleSubmit = _a.handleSubmit, resetForm = _a.resetForm;
        var _b = this.state, receiverName = _b.receiverName, amount = _b.amount, txnCount = _b.txnCount, buttonProps = __rest(_b, ["receiverName", "amount", "txnCount"]);
        var defaultWallet = getDefaultWallet();
        return (react_1.default.createElement(PaymentFormRoot, null,
            react_1.default.createElement(react_router_dom_1.Link, { to: "/test" }, "test"),
            react_1.default.createElement(PaymentFormTitle, null, "Transfer"),
            react_1.default.createElement("form", { noValidate: true },
                react_1.default.createElement(forms_1.FormElement, null,
                    react_1.default.createElement(forms_1.FieldLabel, null, "Receiver"),
                    react_1.default.createElement(forms_1.Input, { type: "text", value: receiverName, disabled: true, readOnly: true })),
                react_1.default.createElement(forms_1.FormElement, null,
                    react_1.default.createElement(forms_1.FieldLabel, null, "Amount (EOS)"),
                    react_1.default.createElement(forms_1.Input, { type: "number", value: amount, onChange: handleAmountChange })),
                react_1.default.createElement(forms_1.FormElement, null,
                    react_1.default.createElement(forms_1.FieldLabel, null, "Test multiple Actions (Repeat this transfer Action X times in a single transaction)"),
                    react_1.default.createElement(forms_1.Input, { type: "number", value: txnCount, onChange: handleTxnCountChange })),
                react_1.default.createElement(PaymentFormActions, null,
                    react_1.default.createElement(TransactionButtonBlock_1.TransactionButtonBlock, __assign({ onTransactionRequested: handleSubmit, defaultWallet: defaultWallet }, buttonProps)),
                    buttonProps.success && (react_1.default.createElement(PaymentFormResetButton, { type: "button", onClick: resetForm }, "Start over"))))));
    };
    return PaymentForm;
}(react_1.Component));
exports.PaymentForm = PaymentForm;
function PaymentFormConnected() {
    return react_1.default.createElement(PaymentForm, null);
}
exports.PaymentFormConnected = PaymentFormConnected;
exports.default = PaymentFormConnected;
//# sourceMappingURL=PaymentForm.js.map