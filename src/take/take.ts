/**
 * @module array=>array
 */
import { isArray } from '../isArray';

/**
 * Extract n first elements of an array
 * @param n The number of elements to extract first
 * @return the function to apply on the array to extract its n first element
 * @example
 * ```
 * take<number>(2)([1, 2, 3, 4, 5]) // [1, 2]
 * take(2)('abba') // 'ab'
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(take<number>(2))
 *   .value() // [1, 2]
 * ```
 */
export function take<T>(
  n: number
): (list: string | ReadonlyArray<T>) => string | ReadonlyArray<T> {
  return (list: string | ReadonlyArray<T>) => {
    if (isArray(list)) {
      return list.filter((_, index) => index < n);
    }
    return list.substring(0, n);
  };
}
