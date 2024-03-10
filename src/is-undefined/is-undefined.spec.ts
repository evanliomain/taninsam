import { describe, expect, test } from 'vitest';
import { isUndefined } from './is-undefined';

describe('isUndefined function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    isUndefined(input);
    expect(input).toMatchSnapshot();
  });

  test('null |> isUndefined === false', () => {
    expect(isUndefined(null)).toBeFalsy();
  });

  test('undefined |> isUndefined === true', () => {
    expect(isUndefined(undefined)).toBeTruthy();
  });

  test('[] |> isUndefined === false', () => {
    expect(isUndefined([])).toBeFalsy();
  });

  test('0 |> isUndefined === false', () => {
    expect(isUndefined(0)).toBeFalsy();
  });

  test('"" |> isUndefined === false', () => {
    expect(isUndefined('')).toBeFalsy();
  });
});
