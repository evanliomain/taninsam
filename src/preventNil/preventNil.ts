import { isUndefined } from '../isUndefined';
import { isNull } from '../isNull';

/**
 * @module TBD_A=>TBD_B
 */
/**
 * preventNil makes resilient a function to value undefined and null:
 * it prevents to call f with an input undefined or null.
 * If undefined or null are passed, then f is NOT called and undefined is returned.
 * @param f The function to protect.
 * @return the function to apply on the input to prevent f to have been called
 * @example
 * ```
 * preventNil<number, number>(x => 1 + x)(undefined) // undefined
 * preventNil<number, number>(x => 1 + x)(null) // null
 * preventNil<number, number>(x => 1 + x)(2) // 3
 * ```
 * preventNil<TBD_A>()() // TBD_B
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3])
 *   .chain(preventNil(array => array[3]))
 *   .chain(preventNil(x => 1 + x))
 *   .value() // undefined
 * ```
 * ```
 * chain([1, 2, 3])
 *   .chain(preventNil(array => array[1]))
 *   .chain(preventNil(x => 1 + x))
 *   .value() // 3
 * ```
 * @example Prevent apply map on undefined or null
 * ```
 * chain([1, 2, 3])
 *   .chain(preventNil(map(x => x + 1)))
 *   .value() // [2, 3, 4]
 * ```
 * ```
 * chain(undefined)
 *   .chain(preventNil(map(x => x + 1)))
 *   .value() // undefined
 * ```
 * ```
 * chain(null)
 *   .chain(preventNil(map(x => x + 1)))
 *   .value() // undefined
 * ```
 */
export function preventNil<S, T>(
  f: (x: S) => T
): (element: S) => T | null | undefined {
  return (x: S) => (isUndefined(x) || isNull(x) ? undefined : f(x));
}
