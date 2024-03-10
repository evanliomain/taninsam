import { describe, expect, test } from 'vitest';
import { tail } from './tail';

describe('tail function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function with array', () => {
    tail()(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> tail === [2, 3, 4, 5]', () => {
    expect(tail()(input)).toMatchSnapshot();
  });

  test('[] |> tail === []', () => {
    expect(tail()([])).toMatchSnapshot();
  });
});
