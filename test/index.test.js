import assert from 'node:assert';
import { describe, it } from 'node:test';
import fillBlockRange from '../index.js';
const rangesToTest = [
    [1, 10],
    ['1', '10'],
    ['01', '10'],
    ['Z', 'A'],
    ['A1', 'J10'],
    ['A01', 'A10'],
    ['5A', '8C'],
    ['AA', 'ZZ']
];
const errorRangesToTest = [
    [1, '10'],
    ['1', 10],
    ['01', 10],
    ['Z', 'A1'],
    ['A1', 'J'],
    ['A01', 'A'],
    ['5A', '8'],
    ['AA', 'ZZ1']
];
await describe('@cityssm/fill-block-range', async () => {
    await describe('successful range tests', async () => {
        for (const [from, to] of rangesToTest) {
            await it(`should fill a range from ${from} to ${to}`, () => {
                const result = fillBlockRange(from, to);
                assert.strictEqual(result[0], from);
                assert.strictEqual(result.at(-1), to);
            });
        }
    });
    await describe('error range tests', async () => {
        for (const [from, to] of errorRangesToTest) {
            await it(`should throw an error for range from ${from} to ${to}`, () => {
                assert.throws(() => {
                    const successfulResult = fillBlockRange(from, to);
                    console.log(successfulResult);
                }, TypeError);
            });
        }
    });
});
