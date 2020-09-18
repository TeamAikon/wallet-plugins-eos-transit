"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
var fi_1 = require("react-icons/fi");
var UserAvatarRoot = react_emotion_1.default('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 30,
    height: 30,
    fontSize: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '50%',
    overflow: 'hidden',
    '& img': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        maxWidth: '120%',
        maxHeight: '120%',
        textAlign: 'center'
    }
});
function UserAvatar(props) {
    var url = props.url;
    return (react_1.default.createElement(UserAvatarRoot, null, url ? react_1.default.createElement("img", { src: url }) : react_1.default.createElement(fi_1.FiUser, null)));
}
exports.UserAvatar = UserAvatar;
exports.default = UserAvatar;
//# sourceMappingURL=UserAvatar.js.map