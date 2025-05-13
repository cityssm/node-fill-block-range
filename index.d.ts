export default function fillBlockRange<T extends number | string>(from: T, to: T, options?: {
    limit?: number;
}): T[];
export { default as fillRange } from 'fill-range';
