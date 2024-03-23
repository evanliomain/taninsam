/**
 * @module array=>number
 */
import { ChainFunction, Iteratee, Links } from '../@types';
/**
 * This method sum all element of the chained array,
 * invoking for each element in array,
 * the iteratee callback to get the value to be summed.
 * @param iteratee The iteratee invoked per element to get the value
 * to sum given an element of the array
 * @return the function to apply on the array
 * to sum its elements and return the sum
 * @example With an array of number
 * ```
 * sumBy<number>(x => x)([1, 2, 3, 4]) // 10
 * ```
 * @example With an array of object
 * ```
 * sumBy<{ a: number }>(x => x.a)(
 *  [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]
 * ) // 10
 * ```
 * @example Using the chain
 * ```
 * chain([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }])
 *   .chain(sumBy<{ a: number }>(x => x.a))
 *   .value() // 10
 * ```
 */
export function sumBy<T>(
  iteratee: Iteratee<T, number>,
): ChainFunction<ReadonlyArray<T>, number> {
  return (array: ReadonlyArray<T>, links?: Links) =>
    array.reduce(
      (sum, data, index: number, originalArray: ReadonlyArray<T>) =>
        sum + iteratee(data, index, originalArray, links),
      0,
    );
}
