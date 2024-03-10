import { describe, expect, test } from 'vitest';
import { length } from './length';

describe('length function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    length()(input);
    expect(input).toMatchSnapshot();
  });

  test('input |> length === 5', () => {
    expect(length()(input)).toBe(5);
  });

  test('[] |> length === 0', () => {
    expect(length()([])).toBe(0);
  });
});
