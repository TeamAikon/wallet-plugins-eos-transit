"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var emotion_1 = require("emotion");
function applyGlobalStyles() {
    return emotion_1.injectGlobal(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    body {\n      margin: 0;\n      padding: 0;\n      font-family: 'Helvetica', 'Helvetica Neue', sans-serif;\n      -webkit-font-smoothing: antialiased;\n      background-color: #21262f;\n      color: white;\n    }\n\n    a {\n      color: #9c73d7;\n    }\n\n    a:hover,\n    a:focus,\n    a:active {\n      color: white;\n    }\n  "], ["\n    body {\n      margin: 0;\n      padding: 0;\n      font-family: 'Helvetica', 'Helvetica Neue', sans-serif;\n      -webkit-font-smoothing: antialiased;\n      background-color: #21262f;\n      color: white;\n    }\n\n    a {\n      color: #9c73d7;\n    }\n\n    a:hover,\n    a:focus,\n    a:active {\n      color: white;\n    }\n  "])));
}
exports.applyGlobalStyles = applyGlobalStyles;
var templateObject_1;
//# sourceMappingURL=globalStyles.js.map