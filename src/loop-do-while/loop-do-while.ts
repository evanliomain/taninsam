/**
 * @module TBD_A=>TBD_B
 */
/**
 * This method loop on an input:
 * - at first, output = iteratee(input)
 * - while predicat(output) is true, output = iteratee(output)
 * - finally, returns output
 * @param predicate The function apply on each loop to decide to :
 * continue (return true), or to stop (return false)
 * @param iteratee The iteratee invoked on each loop.
 * @return the function to apply on the input
 * @example
 * ```
 * loopDoWhile<number>(x => x < 10, x => x ** 2)(10) // 100
 * ```
 * @example Using the chain
 * ```
 * chain(10)
 *   .chain(loopDoWhile<number>(x => x < 10, x => x ** 2))
 *   .value() // 100
 * ```
 */
export function loopDoWhile<T>(
  predicate: (element: T) => boolean,
  iteratee: (element: T) => T
): (input: T) => T {
  return (input: T) => {
    let output = input;
    do {
      output = iteratee(output);
    } while (predicate(output));

    return output;
  };
}
