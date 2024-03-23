/**
 * @module array=>string
 */
/**
 * Adds all the elements of an array separated by
 * the specified separator string.
 * @param separator A string used to separate one element of an array
 * from the next in the resulting String.
 * @return the function to apply on the TBD to do something
 * @example
 * ```
 * join()([1, 2, 3, 4, 5]) // 1,2,3,4,5
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(join('/'))
 *   .value() // 1/2/3/4/5
 * ```
 */
export function join<T>(
  separator?: string,
): (array: ReadonlyArray<T>) => string {
  return (array: ReadonlyArray<T>) => array.join(separator);
}
