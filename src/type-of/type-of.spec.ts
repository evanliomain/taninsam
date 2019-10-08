import { typeOf } from './type-of';

describe('typeOf function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    typeOf(input);
    expect(input).toMatchSnapshot();
  });

  test('1 |> typeOf === "number"', () => {
    expect(typeOf(1)).toBe('number');
  });
  test('undefined |> typeOf === "undefined"', () => {
    expect(typeOf(undefined)).toBe('undefined');
  });
  test('null |> typeOf === "null"', () => {
    expect(typeOf(null)).toBe('null');
  });
  test('NaN |> typeOf === "number"', () => {
    expect(typeOf(NaN)).toBe('number');
  });
  test('Infinity |> typeOf === "number"', () => {
    expect(typeOf(Infinity)).toBe('number');
  });
  test('5 |> typeOf === "number"', () => {
    expect(typeOf(5)).toBe('number');
  });
  test('{} |> typeOf === "object"', () => {
    expect(typeOf({})).toBe('object');
  });
  test('{ a: 1 } |> typeOf === "object"', () => {
    expect(typeOf({ a: 1 })).toBe('object');
  });
  test('new Class() |> typeOf === "object"', () => {
    class Foo {}
    expect(typeOf(new Foo())).toBe('object');
  });
  test('function () {} |> typeOf === "function"', () => {
    const Foo = function() {
      /** Nothing to do */
    };
    expect(typeOf(new Foo())).toBe('object');
  });
  test('[] |> typeOf === "array"', () => {
    expect(typeOf([])).toBe('array');
  });
  test('[1, 2] |> typeOf === "array"', () => {
    expect(typeOf([1, 2])).toBe('array');
  });
  test('new Array() |> typeOf === "array"', () => {
    expect(typeOf(new Array())).toBe('array');
  });
  test('"" |> typeOf === "string"', () => {
    expect(typeOf('')).toBe('string');
  });
  test('function () {} |> typeOf === "function"', () => {
    expect(
      typeOf(function() {
        /** Nothing to do */
      })
    ).toBe('function');
  });
  test('() => {} |> typeOf === "function"', () => {
    expect(
      typeOf(() => {
        /** Nothing to do */
      })
    ).toBe('function');
  });
  test('/a/ |> typeOf === "regexp"', () => {
    expect(typeOf(/a/)).toBe('regexp');
  });
  test('new RegExp("a") |> typeOf === "regexp"', () => {
    expect(typeOf(new RegExp('a'))).toBe('regexp');
  });
  test('new Date() |> typeOf === "date"', () => {
    expect(typeOf(new Date())).toBe('date');
  });
  test('new Map() |> typeOf === "map"', () => {
    expect(typeOf(new Map())).toBe('map');
  });
  test('new WeakMap() |> typeOf === "weakmap"', () => {
    expect(typeOf(new WeakMap())).toBe('weakmap');
  });
  test('new Set() |> typeOf === "set"', () => {
    expect(typeOf(new Set())).toBe('set');
  });
  test('new WeakSet() |> typeOf === "weakset"', () => {
    expect(typeOf(new WeakSet())).toBe('weakset');
  });
  test('new Number() |> typeOf === "number"', () => {
    expect(typeOf(new Number())).toBe('number');
  });
  test('new Boolean() |> typeOf === "boolean"', () => {
    expect(typeOf(new Boolean())).toBe('boolean');
  });
  test('new String() |> typeOf === "string"', () => {
    expect(typeOf(new String())).toBe('string');
  });
  test('new Object() |> typeOf === "object"', () => {
    expect(typeOf(new Object())).toBe('object');
  });
  test('Symbol() |> typeOf === "symbol"', () => {
    expect(typeOf(Symbol())).toBe('symbol');
  });
  test('new BigInt64Array(2) |> typeOf === "bigint64array"', () => {
    expect(typeOf(new BigInt64Array(2))).toBe('bigint64array');
  });
  test('new Int16Array(2) |> typeOf === "int16array"', () => {
    expect(typeOf(new Int16Array(2))).toBe('int16array');
  });
  test('new Int32Array(2) |> typeOf === "int32array"', () => {
    expect(typeOf(new Int32Array(2))).toBe('int32array');
  });
  test('new Int8Array(2) |> typeOf === "int8array"', () => {
    expect(typeOf(new Int8Array(2))).toBe('int8array');
  });
  test('Math |> typeOf === "math"', () => {
    expect(typeOf(Math)).toBe('math');
  });
  test('JSON |> typeOf === "json"', () => {
    expect(typeOf(JSON)).toBe('json');
  });
  test('new Proxy({}, {}) |> typeOf === "object"', () => {
    expect(typeOf(new Proxy({}, {}))).toBe('object');
  });
  test('new ArrayBuffer(2) |> typeOf === "arraybuffer"', () => {
    expect(typeOf(new ArrayBuffer(2))).toBe('arraybuffer');
  });
  test('new SharedArrayBuffer(2) |> typeOf === "sharedarraybuffer"', () => {
    expect(typeOf(new SharedArrayBuffer(2))).toBe('sharedarraybuffer');
  });
  test('new Int8Array(2) |> typeOf === "int8array"', () => {
    expect(typeOf(new Int8Array(2))).toBe('int8array');
  });
  test('new Uint8Array(2) |> typeOf === "uint8array"', () => {
    expect(typeOf(new Uint8Array(2))).toBe('uint8array');
  });
  test('new Uint8ClampedArray(2) |> typeOf === "uint8clampedarray"', () => {
    expect(typeOf(new Uint8ClampedArray(2))).toBe('uint8clampedarray');
  });
  test('new Int16Array(2) |> typeOf === "int16array"', () => {
    expect(typeOf(new Int16Array(2))).toBe('int16array');
  });
  test('new Uint16Array(2) |> typeOf === "uint16array"', () => {
    expect(typeOf(new Uint16Array(2))).toBe('uint16array');
  });
  test('new Int32Array(2) |> typeOf === "int32array"', () => {
    expect(typeOf(new Int32Array(2))).toBe('int32array');
  });
  test('new Uint32Array(2) |> typeOf === "uint32array"', () => {
    expect(typeOf(new Uint32Array(2))).toBe('uint32array');
  });
  test('new Float32Array(2) |> typeOf === "float32array"', () => {
    expect(typeOf(new Float32Array(2))).toBe('float32array');
  });
  test('new Float64Array(2) |> typeOf === "float64array"', () => {
    expect(typeOf(new Float64Array(2))).toBe('float64array');
  });
  test('new BigInt64Array(2) |> typeOf === "bigint64array"', () => {
    expect(typeOf(new BigInt64Array(2))).toBe('bigint64array');
  });
  test('new BigUint64Array(2) |> typeOf === "biguint64array"', () => {
    expect(typeOf(new BigUint64Array(2))).toBe('biguint64array');
  });

  test('Atomics |> typeOf === "atomics"', () => {
    expect(typeOf(Atomics)).toBe('atomics');
  });

  test('new Error() |> typeOf === "error"', () => {
    expect(typeOf(new Error())).toBe('error');
  });
  test('new RangeError() |> typeOf === "error"', () => {
    expect(typeOf(new RangeError())).toBe('error');
  });
  test('new ReferenceError() |> typeOf === "error"', () => {
    expect(typeOf(new ReferenceError())).toBe('error');
  });
  test('new Promise(()=>({})) |> typeOf === "promise"', () => {
    expect(typeOf(new Promise(() => ({})))).toBe('promise');
  });
  test('WebAssembly.instantiate("") |> typeOf === "promise"', () => {
    expect.hasAssertions();
    let a = '';
    try {
      a = typeOf(WebAssembly.instantiate(''));
    } catch (error) {
      // Nothing to catch
    }
    expect(a).toBe('promise');
  });

  /*
  test('X |> typeOf === "xxx"', () => {
    expect(typeOf(X)).toBe('xxx');
  });
*/
});
