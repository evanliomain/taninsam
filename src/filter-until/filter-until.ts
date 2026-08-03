/**
 * @module array=>array
 */
import { Iteratee, Links } from '../@types';

/**
 * Drop the leading elements of the array while the predicate holds,
 * and keep every element from the first failure on, that one included.
 * Despite its name, this method is a *drop while*: it stops dropping
 * as soon as the predicate returns false, and never looks at the
 * elements that follow.
 * An array whose every element satisfies the predicate gives
 * an empty array, and so does an empty array.
 * @param predicate The predicate invoked per leading element
 * to decide to drop it (return true), or to stop dropping (return false).
 * @return the function to apply on the array to drop its leading elements
 * @example
 * ```
 * filterUntil<number>(x => x < 3)([1, 2, 3, 4, 1, 2]) // [3, 4, 1, 2]
 * filterUntil<number>(x => x < 10)([1, 2, 3]) // []
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 1, 2])
 *   .chain(filterUntil<number>(x => x < 3))
 *   .value() // [3, 4, 1, 2]
 * ```
 */
export function filterUntil<T>(
  predicate: Iteratee<T, boolean>,
): (array: ReadonlyArray<T>, links?: Links) => ReadonlyArray<T> {
  return (array: ReadonlyArray<T>, links?: Links) => {
    const firstKept = array.findIndex(
      (value: T, index: number, originalArray: ReadonlyArray<T>) =>
        !predicate(value, index, originalArray, links),
    );
    if (-1 === firstKept) {
      return [];
    }

    return array.slice(firstKept);
  };
}
