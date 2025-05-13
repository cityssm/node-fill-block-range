export default function fillBlockRange<T extends number | string>(from: T, to: T, options?: {
    limit?: number;
}): T[];
export declare function calculateCartesianProductLength(ranges: string[][]): number;
export { default as fillRange } from 'fill-range';
