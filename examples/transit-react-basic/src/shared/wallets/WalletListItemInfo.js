"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
var helpers_1 = require("../helpers");
exports.WalletListItemInfoRoot = react_emotion_1.default('div')({
    // display: 'flex',
    // alignItems: 'flex-start',
    width: '100%',
    paddingTop: 12
    // borderTop: '1px solid rgba(0, 0, 0, 0.2)'
});
exports.WalletListItemInfoMain = react_emotion_1.default('div')({
    fontSize: 14,
    fontWeight: 300,
    '&:not(:last-child)': {
        marginBottom: 8
    },
    '& strong': {
        fontWeight: 400
    },
    '& small': {
        fontSize: 12
    }
});
exports.WalletListItemInfoParams = react_emotion_1.default('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 8,
    paddingTop: 8,
    borderTop: '1px solid rgba(0, 0, 0, 0.2)'
});
exports.WalletListItemInfoParam = react_emotion_1.default('div')({
    display: 'flex',
    alignItems: 'center',
    minWidth: 60,
    padding: '0 10px 4px 0',
    fontSize: 11
});
exports.WalletListItemInfoParamHeading = react_emotion_1.default('div')({
    width: 27,
    fontSize: 9,
    fontWeight: 300,
    // color: 'rgba(255, 255, 255, 0.8)',
    color: 'white',
    textTransform: 'uppercase'
});
exports.WalletListItemInfoParamContent = react_emotion_1.default('div')({
    flex: 1,
    fontSize: 11,
    fontWeight: 600,
    color: '#26c5df'
});
// Exported / behavior component
function WalletListItemInfo(_a) {
    var accountInfo = _a.accountInfo, compact = _a.compact;
    return (react_1.default.createElement(exports.WalletListItemInfoRoot, null,
        react_1.default.createElement(exports.WalletListItemInfoMain, null,
            react_1.default.createElement("strong", null, helpers_1.toNumber(accountInfo.core_liquid_balance).toFixed(4)),
            ' ',
            react_1.default.createElement("small", null, "EOS")),
        !compact && (react_1.default.createElement(exports.WalletListItemInfoParams, null,
            react_1.default.createElement(exports.WalletListItemInfoParam, null,
                react_1.default.createElement(exports.WalletListItemInfoParamHeading, null, "RAM"),
                react_1.default.createElement(exports.WalletListItemInfoParamContent, null, accountInfo.ram_quota + " Kb")),
            react_1.default.createElement(exports.WalletListItemInfoParam, null,
                react_1.default.createElement(exports.WalletListItemInfoParamHeading, null, "CPU"),
                react_1.default.createElement(exports.WalletListItemInfoParamContent, null, accountInfo.cpu_limit.available + " ms")),
            react_1.default.createElement(exports.WalletListItemInfoParam, null,
                react_1.default.createElement(exports.WalletListItemInfoParamHeading, null, "NET"),
                react_1.default.createElement(exports.WalletListItemInfoParamContent, null, accountInfo.net_limit.available + " KiB"))))));
}
exports.WalletListItemInfo = WalletListItemInfo;
exports.default = WalletListItemInfo;
//# sourceMappingURL=WalletListItemInfo.js.map