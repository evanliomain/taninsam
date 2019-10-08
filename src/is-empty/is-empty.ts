import { isArray } from '../is-array';
import { isNull } from '../is-null';
import { isObject } from '../is-object';
import { isString } from '../is-string';
import { isUndefined } from '../is-undefined';

/**
 * @module any=>boolean
 */

// tslint:disable-next-line:no-null-undefined-union
type Empty = undefined | null | '' | [] | {};
/**
 * Determines whether the passed value is :
 * - undefined or
 * - null or
 * - is an empty structure
 * @param value The value to test.
 * @return true if the value is empty, false otherwise
 * @example
 * ```
 * isEmpty(undefined) // true
 * isEmpty(null) // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty('') // true
 * isEmpty(0) // false
 * ```
 */
export function isEmpty(value): value is Empty {
  if (isUndefined(value)) {
    return true;
  }
  if (isNull(value)) {
    return true;
  }
  if (isArray(value) && 0 === value.length) {
    return true;
  }
  if (isString(value) && 0 === value.length) {
    return true;
  }
  if (isObject(value) && 0 === Object.keys(value).length) {
    return true;
  }

  return false;
}
