import { head } from './head';

describe('head function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function with array', () => {
    head()(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> head === 1', () => {
    expect(head()(input)).toMatchSnapshot();
  });

  test('[] |> head === undefined', () => {
    expect(head()([])).toMatchSnapshot();
  });
});
