/**
 * @module any=>boolean
 */
/**
 * Determines whether the passed value is null
 * @param value The value to test.
 * @return true if the value is null, false otherwise
 * @example
 * ```
 * isNull(null) // true
 * isNull(undefined) // false
 * isNull([]) // false
 * isNull('') // false
 * isNull(0) // false
 * ```
 */
export function isNull(value): value is null {
  return null === value;
}
