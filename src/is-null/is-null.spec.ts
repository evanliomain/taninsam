import { describe, expect, test } from 'vitest';
import { isNull } from './is-null';

describe('isNull function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    isNull(input);
    expect(input).toMatchSnapshot();
  });

  test('null |> isNull === true', () => {
    expect(isNull(null)).toBeTruthy();
  });

  test('undefined |> isNull === false', () => {
    expect(isNull(undefined)).toBeFalsy();
  });

  test('[] |> isNull === false', () => {
    expect(isNull([])).toBeFalsy();
  });

  test('0 |> isNull === false', () => {
    expect(isNull(0)).toBeFalsy();
  });

  test('"" |> isNull === false', () => {
    expect(isNull('')).toBeFalsy();
  });
});
