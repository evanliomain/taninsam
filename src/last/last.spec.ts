import { last } from './last';

describe('last function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function with array', () => {
    last()(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> last === 5', () => {
    expect(last()(input)).toMatchSnapshot();
  });

  test('[] |> last === undefined', () => {
    expect(last()([])).toMatchSnapshot();
  });
});
