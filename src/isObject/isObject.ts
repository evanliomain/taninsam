/**
 * @module any=>boolean
 */
/**
 * Determines whether the passed value is an object
 * @param value The value to test.
 * @return true if the value is an object, flase otherwise
 * @example
 * ```
 * isObject({ a: 1 }) // true
 * isObject({}) // true
 * isObject([1, 2]) // false
 * isObject(true) // false
 * ```
 */
export function isObject(value): value is Readonly<object> {
  return 'object' === typeof value && !Array.isArray(value);
}
