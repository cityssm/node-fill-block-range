import fill from 'fill-range';
import cartesianProduct from 'just-cartesian-product';
const numberRegex = /^\d+$/;
export default function fillBlockRange(from, to) {
    if (typeof from !== 'number' && typeof from !== 'string') {
        throw new TypeError('"from" must be a number or string.');
    }
    if (typeof to !== 'number' && typeof to !== 'string') {
        throw new TypeError('"to" must be a number or string.');
    }
    if (typeof to !== typeof from) {
        throw new TypeError('"from" and "to" must be the same type.');
    }
    if (typeof from === 'number' && typeof to === 'number') {
        return fill(from, to, { step: 1 });
    }
    if (typeof from === 'string' && typeof to === 'string') {
        const fromParts = splitBoundIntoParts(from);
        const toParts = splitBoundIntoParts(to);
        if (fromParts.length !== toParts.length) {
            throw new TypeError('Range bounds must have the same number of parts.');
        }
        const ranges = [];
        for (const [partIndex, fromPart] of fromParts.entries()) {
            const toPart = toParts[partIndex];
            ranges.push(fill(fromPart, toPart));
        }
        const blockArrays = cartesianProduct(ranges);
        const blockArray = blockArrays.map((block) => block.join(''));
        return blockArray;
    }
    throw new TypeError('Invalid range bounds.');
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
