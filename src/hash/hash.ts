/**
 * @module any=>string
 */
import { isBoolean } from '../isBoolean';
import { isString } from '../isString';
import { isNumber } from '../isNumber';
import { isArray } from '../isArray';
import { isObject } from '../isObject';
import { entries } from '../entries';
import { chain } from '../chain';
import { map } from '../map';
import { sortBy } from '../sortBy';
import { join } from '../join';
import { isNull } from '../isNull';
import { isUndefined } from '../isUndefined';
/**
 * Convert the passed value into a string.
 * 2 values that have the same "value" but are referenced
 * with 2 variables will have the same hash.
 * @return the function to apply on the TBD to do something
 * @example
 * ```
 * hash()(1) === hash()(1)
 * hash()(1) !== hash()("1")
 * hash()(true) !== hash()("true")
 * ```
 */
export function hash<T>(): (value: T) => string {
  return (value: T) => {
    if (isNull(value)) {
      return 'null';
    }
    if (isUndefined(value)) {
      return 'undefined';
    }
    if (isBoolean(value)) {
      return `b(${value.toString()})`;
    }
    if (isString(value)) {
      return `s(${value})`;
    }
    if (isNumber(value)) {
      return `n(${value.toString()})`;
    }
    if (isArray(value)) {
      return `a([${value.map(element => hash()(element)).join(',')}])`;
    }
    if (isObject(value)) {
      return chain(value)
        .chain(entries())
        .chain(sortBy(([key, _]) => key))
        .chain(map(([key, v]) => `${key}:${hash()(v)}`))
        .chain(join(','))
        .chain(s => `o({${s}})`)
        .value();
    }
    throw new Error(`Try to hash an unsupported value type: ${typeof value}`);
  };
}
