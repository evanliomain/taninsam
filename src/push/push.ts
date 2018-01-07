/**
 * @module array=>array
 */
/**
 * Return a array with the new elements at the end.
 * @param items New elements to add on the Array.
 * @return the function to apply on the array
 * @example
 * ```
 * push<number>(4, 5)([1, 2, 3]) // [1, 2, 3, 4, 5]
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3])
 *   .chain(push<number>(4, 5))
 *   .value() // [1, 2, 3, 4, 5]
 * ```
 */
export function push<T>(
  ...items: T[]
): (array: ReadonlyArray<T>) => ReadonlyArray<T> {
  return (array: ReadonlyArray<T>) => [...array, ...items];
}
