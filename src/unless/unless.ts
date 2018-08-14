/**
 * @module any=>any
 */
/**
 * Apply `transform` unless the `predicat` is verify.
 * @param predicat a function that receive input and return a boolean, if return true, the `transform` is NOT apply, otherwise, apply `transform`
 * @param transform a transform function.
 * @return the function to apply on whatever to transform or not to transform
 * @example
 * ```
 * unless<number, string>(n => 0 === n % 2, n => `${n} is odd`)(1) // '1 is odd'
 * unless<number, string>(n => 0 === n % 2, n => `${n} is odd`)(2) // 2
 * ```
 * @example Using the chain
 * ```
 * chain(1)
 *   .chain(unless<number, string>(n => 0 === n % 2, n => `${n} is odd`))
 *   .value() // '1 is odd'
 * ```
 */
export function unless<T, U>(
  predicat: (value: T) => boolean,
  transform: (value: T) => U
): (value: T) => T | U {
  return (value: T) => (predicat(value) ? value : transform(value));
}
