/**
 * @module array=>array
 */
import { Links } from '../@types';

/**
 * Pair each element of the array with its next neighbour, the last element
 * being paired with the first one, and apply the iteratee on each of those
 * pairs: `[A, B, C, D]` gives `[f(A, B), f(B, C), f(C, D), f(D, A)]`.
 * The result holds as many elements as the input, so an array of one
 * element gives the single wrap-around pair `[f(A, A)]`,
 * and an empty array gives an empty array.
 * See {@link lag} for the version without the wrap-around pair.
 * @param iteratee The iteratee invoked per pair of consecutive elements.
 * @return the function to apply on the array to pair its elements
 * @example
 * ```
 * lagCircular<number, number>((current, next) => next - current)([1, 2, 4, 8])
 * // [1, 2, 4, -7]
 * lagCircular<number, number>((current, next) => current + next)([1]) // [2]
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 4, 8])
 *   .chain(lagCircular<number, number>((current, next) => next - current))
 *   .value() // [1, 2, 4, -7]
 * ```
 */
export function lagCircular<T, U>(
  iteratee: (
    current: T,
    next: T,
    index: number,
    array: ReadonlyArray<T>,
    links?: Links,
  ) => U,
): (array: ReadonlyArray<T>, links?: Links) => ReadonlyArray<U> {
  return (array: ReadonlyArray<T>, links?: Links) =>
    array.map((current: T, index: number) =>
      iteratee(current, array[(1 + index) % array.length], index, array, links),
    );
}
