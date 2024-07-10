"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSizeValue = exports.productRusFieldToEng = void 0;
exports.productRusFieldToEng = {
    'Цвет': 'color',
    'Корпус': 'frame',
    'Геометрия оттиска': 'geometry',
    'Комплектация': 'equipment'
};
function extractSizeValue(sizeString) {
    const matchF = sizeString.match(/Ø (\d+) мм/);
    if (matchF) {
        return parseInt(matchF[1], 10);
    }
    else {
        const dimensionsRegex = /(\d+)\s*×\s*(\d+)/;
        const match = sizeString.match(dimensionsRegex);
        if (match) {
            const firstValue = Number(match[1]);
            const secondValue = Number(match[2]);
            if (typeof firstValue === "number" && typeof secondValue === 'number') {
                const diagonal = Math.sqrt(firstValue * firstValue + secondValue * secondValue);
                return Number(diagonal.toFixed());
            }
            else {
                return 0;
            }
        }
        else {
            return 0;
        }
    }
}
exports.extractSizeValue = extractSizeValue;
//# sourceMappingURL=helper.js.map