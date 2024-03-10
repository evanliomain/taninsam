import { describe, expect, test } from 'vitest';
import { isArray } from './is-array';

describe('isArray function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    isArray(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2] |> isArray === true', () => {
    expect(isArray([1, 2])).toBeTruthy();
  });

  test('[] |> isArray === true', () => {
    expect(isArray([])).toBeTruthy();
  });

  test('"abba" |> isArray === false', () => {
    expect(isArray('abba')).toBeFalsy();
  });

  test('1 |> isArray === false', () => {
    expect(isArray(1)).toBeFalsy();
  });

  test('true |> isArray === false', () => {
    expect(isArray(true)).toBeFalsy();
  });

  test('{ a: 1 } |> isArray === false', () => {
    expect(isArray({ a: 1 })).toBeFalsy();
  });
});
