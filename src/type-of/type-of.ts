/**
 * @module any=>string
 */
/**
 * Get an enhanced type of the input.
 * Use toString to compute a more specific "type"
 * than the native typof operator.
 * @param input The input to test type.
 * @return the enhanced type of the input. Could be:
 * - undefined
 * - null
 * - number
 * - boolean
 * - string
 * - object
 * - array
 * - function
 * - symbol
 * - regexp
 * - date
 * - map
 * - weakmap
 * - set
 * - weakset
 * - promise
 * - bigint64array
 * - int16array
 * - int32array
 * - int8array
 * - int8array
 * - uint8array
 * - uint8clampedarray
 * - int16array
 * - uint16array
 * - int32array
 * - uint32array
 * - float32array
 * - float64array
 * - bigint64array
 * - biguint64array
 * - arraybuffer
 * - sharedarraybuffer
 * - math
 * - json
 * - atomics
 * - error
 * @example
 * ```
 * typeOf(undefined); // undefined
 * typeOf(null); // null
 * typeOf(NaN); // number
 * typeOf(5); // number
 * typeOf({}); // object
 * typeOf([]); // array
 * typeOf(''); // string
 * typeOf(function () {}); // function
 * typeOf(/a/) // regexp
 * typeOf(new Date()) // date
 * typeOf(new WeakMap()) // weakmap
 * typeOf(new Map()) // map
 * ```
 */
export function typeOf(element: unknown): string {
  return {}.toString.call(element).split(' ')[1].slice(0, -1).toLowerCase();
}
