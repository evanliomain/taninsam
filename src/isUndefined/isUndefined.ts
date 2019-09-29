/**
 * @module any=>boolean
 */
/**
 * Determines whether the passed value is undefined
 * @param value The value to test.
 * @return true if the value is undefined, false otherwise
 * @example
 * ```
 * isUndefined(undefined) // true
 * isUndefined(null) // false
 * isUndefined([]) // false
 * isUndefined('') // false
 * isUndefined(0) // false
 * ```
 */
export function isUndefined(value): value is undefined {
  return 'undefined' === typeof value;
}
