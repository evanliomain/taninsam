import { isUndefined } from '../isUndefined';
import { isNull } from '../isNull';
import { isArray } from '../isArray';
import { isString } from 'util';
import { isObject } from '../isObject';

/**
 * @module any=>boolean
 */

type Empty = undefined | null | '' | [] | {};
/**
 * Determines whether the passed value is undefined or null or is an empty structure
 * @param iteratee The iteratee invoked per element.
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
