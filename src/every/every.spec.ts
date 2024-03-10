import { describe, expect, test } from 'vitest';
import { every } from './every';

describe('every function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    every((x: number): boolean => x < 6)(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> every === true', () => {
    expect(every((x: number): boolean => x < 6)(input)).toMatchSnapshot();
  });
});
