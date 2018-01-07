/**
 * @module array=>array
 */
/**
 * Removes the last element from an array.
 * @return the function to apply on the array
 * @example
 * ```
 * pop<number>()([1, 2, 3, 4, 5]) // [1, 2, 3, 4]
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(pop<number>())
 *   .value() // [1, 2, 3, 4]
 * ```
 */
export function pop<T>(): (array: ReadonlyArray<T>) => ReadonlyArray<T> {
  return (array: ReadonlyArray<T>) => array.slice(0, array.length - 1);
}
