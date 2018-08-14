import { reverse } from './reverse';

describe('reverse function', () => {
  const inputArray = [1, 2, 3, 4, 5];
  const inputString = 'azertyuiop';

  test('is a pure function with array', () => {
    reverse()(inputArray);
    expect(inputArray).toMatchSnapshot();
  });

  test('is a pure function with string', () => {
    reverse()(inputString);
    expect(inputString).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> reverse === [5, 4, 3, 2, 1]', () => {
    expect(reverse()(inputArray)).toMatchSnapshot();
  });

  test('"azertyuiop" |> reverse === "poiuytreza"', () => {
    expect(reverse()(inputString)).toMatchSnapshot();
  });

  test('[] |> reverse === []', () => {
    expect(reverse()([])).toMatchSnapshot();
  });

  test('"" |> reverse === ""', () => {
    expect(reverse()('')).toMatchSnapshot();
  });
});
