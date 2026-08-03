import { describe, expect, test, vi } from 'vitest';
import { mapMatrix } from './map-matrix';

describe('mapMatrix function', () => {
  const input = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  const incr: (cell: number) => number = cell => 1 + cell;

  test('is a pure function', () => {
    mapMatrix<number, number>(incr)(input);
    expect(input).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  test('[[1, 2, 3], [4, 5, 6]] |> mapMatrix(incr)', () => {
    expect(mapMatrix<number, number>(incr)(input)).toEqual([
      [2, 3, 4],
      [5, 6, 7],
    ]);
  });

  test('[[1, 2], [3, 4]] |> mapMatrix((cell, x, y) => `${x},${y}=${cell}`)', () => {
    expect(
      mapMatrix<number, string>((cell, x, y) => `${x},${y}=${cell}`)([
        [1, 2],
        [3, 4],
      ]),
    ).toEqual([
      ['0,0=1', '1,0=2'],
      ['0,1=3', '1,1=4'],
    ]);
  });

  test('x is the index in the row, y the index of the row', () => {
    expect(
      mapMatrix<number, string>((cell, x, y) => `${cell}${x}${y}`)(input),
    ).toEqual([
      ['100', '210', '320'],
      ['401', '511', '621'],
    ]);
  });

  test('[] |> mapMatrix(incr) === []', () => {
    expect(mapMatrix<number, number>(incr)([])).toEqual([]);
  });

  test('[[]] |> mapMatrix(incr) === [[]]', () => {
    expect(mapMatrix<number, number>(incr)([[]])).toEqual([[]]);
  });

  test('[[1], [2, 3], []] |> mapMatrix(incr) === [[2], [3, 4], []]', () => {
    expect(mapMatrix<number, number>(incr)([[1], [2, 3], []])).toEqual([
      [2],
      [3, 4],
      [],
    ]);
  });

  test('returns new rows, never the input ones', () => {
    const output = mapMatrix<number, number>(cell => cell)(input);
    expect(output).not.toBe(input);
    expect(output[0]).not.toBe(input[0]);
  });

  test('call the iteratee callback with correct inputs', () => {
    const cb = vi.fn((cell: number, x: number, y: number) => cell + x + y);
    const link = { fake: 'fake' };
    mapMatrix<number, number>(cb)(input, link);
    expect(cb.mock.calls.length).toBe(6);
    input.forEach((row, y) =>
      row.forEach((cell, x) => {
        const call = cb.mock.calls[x + y * row.length];
        expect(call[0]).toBe(cell);
        expect(call[1]).toBe(x);
        expect(call[2]).toBe(y);
        expect(call[3]).toEqual(input);
        expect(call[4]).toBe(link);
      }),
    );
  });
});
