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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var forms_1 = require("./shared/forms");
var eosActions_1 = require("./core/eosActions");
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
    receiverName: 'mary12345123',
    amount: 0.0002,
    inProgress: false,
    hasError: false,
    success: false
};
var ArbSign = /** @class */ (function (_super) {
    __extends(ArbSign, _super);
    function ArbSign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = __assign({}, DEFAULT_STATE);
        _this.handleSubmit = function (wallet) {
            var _a = _this.state, amount = _a.amount, receiverName = _a.receiverName;
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
            return eosActions_1.transfer(wallet, receiverName, amount)
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
        _this.getDefaultWallet = function () {
            var activeWallets = accessContext.getActiveWallets();
            if (!activeWallets || !activeWallets.length)
                return void 0;
            return activeWallets[0];
        };
        return _this;
    }
    ArbSign.prototype.test = function (wallet) {
        return __awaiter(this, void 0, void 0, function () {
            var signResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(wallet);
                        if (!wallet) return [3 /*break*/, 2];
                        return [4 /*yield*/, wallet.signArbitrary('This is a custom message to sign', 'A message for the user to see')];
                    case 1:
                        signResult = _a.sent();
                        console.log(signResult);
                        alert(signResult);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ArbSign.prototype.render = function () {
        var _this = this;
        var _a = this.state, receiverName = _a.receiverName, amount = _a.amount, buttonProps = __rest(_a, ["receiverName", "amount"]);
        var defaultWallet = this.getDefaultWallet();
        return (react_1.default.createElement(PaymentFormRoot, null,
            react_1.default.createElement(PaymentFormTitle, null, "Test Options"),
            react_1.default.createElement("form", { noValidate: true },
                react_1.default.createElement(PaymentFormResetButton, { type: "button", onClick: function () { return _this.test(defaultWallet); } }, "Sign Arbitrary"))));
    };
    return ArbSign;
}(react_1.Component));
exports.ArbSign = ArbSign;
function PaymentFormConnected() {
    return react_1.default.createElement(ArbSign, null);
}
exports.PaymentFormConnected = PaymentFormConnected;
exports.default = PaymentFormConnected;
//# sourceMappingURL=ArbSign.js.map