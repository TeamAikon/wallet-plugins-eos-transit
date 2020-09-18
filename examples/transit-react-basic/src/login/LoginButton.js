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
var EosLogo_1 = require("shared/EosLogo");
// Visual components
// TODO: Extract to `shared`
var LoginButtonRoot = react_emotion_1.default('button')({
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
    borderRadius: 1,
    boxShadow: '0 7px 25px -4px rgba(0, 0, 0, 0.4)',
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
        boxShadow: '0 3px 15px -4px rgba(0, 0, 0, 0.8)',
        transform: 'translateY(1px) scale(0.99)'
    }
});
var LoginButtonIcon = react_emotion_1.default('div')({
    width: 24,
    height: 24
});
var LoginButtonText = react_emotion_1.default('div')({
    flex: 1,
    padding: '0, 10px',
    textAlign: 'center'
});
var LoginButtonAddon = react_emotion_1.default('div')({
// TODO
});
var LoginButton = /** @class */ (function (_super) {
    __extends(LoginButton, _super);
    function LoginButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginButton.prototype.render = function () {
        var onClick = this.props.onClick;
        return (react_1.default.createElement(LoginButtonRoot, { onClick: onClick },
            react_1.default.createElement(LoginButtonIcon, null,
                react_1.default.createElement(EosLogo_1.EosLogo, null)),
            react_1.default.createElement(LoginButtonText, null,
                "Login with ",
                react_1.default.createElement("strong", null, "EOS"))));
    };
    return LoginButton;
}(react_1.Component));
exports.LoginButton = LoginButton;
exports.default = LoginButton;
//# sourceMappingURL=LoginButton.js.map