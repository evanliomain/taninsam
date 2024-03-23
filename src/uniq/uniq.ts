/**
 * @module array=>array
 */
import { chain } from '../chain';
import { hash } from '../hash';
import { isUndefined } from '../is-undefined';
import { reduce } from '../reduce';
/**
 * Returns a new list containing only one copy of each element
 * in the original list, based upon the value returned by applying the supplied
 * function to each list element.
 * Prefers the first item if the supplied function produces
 * the same value on two items.
 * === is used for comparison.
 * @param comparison The comparison method, default set to identity.
 * @return the function to apply on the array to uniq its elements
 * @example
 * ```
 * uniq<number>()([1, 2, 3, 2, 3, 5, 1]) // [1, 2, 3, 5]
 * uniq<{ a: number; b: number; c: string; }>(({ a, b, c }) => ({ a, b }))([
 *   { a: 1, b: 1, c: 'a' },
 *   { a: 1, b: 2, c: 'a' },
 *   { a: 1, b: 1, c: 'b' }
 * ])) // [{ a: 1, b: 1, c: 'a' }, { a: 1, b: 2, c: 'a' }]
 * ```
 * @example Using the chain
 * ```
 * chain([
 *   { a: 1, b: 1, c: 'a' },
 *   { a: 1, b: 2, c: 'a' },
 *   { a: 1, b: 1, c: 'b' }
 * ])
 * .chain(uniq<{ a: number; b: number; c: string; }>(
 *  ({ a, b, c }) => ({ a, b }))
 * )
 * .value() // [{ a: 1, b: 1, c: 'a' }, { a: 1, b: 2, c: 'a' }]
 * ```
 */
export function uniq<T>(
  comparison: (x: T) => any = x => x,
): (element: T[]) => T[] {
  return (array: T[]) =>
    chain(array)
      .chain(
        reduce(
          (
            acc: { result: T[]; distinct: { [key: string]: boolean } },
            element: T,
          ) => {
            const value = comparison(element);
            const hashKey = hash()(value);
            if (!isUndefined(acc.distinct[hashKey])) {
              return acc;
            }

            return {
              result: [...acc.result, element],
              distinct: { ...acc.distinct, [hashKey]: true },
            };
          },
          { result: [], distinct: {} },
        ),
      )
      .chain(({ result }) => result)
      .value();
}
