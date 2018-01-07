/**
 * @module array=>boolean
 */
/**
 * Determines whether some of the members of an array satisfy the specified test.
 * @param iteratee A function that accepts up to three arguments.
 * @return the function to apply on the array to determine if its satisfy the specified test
 * @example
 * ```
 * some<number>(x => x < 3)([1, 2, 3, 4, 5]) // true
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(some<number>(x => x < 3))
 *   .value() // true
 * ```
 */
export function some<T>(
  iteratee: (value: T, index: number, array: ReadonlyArray<T>) => boolean
): (array: ReadonlyArray<T>) => boolean {
  return (array: ReadonlyArray<T>) => array.some(iteratee);
}
