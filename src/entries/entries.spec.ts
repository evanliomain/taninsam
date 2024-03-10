import { describe, expect, test } from 'vitest';
import { entries } from './entries';

describe('entries function', () => {
  const input = { a: 1, b: 2, c: 3 };

  test('is a pure function', () => {
    entries()(input);
    expect(input).toMatchSnapshot();
  });

  test('{ a: 1, b: 2, c: 3 } |> entries === [1, 2, 3]', () => {
    expect(entries()(input)).toMatchSnapshot();
  });
});
