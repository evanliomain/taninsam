import { max } from './max';

describe('max function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    max()(input);
    expect(input).toMatchSnapshot();
  });

  test('[10, 12, 15, 9] |> max === 15', () => {
    expect(max()([10, 12, 15, 9])).toBe(15);
  });
});
