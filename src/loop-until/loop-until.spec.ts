import { describe, expect, test, vi } from 'vitest';
import { loopUntil } from './loop-until';

describe('loopUntil function', () => {
  const input = [1, 2, 3, 4, 5];
  const isBigEnough: (x: number) => boolean = x => 10 <= x;
  const square: (x: number) => number = x => x ** 2;

  test('is a pure function', () => {
    loopUntil<ReadonlyArray<number>>(
      arr => 10 <= arr.length,
      arr => [...arr, 0],
    )(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });

  test('2 |> loopUntil(10 <= x, x => x²) === 16', () => {
    expect(loopUntil<number>(isBigEnough, square)(2)).toBe(16);
  });

  test('20 |> loopUntil(10 <= x, x => x²) === 20', () => {
    expect(loopUntil<number>(isBigEnough, square)(20)).toBe(20);
  });

  test('10 |> loopUntil(10 <= x, x => x²) === 10', () => {
    expect(loopUntil<number>(isBigEnough, square)(10)).toBe(10);
  });

  test('9 |> loopUntil(10 <= x, x => x²) === 81', () => {
    expect(loopUntil<number>(isBigEnough, square)(9)).toBe(81);
  });

  test('does not call the iteratee when the predicate already holds', () => {
    const cb = vi.fn(square);
    loopUntil<number>(isBigEnough, cb)(20);
    expect(cb.mock.calls.length).toBe(0);
  });

  test('calls the iteratee until the predicate holds', () => {
    const cb = vi.fn(square);
    loopUntil<number>(isBigEnough, cb)(2);
    expect(cb.mock.calls.length).toBe(2);
    expect(cb.mock.calls[0][0]).toBe(2);
    expect(cb.mock.calls[1][0]).toBe(4);
  });
});
