import { describe, expect, test, vi } from 'vitest';
import { filterUntil } from './filter-until';

describe('filterUntil function', () => {
  const input = [1, 2, 3, 4, 1, 2];
  const isSmall: (x: number) => boolean = x => x < 3;

  test('is a pure function', () => {
    filterUntil<number>(isSmall)(input);
    expect(input).toEqual([1, 2, 3, 4, 1, 2]);
  });

  test('[1, 2, 3, 4, 1, 2] |> filterUntil(x => x < 3) === [3, 4, 1, 2]', () => {
    expect(filterUntil<number>(isSmall)(input)).toEqual([3, 4, 1, 2]);
  });

  test('[1, 2, 3] |> filterUntil(x => x < 10) === []', () => {
    expect(filterUntil<number>(x => x < 10)([1, 2, 3])).toEqual([]);
  });

  test('[1, 2, 3] |> filterUntil(x => 10 < x) === [1, 2, 3]', () => {
    expect(filterUntil<number>(x => 10 < x)([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('[1] |> filterUntil(x => x < 3) === []', () => {
    expect(filterUntil<number>(isSmall)([1])).toEqual([]);
  });

  test('[5] |> filterUntil(x => x < 3) === [5]', () => {
    expect(filterUntil<number>(isSmall)([5])).toEqual([5]);
  });

  test('[] |> filterUntil(x => x < 3) === []', () => {
    expect(filterUntil<number>(isSmall)([])).toEqual([]);
  });

  test('returns a new array, never the input itself', () => {
    expect(filterUntil<number>(x => 10 < x)(input)).not.toBe(input);
  });

  test('stops calling the predicate on the first failure', () => {
    const cb = vi.fn(isSmall);
    const link = { fake: 'fake' };
    filterUntil<number>(cb)(input, link);
    expect(cb.mock.calls.length).toBe(3);
    cb.mock.calls.forEach((call, index) => {
      expect(call[0]).toBe(input[index]);
      expect(call[1]).toBe(index);
      expect(call[2]).toEqual(input);
      expect(call[3]).toBe(link);
    });
  });
});
