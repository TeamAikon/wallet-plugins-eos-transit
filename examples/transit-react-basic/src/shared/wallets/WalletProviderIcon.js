"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var io_1 = require("react-icons/io");
var fi_1 = require("react-icons/fi");
var ScatterLogo_1 = require("../ScatterLogo");
var MetroLogo_1 = require("../MetroLogo");
var defaultIcon = io_1.IoIosUnlock;
var providerIcons = {
    'eos-metro': MetroLogo_1.MetroLogo,
    'scatter-desktop': ScatterLogo_1.ScatterLogo,
    'paste-the-private-key': fi_1.FiCopy
};
function WalletProviderIcon(_a) {
    var providerId = _a.providerId;
    var IconComponent = (providerId && providerIcons[providerId]) || defaultIcon;
    return react_1.default.createElement(IconComponent, null);
}
exports.WalletProviderIcon = WalletProviderIcon;
exports.default = WalletProviderIcon;
//# sourceMappingURL=WalletProviderIcon.js.map