import { shift } from './shift';

describe('shift function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    shift()(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> shift === [2, 3, 4, 5]', () => {
    expect(shift()(input)).toMatchSnapshot();
  });

  test('[] |> shift === []', () => {
    expect(shift()([])).toMatchSnapshot();
  });
});
