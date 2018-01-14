/**
 * @module array=>array
 */
import { ComparaisonResultChoice } from '../@types';

/**
 * Sort an array with the given comparator function.
 * See the [native sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for more informations.
 * @param comparator The comparator function that defines the sort order. If omitted, the array is sorted according to each character's Unicode code point value, according to the string conversion of each element.
 * @return the function to apply on the array to sort it.
 * @example Without comparator
 * ```
 * sort<number>()([5, 2, 8, 9, 4, 1]) // [1, 2, 4, 5, 8, 9]
 * sort<string>()(['a', 'z', 'e', 'r', 't', 'y']) // ['a', 'e', 'r', 't', 'y', 'z']
 * ```
 * @example With a comparator
 * ```
 * sort<{ a: string, b: number }>()([5, 2, 8, 9, 4, 1]) // [1, 2, 4, 5, 8, 9]
 * ```
 * @example Using the chain
 * ```
 * chain([5, 2, 8, 9, 4, 1])
 *   .chain(sort<number>())
 *   .value() // [1, 2, 4, 5, 8, 9]
 * ```
 */
export function sort<T>(
  comparator?: (d1: T, d2: T) => ComparaisonResultChoice
): (element: ReadonlyArray<T>) => ReadonlyArray<T> {
  return (array: ReadonlyArray<T>) => array.slice().sort(comparator);
}
