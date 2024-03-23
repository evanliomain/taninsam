import { describe, expect, test } from 'vitest';
import { find } from './find';

describe('find function', () => {
  const input = [
    { a: 1, b: 'a' },
    { a: 2, b: 'b' },
    { a: 3, b: 'c' },
    { a: 4, b: 'd' },
  ];

  test('is a pure function', () => {
    find<{ a: number }>(({ a }) => 3 === a)(input);
    expect(input).toMatchSnapshot();
  });

  test('[{ a, b }] |> find(e => e.a === 3) === { a: 3, b: "c" }', () => {
    expect(find<{ a: number }>(({ a }) => 3 === a)(input)).toMatchSnapshot();
  });

  test('[{ a, b }] |> find(e => e.a === 5) === undefined', () => {
    expect(find<{ a: number }>(({ a }) => 5 === a)(input)).toBeUndefined();
  });
});
