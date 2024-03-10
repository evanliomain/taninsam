import { describe, expect, test } from 'vitest';
import { push } from './push';

describe('push function', () => {
  const input = [1, 2, 3];

  test('is a pure function', () => {
    push()(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3] |> push(4, 5) === [1, 2, 3, 4, 5]', () => {
    expect(push(4, 5)(input)).toMatchSnapshot();
  });

  test('[] |> push(4, 5) === [4, 5]', () => {
    expect(push(4, 5)([])).toMatchSnapshot();
  });
});
