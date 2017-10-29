/**
 * @module array=>array
 */
import { Identity, Links } from '../@types';

/**
 * This method filter the elements of the chained array.
 * See the [native filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) for more informations.
 * @param iteratee The iteratee invoked per element to decide to keep or not the element.
 * @return the function to apply on the array to filter it
 * @example Keep even number from an array
 * ```
 * filter<number>((x: number) => 0 === x % 2)([1, 2, 3, 4, 5]) // [2, 4]
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(filter(x => 0 === x % 2))
 *   .value() // [2, 4]
 * ```
 */
export function filter<T>(
  iteratee: ((
    value: T,
    index: number,
    array: ReadonlyArray<T>,
    links?: Links
  ) => boolean),
  links?: Links
): Identity<ReadonlyArray<T>> {
  return (array: ReadonlyArray<T>) =>
    array.filter((value: T, index: number, array: ReadonlyArray<T>) =>
      iteratee(value, index, array, links)
    );
}
