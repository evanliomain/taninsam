import { describe, expect, test } from 'vitest';
import { loopWhile } from './loop-while';

describe('loopWhile function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    loopWhile<ReadonlyArray<number>>(
      arr => arr.length < 10,
      arr => [...arr, 0],
    )(input);
    expect(input).toMatchSnapshot();
  });

  test('2 |> loopWhile <10,  x => x² === 16', () => {
    expect(
      loopWhile<number>(
        x => x < 10,
        x => x ** 2,
      )(2),
    ).toBe(16);
  });
});
