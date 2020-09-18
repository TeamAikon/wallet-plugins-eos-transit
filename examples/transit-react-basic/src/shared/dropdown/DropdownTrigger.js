"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function DropdownTrigger(_a) {
    var children = _a.children, onTriggerClick = _a.onTriggerClick;
    return react_1.default.createElement("div", { onClick: onTriggerClick }, children);
}
exports.DropdownTrigger = DropdownTrigger;
exports.default = DropdownTrigger;
//# sourceMappingURL=DropdownTrigger.js.map