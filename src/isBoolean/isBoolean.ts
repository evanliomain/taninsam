/**
 * @module any=>boolean
 */
/**
 * Determines whether the passed value is a boolean
 * @param value The value to test.
 * @return true if the value is a boolean, flase otherwise
 * @example
 * ```
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean('abba') // false
 * ```
 */
export function isBoolean(value): value is boolean {
  return 'boolean' === typeof value;
}
