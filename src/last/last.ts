/**
 * @module array=>any
 */
/**
 * Extract the last element of an array. An empty array has an undefined last element
 * @return the function to apply on the TBD to do something
 * @example
 * ```
 * last<number>()([1, 2, 3, 4, 5]) // 5
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(last<number>())
 *   .value() // 5
 * ```
 */
export function last<T>(): (element: ReadonlyArray<T>) => T | undefined {
  return (array: ReadonlyArray<T>): T | undefined => {
    if (0 === array.length) {
      return undefined;
    }
    return array[array.length - 1];
  };
}
