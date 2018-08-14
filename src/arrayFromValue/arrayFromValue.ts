/**
 * @module T=>array
 */
/**
 * Generate a new array of size length with the provided value
 * @param length the length of the array to generate
 * @param value the value to put in array
 * @return the function to generate the array
 * @example
 * ```
 * arrayFromValue<string>(5)('a') // ['a', 'a', 'a', 'a', 'a']
 * ```
 * @example Using the chain
 * ```
 * chain('a')
 *   .chain(arrayFromValue<string>(5))
 *   .value() // ['a', 'a', 'a', 'a', 'a']
 * ```
 */
export function arrayFromValue<T>(
  length: number
): (value: T) => ReadonlyArray<T> {
  return (value: T) => Array.from({ length }, () => value);
}
