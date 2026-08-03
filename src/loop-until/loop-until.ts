/**
 * @module any=>any
 */
import { loopWhile } from '../loop-while';
import { not } from '../not';

/**
 * This method loop on an input:
 * - at first, output = input
 * - until predicate(output) is true, output = iteratee(output)
 * - finally, returns output
 *
 * It is the mirror of {@link loopWhile}: `loopUntil(p, f)` behaves as
 * `loopWhile(not(p), f)`. The predicate is checked before the first call,
 * so an input that already satisfies it is returned untouched.
 * @param predicate The function apply on each loop to decide to :
 * stop (return true), or to continue (return false)
 * @param iteratee The iteratee invoked on each loop.
 * @return the function to apply on the input
 * @example
 * ```
 * loopUntil<number>(x => 10 <= x, x => x ** 2)(2) // 16
 * loopUntil<number>(x => 10 <= x, x => x ** 2)(20) // 20
 * ```
 * @example Using the chain
 * ```
 * chain(2)
 *   .chain(loopUntil<number>(x => 10 <= x, x => x ** 2))
 *   .value() // 16
 * ```
 */
export function loopUntil<T>(
  predicate: (element: T) => boolean,
  iteratee: (element: T) => T,
): (input: T) => T {
  return loopWhile<T>(not<T>(predicate), iteratee);
}
