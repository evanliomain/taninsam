import { reduce } from './reduce';

describe('reduce function', () => {
  const input = [1, 2, 3, 4, 5];
  const sum = (a: number, b: number): number => a + b;

  test('is a pure function', () => {
    reduce(sum, 0)(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> reduce(sum, 0) === 15', () => {
    expect(reduce(sum, 0)(input)).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> reduce(sum) === 15', () => {
    expect(reduce(sum)(input)).toMatchSnapshot();
  });
});
