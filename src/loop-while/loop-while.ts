/**
 * @module any=>any
 */
/**
 * This method loop on an input:
 * - at first, output = input
 * - while predicat(output) is true, output = iteratee(output)
 * - finally, returns output
 * @param predicate The function apply on each loop to decide to :
 * continue (return true), or to stop (return false)
 * @param iteratee The iteratee invoked on each loop.
 * @return the function to apply on the input
 * @example
 * ```
 * loopWhile<number>(x => x < 10, x => x ** 2)(2) // 16
 * ```
 * @example Using the chain
 * ```
 * chain(2)
 *   .chain(loopWhile<number>(x => x < 10, x => x ** 2))
 *   .value() // 16
 * ```
 */
export function loopWhile<T>(
  predicate: (element: T) => boolean,
  iteratee: (element: T) => T,
): (input: T) => T {
  return (input: T) => {
    let output = input;
    while (predicate(output)) {
      output = iteratee(output);
    }

    return output;
  };
}
