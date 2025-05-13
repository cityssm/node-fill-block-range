import fill from 'fill-range'
import cartesianProduct from 'just-cartesian-product'

const numberRegex = /^\d+$/

const alphaNumericRegex = /^[a-z0-9]*$/i

/**
 * Fills a range of numbers or strings, where the strings can contain
 * alphanumeric characters. The range is inclusive of the start and end values.
 * @param from - The start of the range.
 * @param to - The end of the range.
 * @param options - Optional options object.
 * @param options.limit - The maximum number of elements to generate in the range. If the range will generate more than this number of elements, an error will be thrown.
 * @returns An array of strings or numbers representing the range.
 */
export default function fillBlockRange<T extends number | string>(
  from: T,
  to: T,
  options?: { limit?: number }
): T[] {
  if (typeof from === 'number' && typeof to === 'number') {
    /*
     * If the range bounds are numbers, use fill-range to generate the range.
     */

    if (options?.limit !== undefined && Math.abs(from - to) > options.limit) {
      throw new RangeError(`Range exceeds limit of ${options.limit} elements.`)
    }

    return fill(from, to, { step: 1 })
  } else if (typeof from === 'string' && typeof to === 'string') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return fillStringBlockRange(from, to, options) as T[]
  }

  throw new TypeError(
    '"from" and "to" must be numbers or strings, and of the same type.'
  )
}

/**
 * Calculates the length of the cartesian product of the ranges.
 * @param ranges - An array of ranges, where each range is an array of strings.
 * @returns The length of the cartesian product of the ranges.
 */
export function calculateCartesianProductLength(ranges: string[][]): number {
  let length = 1

  for (const range of ranges) {
    length *= Math.max(range.length, 1)
  }

  return length
}

function fillStringBlockRange(from: string, to: string, options?: { limit?: number }): string[] {
  /*
     * If the range bounds are strings, split the strings into parts and
     * generate the range for each part.
     */

    const fromParts = splitBoundIntoParts(from)
    const toParts = splitBoundIntoParts(to)

    if (fromParts.length !== toParts.length) {
      throw new TypeError('Range bounds must have the same number of parts.')
    }

    const ranges: string[][] = []

    for (const [partIndex, fromPart] of fromParts.entries()) {
      // eslint-disable-next-line security/detect-object-injection
      const toPart = toParts[partIndex]

      let range = fill(fromPart, toPart)

      if (alphaNumericRegex.test(fromPart) && alphaNumericRegex.test(toPart)) {
        range = range.filter((possibleSegment) =>
          alphaNumericRegex.test(possibleSegment)
        )
      }

      ranges.push(range)

      if (
        options?.limit !== undefined &&
        calculateCartesianProductLength(ranges) > options.limit
      ) {
        throw new RangeError(
          `Range exceeds limit of ${options.limit} elements.`
        )
      }
    }

    const blockArrays = cartesianProduct(ranges)

    const blockArray = blockArrays.map((block) => block.join(''))

    return blockArray
}

function splitBoundIntoParts(bound: string): string[] {
  const parts: string[] = []

  for (const character of bound) {
    if (numberRegex.test(character)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (parts.length === 0 || !numberRegex.test(parts.at(-1)!)) {
        parts.push(character)
      } else {
        parts[parts.length - 1] += character
      }
    } else {
      parts.push(character)
    }
  }

  return parts
}

export { default as fillRange } from 'fill-range'
