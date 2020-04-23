import { mapMatrix } from './map-matrix';

describe('mapMatrix function', () => {
  const input = [[1, 2], [3, 4]];

  test('is a pure function', () => {
    mapMatrix(x => x)(input);
    expect(input).toMatchSnapshot();
  });

  test('[] |> mapMatrix === []', () => {
    expect(mapMatrix(x => x)([])).toEqual([]);
  });
  test('[[]] |> mapMatrix === [[]]', () => {
    expect(mapMatrix(x => x)([[]])).toEqual([[]]);
  });
  test('[[1, 4, 2], [1, 1, 3]] |> mapMatrix(x => 1 === x ? "." : "-") === [[".", "-", "-"], [".", ".", "-"]]', () => {
    expect(
      mapMatrix(x => (1 === x ? '.' : '-'))([[1, 4, 2], [1, 1, 3]])
    ).toEqual([['.', '-', '-'], ['.', '.', '-']]);
  });

  test('[[0, 0, 0], [0, 0, 0]] |> mapMatrix((element, x, y) => x  + "-" + y) === [["0-0", "1-0", "2-0",], ["0-1", "1-1", "2-1",]]', () => {
    expect(mapMatrix((_, x, y) => `${x}-${y}`)([[0, 0, 0], [0, 0, 0]]))
      .toMatchInlineSnapshot(`
      Array [
        Array [
          "0-0",
          "1-0",
          "2-0",
        ],
        Array [
          "0-1",
          "1-1",
          "2-1",
        ],
      ]
    `);
  });
});
