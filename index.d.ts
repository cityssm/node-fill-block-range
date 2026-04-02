/**
 * Fills a range of numbers or strings, where the strings can contain
 * alphanumeric characters. The range is inclusive of the start and end values.
 * @param from - The start of the range.
 * @param to - The end of the range.
 * @param options - Optional options object.
 * @param options.limit - The maximum number of elements to generate in the range. If the range will generate more than this number of elements, an error will be thrown.
 * @returns An array of strings or numbers representing the range.
 */
export default function fillBlockRange<T extends number | string>(from: T, to: T, options?: {
    limit?: number;
}): T[];
/**
 * Calculates the length of the cartesian product of the ranges.
 * @param ranges - An array of ranges, where each range is an array of strings.
 * @returns The length of the cartesian product of the ranges.
 */
export declare function calculateCartesianProductLength(ranges: string[][]): number;
export { default as fillRange } from 'fill-range';
