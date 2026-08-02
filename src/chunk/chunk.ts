/**
 * @module array=>array
 */
import { loopFor } from '../loop-for';

/**
 * Split an array into consecutive slices of n elements.
 * The last slice holds whatever is left, so it is shorter than n when the
 * length of the array is not a multiple of n: it is never padded.
 * An empty array gives an empty array, and so does a size below one,
 * which has no meaning.
 * @param n The number of elements of each slice.
 * @return the function to apply on the array to split it
 * @example
 * ```
 * chunk<number>(3)([1, 2, 3, 4, 5, 6]) // [[1, 2, 3], [4, 5, 6]]
 * chunk<number>(3)([1, 2, 3, 4]) // [[1, 2, 3], [4]]
 * chunk<number>(3)([]) // []
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5, 6, 7])
 *   .chain(chunk<number>(3))
 *   .value() // [[1, 2, 3], [4, 5, 6], [7]]
 * ```
 */
export function chunk<T>(
  n: number,
): (array: ReadonlyArray<T>) => ReadonlyArray<ReadonlyArray<T>> {
  return (array: ReadonlyArray<T>) => {
    if (n < 1) {
      return [];
    }

    return loopFor<ReadonlyArray<ReadonlyArray<T>>>(
      { stop: array.length, step: n },
      (chunks, index) => [...chunks, array.slice(index, index + n)],
    )([]);
  };
}
