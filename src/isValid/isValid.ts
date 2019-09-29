import { isUndefined } from '../isUndefined';
import { isNull } from '../isNull';

/**
 * @module any=>boolean
 */
/**
 * Determines whether the passed value is not undefined and not null.
 * @param value The value to test.
 * @return true if the value is valid, false otherwise
 * @example
 * ```
 * isValid(undefined) // false
 * isValid(null) // false
 * isValid([]) // true
 * isValid({}) // true
 * isValid('') // true
 * isValid(0) // true
 * ```
 */
export function isValid<T>(value: T): boolean {
  if (isUndefined(value)) {
    return false;
  }
  if (isNull(value)) {
    return false;
  }
  return true;
}
