"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var dropdown_1 = require("../shared/dropdown");
var UserMedia_1 = __importDefault(require("./UserMedia"));
var UserMenu_1 = require("./UserMenu");
function UserDropdown(_a) {
    var username = _a.username;
    return (react_1.default.createElement(dropdown_1.Dropdown, null, function (_a) {
        var isExpanded = _a.isExpanded, toggle = _a.toggle;
        return (react_1.default.createElement(dropdown_1.DropdownContainer, null,
            react_1.default.createElement(UserMedia_1.default, { caret: true, isActive: isExpanded, isAnonymous: !username, onClick: toggle, username: username || 'unknown' }),
            react_1.default.createElement(dropdown_1.DropdownContent, { visible: isExpanded, alignRight: true },
                react_1.default.createElement(UserMenu_1.UserMenu, null))));
    }));
}
exports.UserDropdown = UserDropdown;
exports.default = UserDropdown;
//# sourceMappingURL=UserDropdown.js.map