/**
 * @module array=>boolean
 */
/**
 * Determines whether all the members of an array satisfy the specified test.
 * @param iteratee A function that accepts up to three arguments.
 * @return the function to apply on the array to determine
 * if its satisfy the specified test
 * @example
 * ```
 * every<number>(x => x < 6)([1, 2, 3, 4, 5]) // true
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(every<number>(x => x < 6))
 *   .value() // true
 * ```
 */
export function every<T>(
  iteratee: (value: T, index: number, array: ReadonlyArray<T>) => boolean
): (array: ReadonlyArray<T>) => boolean {
  return (array: ReadonlyArray<T>) => array.every(iteratee);
}
