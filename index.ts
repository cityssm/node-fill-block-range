import fill from 'fill-range'
import cartesianProduct from 'just-cartesian-product'

const numberRegex = /^\d+$/

/**
 * Fills a range of numbers or strings, where the strings can contain
 * alphanumeric characters. The range is inclusive of the start and end values.
 * @param from - The start of the range.
 * @param to - The end of the range.
 * @returns An array of strings or numbers representing the range.
 */
export default function fillBlockRange<T extends number | string>(
  from: T,
  to: T
): T[] {
  /*
   * Validate the range bounds.
   */

  if (typeof from !== 'number' && typeof from !== 'string') {
    throw new TypeError('"from" must be a number or string.')
  }

  if (typeof to !== 'number' && typeof to !== 'string') {
    throw new TypeError('"to" must be a number or string.')
  }

  if (typeof to !== typeof from) {
    throw new TypeError('"from" and "to" must be the same type.')
  }

  /*
   * If the range bounds are numbers, use fill-range to generate the range.
   */

  if (typeof from === 'number' && typeof to === 'number') {
    return fill(from, to, { step: 1 })
  }

  /*
   * If the range bounds are strings, split the strings into parts and
   * generate the range for each part.
   */

  if (typeof from === 'string' && typeof to === 'string') {
    const fromParts = splitBoundIntoParts(from)
    const toParts = splitBoundIntoParts(to)

    if (fromParts.length !== toParts.length) {
      throw new TypeError('Range bounds must have the same number of parts.')
    }

    const ranges: string[][] = []

    for (const [partIndex, fromPart] of fromParts.entries()) {
      // eslint-disable-next-line security/detect-object-injection
      const toPart = toParts[partIndex]
      ranges.push(fill(fromPart, toPart))
    }

    const blockArrays = cartesianProduct(ranges)

    const blockArray = blockArrays.map((block) => block.join(''))

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return blockArray as unknown as T[]
  }

  throw new TypeError('Invalid range bounds.')
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