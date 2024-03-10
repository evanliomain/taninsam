import { describe, expect, test } from 'vitest';
import { pop } from './pop';

describe('pop function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    pop()(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> pop === [1, 2, 3, 4]', () => {
    expect(pop()(input)).toMatchSnapshot();
  });

  test('[1] |> pop === []', () => {
    expect(pop()([1])).toMatchSnapshot();
  });

  test('[] |> pop === []', () => {
    expect(pop()([])).toMatchSnapshot();
  });
});
