import { loopDoWhile } from './loop-do-while';

describe('loopDoWhile function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    loopDoWhile<ReadonlyArray<number>>(
      arr => arr.length < 10,
      arr => [...arr, 0]
    )(input);
    expect(input).toMatchSnapshot();
  });

  test('2 |> loopDoWhile <10,  x => x² === 16', () => {
    expect(loopDoWhile<number>(x => x < 10, x => x ** 2)(2)).toBe(16);
  });

  test('2 |> loopDoWhile <10,  x => x² === 16', () => {
    expect(loopDoWhile<number>(x => x < 10, x => x ** 2)(10)).toBe(100);
  });
});
