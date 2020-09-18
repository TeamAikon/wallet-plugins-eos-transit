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
var react_onclickoutside_1 = __importDefault(require("react-onclickoutside"));
var DropdownContainer_1 = require("./DropdownContainer");
var Dropdown = /** @class */ (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { isExpanded: false };
        _this.toggle = function () {
            _this.setState(function (state) { return ({ isExpanded: !state.isExpanded }); });
        };
        _this.handleClickOutside = function (event) {
            if (!_this.props.closesOn || _this.props.closesOn === 'clickOutside') {
                _this.setState({ isExpanded: false });
            }
        };
        return _this;
    }
    Dropdown.prototype.render = function () {
        var toggle = this.toggle;
        var isExpanded = this.state.isExpanded;
        var children = this.props.children;
        return (react_1.default.createElement(DropdownContainer_1.DropdownContainer, null, children ? children({ isExpanded: isExpanded, toggle: toggle }) : null));
    };
    return Dropdown;
}(react_1.Component));
exports.Dropdown = Dropdown;
exports.default = react_onclickoutside_1.default(Dropdown);
//# sourceMappingURL=Dropdown.js.map