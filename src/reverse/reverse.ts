/**
 * @module string|array=>string|array
 */
import { isArray } from '../is-array';
/**
 * Reverse a string or an array
 * @return the function to apply on the string or array to reverse it
 * @example
 * ```
 * reverse<number>()([1, 2, 3, 4, 5]) // [5, 4, 3, 2, 1]
 * reverse()('baba') // 'abab'
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(reverse<number>())
 *   .value() // [5, 4, 3, 2, 1]
 * ```
 */
export function reverse<T>(): (
  list: string | ReadonlyArray<T>,
) => string | ReadonlyArray<T> {
  return (list: string | ReadonlyArray<T>) => {
    if (isArray(list)) {
      return list.slice().reverse();
    }
    let result = '';
    const nbChar = list.length;
    for (let i = nbChar - 1; 0 <= i; i--) {
      result += list[i];
    }

    return result;
  };
}
