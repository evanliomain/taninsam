import { describe, expect, test } from 'vitest';
import { unshift } from './unshift';

describe('unshift function', () => {
  const input = [1, 2, 3];

  test('is a pure function', () => {
    unshift()(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3] |> unshift(4, 5) === [4, 5, 1, 2, 3]', () => {
    expect(unshift(4, 5)(input)).toMatchSnapshot();
  });

  test('[] |> unshift(4, 5) === [4, 5]', () => {
    expect(unshift(4, 5)([])).toMatchSnapshot();
  });
});
