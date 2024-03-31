import { isNull } from '../is-null';
import { isUndefined } from '../is-undefined';

/**
 * @module any=>boolean
 */
/**
 * Determines whether the passed value is undefined or null.
 * @param value The value to test.
 * @return true if the value is undefined or null, false otherwise
 * @example
 * ```
 * isNil(undefined) // true
 * isNil(null) // true
 * isNil([]) // false
 * isNil({}) // false
 * isNil('') // false
 * isNil(0) // false
 * ```
 */
export function isNil(value): value is undefined | null {
  return isUndefined(value) || isNull(value);
}
