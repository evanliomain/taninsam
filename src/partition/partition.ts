import { chain } from '../chain';
import { hash } from '../hash';
import { ifElse } from '../if-else';
import { isUndefined } from '../is-undefined';
import { reduce } from '../reduce';
import { values } from '../values';

/**
 * @module array=>array
 */
/**
 * Partition an array according a sub version of its elements.
 * Each values in the insides arrays are identical according
 * their form reduce by the toKey function.
 * Comparison between 2 elements is perform
 * with an hash of the toKey(element) form.
 * @param toKey the function to transform array element
 * into something that will be use to partition the array.
 * @return the function to apply on the array to partition it
 * according to th toKey function
 * @example
 * ```
 * partition<{ a: number; b: number; }, number>(x => x.a)([
 *   { a: 1, b: 1 }, { a: 1, b: 2 },
 *   { a: 2, b: 1 }, { a: 2, b: 2 }
 * ])
 * // [
 *  [{ a: 1, b: 1 }, { a: 1, b: 2 }],
 *  [{ a: 2, b: 1 }, { a: 2, b: 2 }]
 * ]
 * partition<number, number>(Math.floor)([1.1, 1.5, 2.1, 2.3, 2.8, 3, 4.12])
 * // [
 *   [1.1, 1.5],
 *   [2.1, 2.3, 2.8],
 *   [3],
 *   [4.12]
 * ]
 * ```
 * @example Using the chain
 * ```
 * chain([{ a: 1, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 1 }, { a: 2, b: 2 }])
 *   .chain(partition<{ a: number; b: number; }, number>(x => x.a))
 *   .value()
 *  // [
 *  [{ a: 1, b: 1}, { a: 1, b: 2 }],
 *  [{ a: 2, b: 1 }, { a: 2, b: 2 }]
 * ]
 * ```
 */
export function partition<T, K>(
  toKey: (element: T) => K,
): (array: ReadonlyArray<T>) => ReadonlyArray<ReadonlyArray<T>> {
  return (array: ReadonlyArray<T>) =>
    chain(array)
      .chain(
        reduce<T, Record<string, ReadonlyArray<T>>>(
          (acc, element) =>
            chain(element)
              .chain(toKey)
              .chain(hash<K>())
              .chain(
                ifElse(
                  hashKey => !isUndefined(acc[hashKey]),
                  hashKey => ({
                    ...acc,
                    [hashKey]: [...acc[hashKey], element],
                  }),
                  hashKey => ({
                    ...acc,
                    [hashKey]: [element],
                  }),
                ),
              )
              .value() as Record<string, ReadonlyArray<T>>,
          {},
        ),
      )
      .chain(values())
      .value();
}
