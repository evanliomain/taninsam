/**
 * @module any=>boolean
 */
/**
 * Determines whether the passed value is a string
 * @param value The value to test.
 * @return true if the value is an string, flase otherwise
 * @example
 * ```
 * isString('abba') // true
 * isString(true) // false
 * ```
 */
export function isString(value): value is string {
  return 'string' === typeof value;
}
