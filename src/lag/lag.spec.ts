import { describe, expect, test, vi } from 'vitest';
import { lag } from './lag';

describe('lag function', () => {
  const input = [1, 2, 4, 8];
  const delta: (current: number, next: number) => number = (current, next) =>
    next - current;

  test('is a pure function', () => {
    lag<number, number>(delta)(input);
    expect(input).toEqual([1, 2, 4, 8]);
  });

  test('[1, 2, 4, 8] |> lag(delta) === [1, 2, 4]', () => {
    expect(lag<number, number>(delta)(input)).toEqual([1, 2, 4]);
  });

  test('[1, 2] |> lag(delta) === [1]', () => {
    expect(lag<number, number>(delta)([1, 2])).toEqual([1]);
  });

  test('[1] |> lag(delta) === []', () => {
    expect(lag<number, number>(delta)([1])).toEqual([]);
  });

  test('[] |> lag(delta) === []', () => {
    expect(lag<number, number>(delta)([])).toEqual([]);
  });

  test('[1, 2, 4, 8] |> lag(pair) === [[1, 2], [2, 4], [4, 8]]', () => {
    expect(
      lag<number, ReadonlyArray<number>>((current, next) => [current, next])(
        input,
      ),
    ).toEqual([
      [1, 2],
      [2, 4],
      [4, 8],
    ]);
  });

  test('call the iteratee callback with correct inputs', () => {
    const cb = vi.fn(delta);
    const link = { fake: 'fake' };
    lag<number, number>(cb)(input, link);
    expect(cb.mock.calls.length).toBe(input.length - 1);
    cb.mock.calls.forEach((call, index) => {
      expect(call[0]).toBe(input[index]);
      expect(call[1]).toBe(input[1 + index]);
      expect(call[2]).toBe(index);
      expect(call[3]).toEqual(input);
      expect(call[4]).toBe(link);
    });
  });
});
