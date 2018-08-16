import { triangular } from './triangular';

describe('triangular function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    triangular()(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> triangular === [[1], [1, 2], [1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5]]', () => {
    expect(triangular()(input)).toEqual([
      [1],
      [1, 2],
      [1, 2, 3],
      [1, 2, 3, 4],
      [1, 2, 3, 4, 5]
    ]);
  });
});
