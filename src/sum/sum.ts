/**
 * @module array=>number
 */
/**
 * This method sum all element of the chained array.
 * @return the function to apply on the array
 * to sum its elements and return the sum
 * @example
 * ```
 * sum()([1, 2, 3, 4, 5]) // 15
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(sum())
 *   .value() // 15
 * ```
 */
export function sum(): (elements: ReadonlyArray<number>) => number {
  return (elements: ReadonlyArray<number>) =>
    elements.reduce((s, element) => s + element, 0);
}
