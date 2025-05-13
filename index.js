import fill from 'fill-range';
import cartesianProduct from 'just-cartesian-product';
const numberRegex = /^\d+$/;
const alphaNumericRegex = /^[a-z0-9]*$/i;
export default function fillBlockRange(from, to) {
    if (typeof from === 'number' && typeof to === 'number') {
        return fill(from, to, { step: 1 });
    }
    else if (typeof from === 'string' && typeof to === 'string') {
        const fromParts = splitBoundIntoParts(from);
        const toParts = splitBoundIntoParts(to);
        if (fromParts.length !== toParts.length) {
            throw new TypeError('Range bounds must have the same number of parts.');
        }
        const ranges = [];
        for (const [partIndex, fromPart] of fromParts.entries()) {
            const toPart = toParts[partIndex];
            let range = fill(fromPart, toPart);
            if (alphaNumericRegex.test(fromPart) && alphaNumericRegex.test(toPart)) {
                range = range.filter((possibleSegment) => alphaNumericRegex.test(possibleSegment));
            }
            ranges.push(range);
        }
        const blockArrays = cartesianProduct(ranges);
        const blockArray = blockArrays.map((block) => block.join(''));
        return blockArray;
    }
    throw new TypeError('"from" and "to" must be numbers or strings, and of the same type.');
}
function splitBoundIntoParts(bound) {
    const parts = [];
    for (const character of bound) {
        if (numberRegex.test(character)) {
            if (parts.length === 0 || !numberRegex.test(parts.at(-1))) {
                parts.push(character);
            }
            else {
                parts[parts.length - 1] += character;
            }
        }
        else {
            parts.push(character);
        }
    }
    return parts;
}
export { default as fillRange } from 'fill-range';
