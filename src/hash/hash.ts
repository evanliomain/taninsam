/**
 * @module any=>string
 */
import { chain } from '../chain';
import { entries } from '../entries';
import { isArray } from '../is-array';
import { isBoolean } from '../is-boolean';
import { isNull } from '../is-null';
import { isNumber } from '../is-number';
import { isObject } from '../is-object';
import { isString } from '../is-string';
import { isUndefined } from '../is-undefined';
import { join } from '../join';
import { map } from '../map';
import { sortBy } from '../sort-by';
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
      return `s(${String(value)})`;
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
