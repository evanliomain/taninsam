import { chunk } from './chunk';

describe('chunk function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    chunk(2)(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4] |> chunk(2) === [[1, 2], [3, 4]]', () => {
    expect(chunk<number>(2)([1, 2, 3, 4])).toEqual([[1, 2], [3, 4]]);
  });

  test('[1, 2, 3, 4, 5] |> chunk(2) === [[1, 2], [3, 4], [5]]', () => {
    expect(chunk<number>(2)([1, 2, 3, 4, 5])).toEqual([[1, 2], [3, 4], [5]]);
  });

  test('[1, 2, 3, 4] |> chunk() === [[1], [2], [3], [4]]', () => {
    expect(chunk<number>()([1, 2, 3, 4])).toEqual([[1], [2], [3], [4]]);
  });

  test('[1, 2, 3, 4] |> chunk(5) === [[1, 2, 3, 4]]', () => {
    expect(chunk<number>(5)([1, 2, 3, 4])).toEqual([[1, 2, 3, 4]]);
  });

  test('[1, 2, 3, 4] |> chunk(0) === []', () => {
    expect(chunk<number>(0)([1, 2, 3, 4])).toEqual([]);
  });

  test('[1, 2, 3, 4] |> chunk(-1) === []', () => {
    expect(chunk<number>(-1)([1, 2, 3, 4])).toEqual([]);
  });
});
