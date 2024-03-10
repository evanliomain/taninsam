import { describe, expect, test } from 'vitest';
import { uniq } from './uniq';

type Sample = {
  a: number;
  b: number;
  c: string;
};

describe('uniq function', () => {
  const input: Sample[] = [
    { a: 1, b: 1, c: 'a' },
    { a: 1, b: 2, c: 'a' },
    { a: 1, b: 1, c: 'b' }
  ];

  test('is a pure function', () => {
    uniq()(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 2, 3, 5, 1] |> uniq === [1, 2, 3, 5]', () => {
    expect(uniq<number>()([1, 2, 3, 2, 3, 5, 1])).toMatchSnapshot();
  });

  test('input |> uniq ({ a, b, c }) => a === [{ a: 1, b: 1, c: "a" }]', () => {
    expect(uniq<Sample>(({ a }) => a)(input)).toMatchSnapshot();
  });

  test('input |> uniq ({ a, b, c }) => ({ a, b }) === [{ a: 1, b: 1, c: "a" }, { a: 1, b: 2, c: "a" }]', () => {
    expect(uniq<Sample>(({ a, b }) => ({ a, b }))(input)).toMatchSnapshot();
  });

  test('input |> uniq ({ a, b, c }) => ({ a, c }) === [{ a: 1, b: 1, c: "a" }, { a: 1, b: 1, c: "b" }]', () => {
    expect(uniq<Sample>(({ a, c }) => ({ a, c }))(input)).toMatchSnapshot();
  });

  test('deepObject |> uniq', () => {
    expect(
      uniq()([
        { a: { b: 1 }, b: { a: 1 } },
        { a: { b: 1 }, b: { a: 2 } },
        { a: { b: 2 }, b: { a: 1 } },
        { a: { b: 1 }, b: { a: 1 } }
      ])
    ).toMatchSnapshot();
  });
});
