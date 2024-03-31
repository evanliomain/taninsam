import { isArray } from '../is-array';
import { isNull } from '../is-null';
import { isObject } from '../is-object';
import { isString } from '../is-string';
import { isUndefined } from '../is-undefined';

/**
 * @module any=>boolean
 */

type Empty = undefined | null | '' | [] | Record<string, never>;
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
  return (
    isUndefined(value) ||
    isNull(value) ||
    (isArray(value) && 0 === value.length) ||
    (isString(value) && 0 === value.length) ||
    (isObject(value) && 0 === Object.keys(value).length)
  );
}
