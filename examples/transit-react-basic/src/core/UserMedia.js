"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
var io_1 = require("react-icons/io");
var SpinnerIcon_1 = require("../shared/icons/SpinnerIcon");
var UserAvatar_1 = __importDefault(require("./UserAvatar"));
var UserMediaRoot = react_emotion_1.default('div')({
    position: 'relative',
    display: 'flex',
    padding: '10px 15px',
    paddingRight: 20,
    backgroundColor: 'transparent',
    transition: 'all 0.2s',
    color: 'white',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.15)'
    }
}, function (_a) {
    var isActive = _a.isActive, faded = _a.faded;
    var style = {};
    if (isActive) {
        Object.assign(style, {
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.25)'
            }
        });
    }
    if (faded) {
        Object.assign(style, {
            color: 'rgba(255, 255, 255, 0.3)'
        });
    }
    return style;
});
var UserMediaFigure = react_emotion_1.default('div')({
    display: 'flex',
    width: 30,
    marginRight: 5,
    textAlign: 'center'
});
var UserMediaSpinner = react_emotion_1.default('div')({
    width: 30,
    fontSize: 20
});
var UserMediaBody = react_emotion_1.default('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
});
var UserMediaCaret = react_emotion_1.default('span')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize: 11,
    paddingLeft: 8
});
var UserMediaUsername = react_emotion_1.default('div')({
    fontSize: 16,
    lineHeight: 1.2,
    transition: 'all 0.2s',
    '&:not(:last-child)': {
        marginBottom: 4
    }
}, function (_a) {
    var faded = _a.faded;
    return ({
        color: faded ? 'rgba(255, 255, 255, 0.3)' : '#26c5df'
    });
});
var UserMediaLoadingText = react_emotion_1.default(UserMediaUsername)({
    color: 'white'
});
var UserMediaSublabel = react_emotion_1.default('div')({
    flex: 1,
    display: 'flex',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.2)'
});
function UserMedia(props) {
    var isActive = props.isActive, isAnonymous = props.isAnonymous, isLoading = props.isLoading, onClick = props.onClick, username = props.username, sublabel = props.sublabel, className = props.className, caret = props.caret;
    return (react_1.default.createElement(UserMediaRoot, { onClick: onClick, isActive: isActive, faded: isAnonymous, className: className },
        react_1.default.createElement(UserMediaFigure, null, isLoading ? (react_1.default.createElement(UserMediaSpinner, null,
            react_1.default.createElement(SpinnerIcon_1.SpinnerIcon, { size: 20 }))) : (react_1.default.createElement(UserAvatar_1.default, null))),
        isLoading ? (react_1.default.createElement(UserMediaBody, null,
            react_1.default.createElement(UserMediaLoadingText, null, "Loading..."),
            react_1.default.createElement(UserMediaSublabel, null, "User data is being loaded"))) : (react_1.default.createElement(UserMediaBody, null,
            react_1.default.createElement(UserMediaUsername, { faded: isAnonymous }, username || 'unknown'),
            sublabel ? react_1.default.createElement(UserMediaSublabel, null, sublabel) : null)),
        caret &&
            !isLoading && (react_1.default.createElement(UserMediaCaret, null,
            react_1.default.createElement(io_1.IoIosArrowDown, null)))));
}
exports.UserMedia = UserMedia;
exports.default = UserMedia;
//# sourceMappingURL=UserMedia.js.map