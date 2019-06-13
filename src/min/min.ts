/**
 * @module array=>number
 */
/**
 * Return the minimum of the list
 * @return the function to apply on the array to return its minimum
 * @example
 * ```
 * min()([10, 12, 15, 9]) // 9
 * ```
 * @example Using the chain
 * ```
 * chain([10, 12, 15, 9])
 *   .chain(min())
 *   .value() // 9
 * ```
 */
export function min(): (elements: ReadonlyArray<number>) => number {
  return (elements: ReadonlyArray<number>) => Math.min(...elements);
}
