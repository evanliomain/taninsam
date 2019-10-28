import { loopUntil } from './loop-until';

describe('loopUntil function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    loopUntil<ReadonlyArray<number>>(
      arr => 10 < arr.length,
      arr => [...arr, 0]
    )(input);
    expect(input).toMatchSnapshot();
  });

  test('2 |> loopUntil 10<,  x => x² === 16', () => {
    expect(loopUntil<number>(x => 10 < x, x => x ** 2)(2)).toBe(16);
  });
});
