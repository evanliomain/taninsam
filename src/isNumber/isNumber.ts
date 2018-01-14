/**
 * @module any=>boolean
 */
/**
 * Determines whether the passed value is a number
 * @param value The value to test.
 * @return true if the value is a number, flase otherwise
 * @example
 * ```
 * isNumber(1) // true
 * isNumber(true) // false
 * ```
 */
export function isNumber(value): value is number {
  return 'number' === typeof value;
}
