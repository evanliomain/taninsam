import { arrayFromValue } from './array-from-value';

describe('arrayFromValue function', () => {
  const input = 'a';

  test('is a pure function', () => {
    arrayFromValue(2)(input);
    expect(input).toMatchSnapshot();
  });

  test('"a" |> arrayFromValue(5) === ["a", "a", "a", "a", "a"]', () => {
    expect(arrayFromValue(5)('a')).toMatchSnapshot();
  });

  test('"a" |> arrayFromValue(5) have a lenght of 5', () => {
    expect(arrayFromValue(5)('a').length).toMatchSnapshot();
  });

  test('"a" |> arrayFromValue(5) have always the same value "a"', () => {
    arrayFromValue(5)('a').forEach(value => expect(value).toMatchSnapshot());
  });
});
