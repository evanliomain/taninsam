/**
 * @module object=>boolean
 */
/**
 * Compare 2 objects `o1` and `o2` on a set of property `mapping`
 * to determine if they are equals
 * @param iteratee The iteratee invoked per element.
 * @param mapping a list of key to compare `o1` and `o2`
 * @param o1 first object to compare
 * @param o2 second object to compare
 * @returns true if `o1[key] === o2[key]` for all key in mapping,
 * false otherwise
 * @example
 * ```
 * isEqualObjectOn(['a', 'b'])({ a: 1, b: 2, c: 3 })({ a: 1, b: 2, c: 4 })
 * // true
 * isEqualObjectOn(['a', 'b', 'c'])({ a: 1, b: 2, c: 3 })({ a: 1, b: 2, c: 4 })
 * // false
 * ```
 * @example Using the chain
 * ```
 * chain({ a: 1, b: 2, c: 4 })
 *   .chain(isEqualObjectOn(['a', 'b'])({ a: 1, b: 2, c: 3 }))
 *   .value() // true
 * ```
 */
export function isEqualObjectOn(
  mapping: string[]
): (o1: object) => (o1: object) => boolean {
  return (o1: object) => (o2: object) =>
    mapping.every(fieldName => o1[fieldName] === o2[fieldName]);
}
