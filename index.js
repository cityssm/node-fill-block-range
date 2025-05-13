import fill from 'fill-range';
import cartesianProduct from 'just-cartesian-product';
const numberRegex = /^\d+$/;
const alphaNumericRegex = /^[a-z0-9]*$/i;
export default function fillBlockRange(from, to, options) {
    if (typeof from === 'number' && typeof to === 'number') {
        if (options?.limit !== undefined && Math.abs(from - to) > options.limit) {
            throw new RangeError(`Range exceeds limit of ${options.limit} elements.`);
        }
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
            if (options?.limit !== undefined && range.length > options.limit) {
                throw new RangeError(`Range exceeds limit of ${options.limit} elements.`);
            }
            ranges.push(range);
        }
        if (options?.limit !== undefined) {
            const rangeLength = calculateRangeLength(ranges);
            if (rangeLength > options.limit) {
                throw new RangeError(`Range exceeds limit of ${options.limit} elements.`);
            }
        }
        const blockArrays = cartesianProduct(ranges);
        const blockArray = blockArrays.map((block) => block.join(''));
        return blockArray;
    }
    throw new TypeError('"from" and "to" must be numbers or strings, and of the same type.');
}
function calculateRangeLength(ranges) {
    let length = 1;
    for (const range of ranges) {
        length *= Math.max(range.length, 1);
    }
    return length;
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
