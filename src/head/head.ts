/**
 * @module array=>any
 */
/**
 * Return the first element of an array and return undefined
 * if the array is empty
 * @return the function to apply on the array to extract the first element
 * @example
 * ```
 * head<number>()([1, 2, 3, 4, 5]) // 1
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(head<number>())
 *   .value() // 1
 * ```
 */
export function head<T>(): (array: ReadonlyArray<T>) => T | undefined {
  return (array: ReadonlyArray<T>): T | undefined => {
    if (0 === array.length) {
      return undefined;
    }

    return array[0];
  };
}
