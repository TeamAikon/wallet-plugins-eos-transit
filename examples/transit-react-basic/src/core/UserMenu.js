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
var io_1 = require("react-icons/io");
var MenuSectionHeaderButton_1 = require("./MenuSectionHeaderButton");
var UserWalletList_1 = require("./UserWalletList");
var AvailableWalletList_1 = require("./AvailableWalletList");
var UserMenuLogoutButton_1 = __importDefault(require("./UserMenuLogoutButton"));
// Visual components
var UserMenuRoot = react_emotion_1.default('div')({
    padding: '15px',
    width: 350
});
var UserMenuSection = react_emotion_1.default('section')({
    '&:not(:last-child)': {
        marginBottom: 15
    }
});
var UserMenuSectionHeader = react_emotion_1.default('header')({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    padding: 0
});
var UserMenuSectionHeading = react_emotion_1.default('div')({
    flex: 1,
    padding: '8px 0',
    fontSize: 11,
    fontWeight: 300,
    textTransform: 'uppercase'
});
var UserMenu = /** @class */ (function (_super) {
    __extends(UserMenu, _super);
    function UserMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isAddWalletViewShown: false
        };
        _this.showAddWalletView = function () {
            _this.setState(function (state) { return ({
                isAddWalletViewShown: true
            }); });
        };
        _this.showDefaultView = function () {
            _this.setState(function (state) { return ({
                isAddWalletViewShown: false
            }); });
        };
        return _this;
    }
    UserMenu.prototype.render = function () {
        var _a = this, showAddWalletView = _a.showAddWalletView, showDefaultView = _a.showDefaultView;
        var isAddWalletViewShown = this.state.isAddWalletViewShown;
        return (react_1.default.createElement(UserMenuRoot, null,
            !isAddWalletViewShown && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(UserMenuSection, null,
                    react_1.default.createElement(UserMenuSectionHeader, null,
                        react_1.default.createElement(UserMenuSectionHeading, null, "My Wallets"),
                        react_1.default.createElement(MenuSectionHeaderButton_1.MenuSectionHeaderButton, { icon: io_1.IoIosAddCircleOutline, onClick: showAddWalletView }, "Add Wallet")),
                    react_1.default.createElement(UserWalletList_1.UserWalletList, null)),
                react_1.default.createElement(UserMenuLogoutButton_1.default, null))),
            isAddWalletViewShown && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(UserMenuSectionHeader, null,
                    react_1.default.createElement(UserMenuSectionHeading, null, "Available Wallets"),
                    react_1.default.createElement(MenuSectionHeaderButton_1.MenuSectionHeaderButton, { icon: io_1.IoIosCloseCircleOutline, iconOnly: true, onClick: showDefaultView })),
                react_1.default.createElement(AvailableWalletList_1.AvailableWalletList, { onItemSelect: showDefaultView })))));
    };
    return UserMenu;
}(react_1.Component));
exports.UserMenu = UserMenu;
exports.default = UserMenu;
//# sourceMappingURL=UserMenu.js.map