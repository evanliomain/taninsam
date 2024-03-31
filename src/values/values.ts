/**
 * @module object=>array
 */
import { chain } from '../chain';
import { keys } from '../keys';
import { map } from '../map';

/**
 * This method extract own enumerable values of an object into an array
 * See the [native Object.values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) for more informations.
 * @return the function to apply on the object to extract its values
 * @example
 * ```
 * values()({ a: 1, b: 2, c: 3 }) // [1, 2, 3]
 * ```
 * @example Using the chain
 * ```
 * chain({ a: 1, b: 2, c: 3 })
 *   .chain(values())
 *   .value() // [1, 2, 3]
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function values(): (ob: object) => ReadonlyArray<any> {
  return (ob: object) =>
    chain(ob)
      .chain(keys())
      .chain(map(key => ob[key]))
      .value();
}
