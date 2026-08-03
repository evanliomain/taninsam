import { describe, expect, test } from 'vitest';
import { chunk } from './chunk';

describe('chunk function', () => {
  const input = [1, 2, 3, 4, 5, 6];

  test('is a pure function', () => {
    chunk<number>(3)(input);
    expect(input).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('[1, 2, 3, 4, 5, 6] |> chunk(3) === [[1, 2, 3], [4, 5, 6]]', () => {
    expect(chunk<number>(3)(input)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  test('[1, 2, 3, 4] |> chunk(3) === [[1, 2, 3], [4]]', () => {
    expect(chunk<number>(3)([1, 2, 3, 4])).toEqual([[1, 2, 3], [4]]);
  });

  test('[1, 2, 3, 4, 5] |> chunk(3) === [[1, 2, 3], [4, 5]]', () => {
    expect(chunk<number>(3)([1, 2, 3, 4, 5])).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });

  test('[1, 2, 3] |> chunk(3) === [[1, 2, 3]]', () => {
    expect(chunk<number>(3)([1, 2, 3])).toEqual([[1, 2, 3]]);
  });

  test('[1, 2] |> chunk(3) === [[1, 2]]', () => {
    expect(chunk<number>(3)([1, 2])).toEqual([[1, 2]]);
  });

  test('[1, 2, 3] |> chunk(1) === [[1], [2], [3]]', () => {
    expect(chunk<number>(1)([1, 2, 3])).toEqual([[1], [2], [3]]);
  });

  test('[] |> chunk(3) === []', () => {
    expect(chunk<number>(3)([])).toEqual([]);
  });

  test('[1, 2, 3] |> chunk(0) === []', () => {
    expect(chunk<number>(0)([1, 2, 3])).toEqual([]);
  });

  test('[1, 2, 3] |> chunk(-1) === []', () => {
    expect(chunk<number>(-1)([1, 2, 3])).toEqual([]);
  });

  test('[] |> chunk(0) === []', () => {
    expect(chunk<number>(0)([])).toEqual([]);
  });

  test('never pads the last slice', () => {
    expect(chunk<number>(3)([1, 2, 3, 4])[1].length).toBe(1);
  });
});
