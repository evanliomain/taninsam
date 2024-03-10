import { describe, expect, test } from 'vitest';
import { min } from './min';

describe('min function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    min()(input);
    expect(input).toMatchSnapshot();
  });

  test('[10, 12, 15, 9] |> min === 9', () => {
    expect(min()([10, 12, 15, 9])).toBe(9);
  });
});
