"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toNumber(input) {
    if (!input)
        return 0;
    var chunks = input.split(' ');
    if (!chunks[0])
        return 0;
    return Number(chunks[0]);
}
exports.toNumber = toNumber;
//# sourceMappingURL=helpers.js.map