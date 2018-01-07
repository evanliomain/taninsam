/**
 * @module array=>array
 */
/**
 * Return a array with the new elements at the beginning.
 * @param items New elements to add on the Array.
 * @return the function to apply on the array
 * @example
 * ```
 * unshift<number>(4, 5)([1, 2, 3]) // [4, 5, 1, 2, 3]
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3])
 *   .chain(unshift<number>(4, 5))
 *   .value() // [4, 5, 1, 2, 3]
 * ```
 */
export function unshift<T>(
  ...items: T[]
): (array: ReadonlyArray<T>) => ReadonlyArray<T> {
  return (array: ReadonlyArray<T>) => [...items, ...array];
}
