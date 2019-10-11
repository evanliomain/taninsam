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
// tslint:disable-next-line:no-null-undefined-union
export function isNil(value): value is undefined | null {
  if (isUndefined(value)) {
    return true;
  }
  if (isNull(value)) {
    return true;
  }

  return false;
}
