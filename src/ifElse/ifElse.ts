/**
 * @module any=>any
 */
/**
 * Apply `ifTransform` if `predicat` is verify, otherwise, apply `elseTransform`
 * @param predicat a function that receive input and return a boolean,
 * if return true, the `ifTransform` is apply, otherwise, apply `elseTransform`
 * @param ifTransform a transform function.
 * @param elseTransform a transform function.
 * @return the function to apply on whatever to transform
 * @example
 * ```
 * ifElse<number, string, string>(
 *   x => 0 === x % 2,
 *   x => `${x} is even`,
 *   x => `${x} is odd`
 * )(1) // '1 is odd'
 *
 * ifElse<number, string, string>(
 *   x => 0 === x % 2,
 *   x => `${x} is even`,
 *   x => `${x} is odd`
 * )(2) // '2 is even'
 * ```
 * @example Using the chain
 * ```
 * chain()
 *   .chain(ifElse<number, string, string>(
 *     x => 0 === x % 2,
 *     x => `${x} is even`,
 *     x => `${x} is odd`
 *   )
 *   .value() // '2 is even'
 * ```
 */
export function ifElse<T, U, V>(
  predicat: (value: T) => boolean,
  ifTransform: (value: T) => U,
  elseTransform: (value: T) => V
): (value: T) => U | V {
  return (value: T) =>
    predicat(value) ? ifTransform(value) : elseTransform(value);
}
