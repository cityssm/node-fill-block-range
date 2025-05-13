// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable max-nested-callbacks */

import assert from 'node:assert'
import { describe, it } from 'node:test'

import fillBlockRange from '../index.js'

const rangesToTest = [
  [1, 10],
  ['1', '10'],
  ['01', '10'],
  ['Z', 'A'],
  ['A1', 'J10'],
  ['A01', 'A10'],
  ['5A', '8C'],
  ['AA', 'ZZ'],
  ['a', '9']
]

const errorRangesToTest = [
  // invalid types
  [['x'], 10],
  [1, {}],
  // different types
  [1, '10'],
  ['1', 10],
  ['01', 10],
  // different lengths
  ['Z', 'A1'],
  ['A1', 'J'],
  ['A01', 'A'],
  ['5A', '8'],
  ['AA', 'ZZ1']
]

await describe('@cityssm/fill-block-range', async () => {
  await describe('successful range tests', async () => {
    for (const [from, to] of rangesToTest) {
      await it(`should fill a range from ${from} to ${to}`, () => {
        const result = fillBlockRange(from, to)
        assert.strictEqual(result[0], from)
        assert.strictEqual(result.at(-1), to)

        for (const block of result) {
          assert.match(block.toString(), /^[A-Z0-9]+$/i)
        }
      })
    }
  })

  await describe('error range tests', async () => {
    for (const [from, to] of errorRangesToTest) {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      await it(`should throw an error for range from ${from.toString()} to ${to.toString()}`, () => {
        assert.throws(() => {
          const successfulResult = fillBlockRange(from, to)
          // eslint-disable-next-line no-console
          console.log(successfulResult)
        }, TypeError)
      })
    }

    await it('should throw a RangeError if the range exceeds the limit', () => {
      assert.throws(() => {
        fillBlockRange('1', '10', { limit: 5 })
      }, RangeError)

      assert.throws(() => {
        fillBlockRange(1, 10, { limit: 5 })
      }, RangeError)

      assert.throws(() => {
        fillBlockRange('A', 'Z', { limit: 5 })
      }, RangeError)

      assert.throws(() => {
        fillBlockRange('AA', 'ZZ', { limit: 50 })
      }, RangeError)
    })
  })
})
