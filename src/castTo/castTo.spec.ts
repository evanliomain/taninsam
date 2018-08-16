import { castTo } from './castTo';

describe('castTo function', () => {
  const input = { a: 1, b: 2, c: 3 };
  const array = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }];

  test('is a pure function', () => {
    castTo({ a: x => x })(input);
    expect(input).toMatchSnapshot();
  });

  test('{a: 1, b: 2, c:3} |> castTo === {a: 2, b: 2, c: 3}', () => {
    expect(castTo({ a: x => x + x, b: x => x })(input)).toEqual({
      a: 2,
      b: 2,
      c: 3
    });
  });

  test('[{a: 1, b: 2, c:3}, {a: 4, b: 5, c:6}] |> castTo === [{a: 2, b: 2, c: 3}, {a: 8, b: 5, c: 6}]', () => {
    expect(castTo({ a: x => x + x, b: x => x })(array)).toEqual([
      { a: 2, b: 2, c: 3 },
      { a: 8, b: 5, c: 6 }
    ]);
  });
});
