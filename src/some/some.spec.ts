import { some } from './some';

describe('some function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    some((x: number): boolean => x < 3)(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> some === true', () => {
    expect(some((x: number): boolean => x < 3)(input)).toMatchSnapshot();
  });
});
