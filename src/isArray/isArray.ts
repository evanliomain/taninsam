/**
 * @module any=>boolean
 */
/**
 * Determines whether the passed value is an Array
 * @param value The value to test.
 * @return true if the value is an array, flase otherwise
 * @example
 * ```
 * isArray([1, 2, 3]) // true
 * isArray(true) // false
 * ```
 */
export function isArray<T>(value): value is ReadonlyArray<T> {
  return Array.isArray(value);
}
