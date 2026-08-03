import { describe, expect, test, vi } from 'vitest';
import { lagCircular } from './lag-circular';

describe('lagCircular function', () => {
  const input = [1, 2, 4, 8];
  const delta: (current: number, next: number) => number = (current, next) =>
    next - current;

  test('is a pure function', () => {
    lagCircular<number, number>(delta)(input);
    expect(input).toEqual([1, 2, 4, 8]);
  });

  test('[1, 2, 4, 8] |> lagCircular(delta) === [1, 2, 4, -7]', () => {
    expect(lagCircular<number, number>(delta)(input)).toEqual([1, 2, 4, -7]);
  });

  test('[1, 2] |> lagCircular(delta) === [1, -1]', () => {
    expect(lagCircular<number, number>(delta)([1, 2])).toEqual([1, -1]);
  });

  test('[1] |> lagCircular(sum) === [2]', () => {
    expect(
      lagCircular<number, number>((current, next) => current + next)([1]),
    ).toEqual([2]);
  });

  test('[] |> lagCircular(delta) === []', () => {
    expect(lagCircular<number, number>(delta)([])).toEqual([]);
  });

  test('[1, 2, 4] |> lagCircular(pair) === [[1, 2], [2, 4], [4, 1]]', () => {
    expect(
      lagCircular<number, ReadonlyArray<number>>((current, next) => [
        current,
        next,
      ])([1, 2, 4]),
    ).toEqual([
      [1, 2],
      [2, 4],
      [4, 1],
    ]);
  });

  test('call the iteratee callback with correct inputs', () => {
    const cb = vi.fn(delta);
    const link = { fake: 'fake' };
    lagCircular<number, number>(cb)(input, link);
    expect(cb.mock.calls.length).toBe(input.length);
    cb.mock.calls.forEach((call, index) => {
      expect(call[0]).toBe(input[index]);
      expect(call[1]).toBe(input[(1 + index) % input.length]);
      expect(call[2]).toBe(index);
      expect(call[3]).toEqual(input);
      expect(call[4]).toBe(link);
    });
  });
});
