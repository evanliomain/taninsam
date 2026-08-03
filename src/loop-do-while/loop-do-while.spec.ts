import { describe, expect, test, vi } from 'vitest';
import { loopDoWhile } from './loop-do-while';

describe('loopDoWhile function', () => {
  const input = [1, 2, 3, 4, 5];
  const isSmall: (x: number) => boolean = x => x < 10;
  const square: (x: number) => number = x => x ** 2;

  test('is a pure function', () => {
    loopDoWhile<ReadonlyArray<number>>(
      arr => arr.length < 10,
      arr => [...arr, 0],
    )(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });

  test('2 |> loopDoWhile(x < 10, x => x²) === 16', () => {
    expect(loopDoWhile<number>(isSmall, square)(2)).toBe(16);
  });

  test('20 |> loopDoWhile(x < 10, x => x²) === 400', () => {
    expect(loopDoWhile<number>(isSmall, square)(20)).toBe(400);
  });

  test('10 |> loopDoWhile(x < 10, x => x²) === 100', () => {
    expect(loopDoWhile<number>(isSmall, square)(10)).toBe(100);
  });

  test('3 |> loopDoWhile(x < 10, x => x²) === 81', () => {
    expect(loopDoWhile<number>(isSmall, square)(3)).toBe(81);
  });

  test('calls the iteratee once when the predicate rejects the input', () => {
    const cb = vi.fn(square);
    loopDoWhile<number>(isSmall, cb)(20);
    expect(cb.mock.calls.length).toBe(1);
    expect(cb.mock.calls[0][0]).toBe(20);
  });

  test('calls the iteratee while the predicate holds', () => {
    const cb = vi.fn(square);
    loopDoWhile<number>(isSmall, cb)(2);
    expect(cb.mock.calls.length).toBe(2);
    expect(cb.mock.calls[0][0]).toBe(2);
    expect(cb.mock.calls[1][0]).toBe(4);
  });

  test('checks the predicate on the output, never on the input', () => {
    const cb = vi.fn(isSmall);
    loopDoWhile<number>(cb, square)(2);
    expect(cb.mock.calls.length).toBe(2);
    expect(cb.mock.calls[0][0]).toBe(4);
    expect(cb.mock.calls[1][0]).toBe(16);
  });
});
