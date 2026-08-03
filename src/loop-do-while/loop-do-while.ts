/**
 * @module any=>any
 */
import { loopWhile } from '../loop-while';

/**
 * This method loop on an input:
 * - at first, output = iteratee(input)
 * - while predicate(output) is true, output = iteratee(output)
 * - finally, returns output
 *
 * It is {@link loopWhile} with the predicate checked after the iteratee
 * instead of before it, so the iteratee always runs at least once, even on
 * an input the predicate rejects.
 * @param predicate The function apply after each loop to decide to :
 * continue (return true), or to stop (return false)
 * @param iteratee The iteratee invoked on each loop.
 * @return the function to apply on the input
 * @example
 * ```
 * loopDoWhile<number>(x => x < 10, x => x ** 2)(2) // 16
 * loopDoWhile<number>(x => x < 10, x => x ** 2)(20) // 400
 * ```
 * @example Using the chain
 * ```
 * chain(2)
 *   .chain(loopDoWhile<number>(x => x < 10, x => x ** 2))
 *   .value() // 16
 * ```
 */
export function loopDoWhile<T>(
  predicate: (element: T) => boolean,
  iteratee: (element: T) => T,
): (input: T) => T {
  return (input: T) => loopWhile<T>(predicate, iteratee)(iteratee(input));
}
