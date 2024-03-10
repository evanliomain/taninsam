import { describe, expect, test } from 'vitest';
import { sum } from './sum';

describe('sum function', () => {
  const input = [1, 2, 3, 4, 5, 6, 7];

  test('is a pure function', () => {
    sum()(input);
    expect(input).toMatchSnapshot();
  });

  test('input |> sum === 28', () => {
    expect(sum()(input)).toBe(28);
  });

  test('[] |> sum === 0', () => {
    expect(sum()([])).toBe(0);
  });
});
