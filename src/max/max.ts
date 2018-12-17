/**
 * @module array=>number
 */
/**
 * Return the maximum of the list
 * @return the function to apply on the array to return its maximum
 * @example
 * ```
 * max()([10, 12, 15, 9]) // 15
 * ```
 * @example Using the chain
 * ```
 * chain([10, 12, 15, 9])
 *   .chain(max())
 *   .value() // 15
 * ```
 */
export function max(): (elements: ReadonlyArray<number>) => number {
  return (elements: ReadonlyArray<number>) => Math.max(...elements);
}
