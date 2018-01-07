/**
 * @module array=>array
 */
/**
 * Removes the first element from an array.
 * @return the function to apply on the array
 * @example
 * ```
 * shift<number>()([1, 2, 3, 4, 5]) // [1, 2, 3, 4]
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(shift<number>())
 *   .value() // [1, 2, 3, 4]
 * ```
 */
export function shift<T>(): (array: ReadonlyArray<T>) => ReadonlyArray<T> {
  return ([_, ...tail]: ReadonlyArray<T>) => tail;
}
