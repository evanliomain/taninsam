import { describe, expect, test } from 'vitest';
import { join } from './join';

describe('join function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    join()(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> join === 1,2,3,4,5', () => {
    expect(join()(input)).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> join("/") === 1/2/3/4/5', () => {
    expect(join('/')(input)).toMatchSnapshot();
  });

  test('[] |> join === ""', () => {
    expect(join()([])).toMatchSnapshot();
  });
});
