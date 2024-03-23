import { describe, expect, test } from 'vitest';
import { hash } from './hash';

describe('hash function', () => {
  const input = 'something';

  test('is a pure function', () => {
    hash()(input);
    expect(input).toMatchSnapshot();
  });

  test('hash 1 === hash 1', () => {
    expect(compare(1, 1)).toBeTruthy();
  });

  test('hash 1 !== hash 2', () => {
    expect(compare(1, 2)).toBeFalsy();
  });

  test('hash 1 !== hash 2', () => {
    expect(compare(1, 2)).toBeFalsy();
  });

  test('hash true !== hash true', () => {
    expect(compare(true, true)).toBeTruthy();
  });

  test('hash true !== hash false', () => {
    expect(compare(true, false)).toBeFalsy();
  });

  test('hash true !== hash "true"', () => {
    expect(compare(true, 'true')).toBeFalsy();
  });

  test('hash false !== hash "false"', () => {
    expect(compare(false, 'false')).toBeFalsy();
  });

  test('hash 1 !== hash "1"', () => {
    expect(compare(1, '1')).toBeFalsy();
  });

  test('hash { a: 1, b: 2 } === hash { b: 2, a: 1 }', () => {
    expect(compare({ a: 1, b: 2 }, { b: 2, a: 1 })).toBeTruthy();
  });

  test('hash { a: 1, b: 2 } !== hash { a: 1, b: 2, c: 3 }', () => {
    expect(compare({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBeFalsy();
  });

  test('hash [1, 2] === hash [1, 2]', () => {
    expect(compare([1, 2], [1, 2])).toBeTruthy();
  });

  test('hash [1, 2] !== hash [2, 1]', () => {
    expect(compare([1, 2], [2, 1])).toBeFalsy();
  });

  test('hash [{ a: 1, b: 2 }, { a: 3, b: 4 }] === hash [{ b: 2, a: 1 }, { a: 3, b: 4 }]', () => {
    expect(
      compare(
        [
          { a: 1, b: 2 },
          { a: 3, b: 4 },
        ],
        [
          { b: 2, a: 1 },
          { a: 3, b: 4 },
        ],
      ),
    ).toBeTruthy();
  });

  test('hash [{ a: 1, b: 2 }, { a: 3, b: 4 }] !== hash [{ a: 3, b: 4 }, { a: 1, b: 2 }]', () => {
    expect(
      compare(
        [
          { a: 1, b: 2 },
          { a: 3, b: 4 },
        ],
        [
          { a: 3, b: 4 },
          { a: 1, b: 2 },
        ],
      ),
    ).toBeFalsy();
  });

  test('hash undefined !== hash null', () => {
    expect(compare(undefined, null)).toBeFalsy();
  });

  test('hash undefined !== hash "undefined"', () => {
    expect(compare(undefined, 'undefined')).toBeFalsy();
  });

  test('hash null !== hash "null"', () => {
    expect(compare(null, 'null')).toBeFalsy();
  });

  test('hash undefined !== hash 0', () => {
    expect(compare(undefined, 0)).toBeFalsy();
  });

  test('hash null !== hash 0', () => {
    expect(compare(null, 0)).toBeFalsy();
  });

  test('hash({ f: () => 1 }) throw exception', () => {
    expect(() => hash()({ f: () => 1 })).toThrowErrorMatchingSnapshot();
  });

  function compare(a, b): boolean {
    return hash()(a) === hash()(b);
  }
});
