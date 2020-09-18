"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var io_1 = require("react-icons/io");
var dropdown_1 = require("../dropdown");
var TransactionAddonButton_1 = require("./TransactionAddonButton");
var TransactionAddonMenu_1 = __importDefault(require("./TransactionAddonMenu"));
function TransactionAddonBlock(_a) {
    var disabled = _a.disabled, success = _a.success, danger = _a.danger, onWalletSelect = _a.onWalletSelect;
    return disabled ? (react_1.default.createElement(TransactionAddonButton_1.TransactionAddonButton, { disabled: true, success: success, danger: danger },
        react_1.default.createElement(io_1.IoIosArrowDown, null))) : (react_1.default.createElement(dropdown_1.Dropdown, null, function (_a) {
        var isExpanded = _a.isExpanded, toggle = _a.toggle;
        return (react_1.default.createElement(dropdown_1.DropdownContainer, null,
            react_1.default.createElement(TransactionAddonButton_1.TransactionAddonButton, { onClick: toggle, danger: danger, success: success },
                react_1.default.createElement(io_1.IoIosArrowDown, null)),
            react_1.default.createElement(dropdown_1.DropdownContent, { visible: isExpanded, alignRight: true },
                react_1.default.createElement(TransactionAddonMenu_1.default, { onWalletSelect: onWalletSelect }))));
    }));
}
exports.TransactionAddonBlock = TransactionAddonBlock;
exports.default = TransactionAddonBlock;
//# sourceMappingURL=TransactionAddonBlock.js.map