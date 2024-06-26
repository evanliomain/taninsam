import { describe, expect, test } from 'vitest';
import { castTo } from './cast-to';

describe('castTo function', () => {
  const input = { a: 1, b: 2, c: 'A' };
  const array = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 },
  ];

  test('is a pure function', () => {
    castTo({ a: x => x })(input);
    expect(input).toMatchSnapshot();
  });

  test(
    "{ a: '1', b: 2.1, c: 'A' }" +
      ' |> castTo({a: x => parseInt(x, 10),b: x => Math.floor(x),c: x => parseInt(x, 16)})' +
      ' === { a: 1, b: 2, c: 10 }',
    () => {
      expect(
        castTo({
          a: x => parseInt(x, 10),
          b: x => Math.floor(x),
          c: x => parseInt(x, 16),
        })(input),
      ).toMatchSnapshot();
    },
  );

  test(
    '[{a: 1, b: 2, c:3}, {a: 4, b: 5, c:6}]' +
      ' |> castTo({ a: x => x + x, b: x => x })' +
      ' === [{a: 2, b: 2, c: 3}, {a: 8, b: 5, c: 6}]',
    () => {
      expect(castTo({ a: x => x + x, b: x => x })(array)).toMatchSnapshot();
    },
  );
});
