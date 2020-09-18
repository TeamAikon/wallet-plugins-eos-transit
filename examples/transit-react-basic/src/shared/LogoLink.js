"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
var react_router_dom_1 = require("react-router-dom");
exports.LogoLinkRoot = react_emotion_1.default(react_router_dom_1.NavLink)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    fontSize: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    textDecoration: 'none',
    textTransform: 'uppercase',
    borderRadius: '50%',
    transition: 'all 0.2s',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        textDecoration: 'none'
    }
});
function LogoLink(props) {
    return react_1.default.createElement(exports.LogoLinkRoot, __assign({}, props), "EOS");
}
exports.LogoLink = LogoLink;
exports.default = LogoLink;
//# sourceMappingURL=LogoLink.js.map