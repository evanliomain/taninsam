/**
 * @module array=>number
 */
/**
 * Get the length of the table
 * @return the function to apply to get the array length
 * @example
 * ```
 * length<number>()([0, 1, 2, 3, 4]) // 5
 * ```
 * @example Using the chain
 * ```
 * chain([0, 1, 2, 3, 4])
 *   .chain(length<number>())
 *   .value() // 5
 * ```
 */
export function length<T>(): (elements: ReadonlyArray<T>) => number {
  return (elements: ReadonlyArray<T>) => elements.length;
}
