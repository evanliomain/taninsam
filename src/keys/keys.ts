/**
 * @module object=>array
 */
/**
 * This method extract own enumerable properties of an object into an array
 * See the [native Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) for more informations.
 * @return the function to apply on the object to extract its keys
 * @example
 * ```
 * keys()({ a: 1, b: 2, c: 3 }) // ['a', 'b', 'c']
 * ```
 * @example Using the chain
 * ```
 * chain({ a: 1, b: 2, c: 3 })
 *   .chain(keys())
 *   .value() // ['a', 'b', 'c']
 * ```
 */
export function keys(): (ob: Readonly<object>) => string[] {
  return (ob: Readonly<object>) => Object.keys(ob);
}
