/**
 * @module array=>array
 */
import { Function, Iteratee, Links } from '../@types';
/**
 * This method creates a new array
 * with the results of calling a provided function
 * on every element in the calling array.
 * See the [native map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) for more informations.
 * @param iteratee The iteratee invoked per element.
 * @return the function to apply on the array to transform
 * @example
 * ```
 * map<number, number>(x => 1 + x))([1, 2, 3, 4, 5]) // [2, 3, 4, 5, 6]
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(map<number, number>(x => 1 + x)))
 *   .value() // [2, 3, 4, 5, 6]
 * ```
 */
export function map<T, U>(
  iteratee: Iteratee<T, U>,
): Function<ReadonlyArray<T>, ReadonlyArray<U>> {
  return (array: ReadonlyArray<T>, links?: Links) =>
    array.map((value: T, index: number, originalArray: ReadonlyArray<T>) =>
      iteratee(value, index, originalArray, links),
    );
}
