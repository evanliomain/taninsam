/**
 * @module object=>array
 */
import { chain } from '../chain';
import { keys } from '../keys';
import { map } from '../map';

/**
 * It extract keys/values in a new Array Iterator object
 * that contains the key/value pairs for each index in the array.
 * @return the function to apply on the object to extract key/values
 * @example
 * ```
 * entries()({ a: 1, b: 2, c: 3 }) // [['a', 1], ['b', 2], ['c', 3]]
 * ```
 * @example Using the chain
 * ```
 * chain({ a: 1, b: 2, c: 3 })
 *   .chain(entries())
 *   .value() // [['a', 1], ['b', 2], ['c', 3]]
 * ```
 */
export function entries(): (
  ob: object,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => ReadonlyArray<ReadonlyArray<any>> {
  return (ob: object) =>
    chain(ob)
      .chain(keys())
      .chain(map(key => [key, ob[key]]))
      .value();
}
