import { describe, expect, test } from 'vitest';
import { take } from './take';

describe('take function', () => {
  const inputArray = [1, 2, 3, 4, 5];
  const inputString = 'abba';

  test('is a pure function with array', () => {
    take(2)(inputArray);
    expect(inputArray).toMatchSnapshot();
  });

  test('is a pure function with string', () => {
    take(2)(inputString);
    expect(inputString).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> take(2) === [1, 2]', () => {
    expect(take(2)(inputArray)).toMatchSnapshot();
  });

  test('[1, 2] |> take(3) === [1, 2]', () => {
    expect(take(3)([1, 2])).toMatchSnapshot();
  });

  test('[1, 2] |> take(0) === []', () => {
    expect(take(0)([1, 2])).toMatchSnapshot();
  });

  test('"abba" |> take(2) === "ab"', () => {
    expect(take(2)(inputString)).toMatchSnapshot();
  });

  test('"ab" |> take(3) === "ab"', () => {
    expect(take(3)('ab')).toMatchSnapshot();
  });

  test('"abba" |> take(0) === ""', () => {
    expect(take(0)(inputString)).toMatchSnapshot();
  });
});
