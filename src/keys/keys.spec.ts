import { describe, expect, test } from 'vitest';
import { keys } from './keys';

describe('keys function', () => {
  const input = { a: 1, b: 2, c: 3 };

  test('is a pure function', () => {
    keys()(input);
    expect(input).toMatchSnapshot();
  });

  test('{ a: 1, b: 2, c: 3 } |> keys === ["a", "b", "c"]', () => {
    expect(keys()(input)).toMatchSnapshot();
  });
});
