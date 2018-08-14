import { sortBy } from './sortBy';

describe('sortBy function', () => {
  type Sample = { a: number; b: number };
  const input = [
    { a: 2, b: 2 },
    { a: 2, b: 1 },
    { a: 3, b: 3 },
    { a: 3, b: 1 },
    { a: 3, b: 2 },
    { a: 1, b: 1 },
    { a: 1, b: 2 },
    { a: 2, b: 3 },
    { a: 1, b: 3 }
  ];

  test('is a pure function', () => {
    sortBy(({ a }) => a, ({ b }) => b)(input);
    expect(input).toMatchSnapshot();
  });

  test('input |> sortBy(a, b)', () => {
    expect(sortBy<Sample>(({ a }) => a, ({ b }) => b)(input)).toMatchSnapshot();
  });
});
