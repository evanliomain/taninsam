/**
 * @module array=>array
 */
import { Links } from '../@types';

/**
 * Pair each element of the array with its next neighbour,
 * and apply the iteratee on each of those pairs:
 * `[A, B, C, D]` gives `[f(A, B), f(B, C), f(C, D)]`.
 * The result always holds one element less than the input,
 * so an array of less than two elements has no pair to build
 * and gives an empty array.
 * @param iteratee The iteratee invoked per pair of consecutive elements.
 * @return the function to apply on the array to pair its elements
 * @example
 * ```
 * lag<number, number>((current, next) => next - current)([1, 2, 4, 8])
 * // [1, 2, 4]
 * lag<number, number>((current, next) => current + next)([1]) // []
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 4, 8])
 *   .chain(lag<number, number>((current, next) => next - current))
 *   .value() // [1, 2, 4]
 * ```
 */
export function lag<T, U>(
  iteratee: (
    current: T,
    next: T,
    index: number,
    array: ReadonlyArray<T>,
    links?: Links,
  ) => U,
): (array: ReadonlyArray<T>, links?: Links) => ReadonlyArray<U> {
  return (array: ReadonlyArray<T>, links?: Links) =>
    array
      .slice(0, -1)
      .map((current: T, index: number) =>
        iteratee(current, array[1 + index], index, array, links),
      );
}
