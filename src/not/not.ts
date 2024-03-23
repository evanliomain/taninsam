/**
 * @module any=>boolean
 */
/**
 * This method return the negation of the boolean result of the passed function,
 * ie: !predicat(x)
 * @param predicat The function that return a boolean.
 * @return the function to apply on the input to return the negation
 * @example
 * ```
 * const isEven = x => 0 === x % 2;
 * const isOdd = not<number>(isEven);
 * isOdd(1) // true
 * ```
 * @example Using the chain
 * ```
 * const isEven = x => 0 === x % 2;
 * chain([1, 2, 3, 4])
 *   .chain(filter(not(isEven))
 *   .value() // [1, 3]
 * ```
 */
export function not<T>(
  predicat: (element: T) => boolean,
): (element: T) => boolean {
  return (element: T) => !predicat(element);
}
