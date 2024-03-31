import { describe, expect, test } from 'vitest';
import { toObject } from './to-object';

describe('toObject function', () => {
  const input: [string, number | string][] = [
    ['a', 1],
    ['b', 'c'],
  ];

  test('is a pure function', () => {
    toObject(
      x => `${x}`,
      x => x,
    )(input);
    expect(input).toMatchSnapshot();
  });

  test("[['a', 1], ['b', 'c']] |> toObject(item => item[0], item => item[1]) === {a: 1, b: 'c'}", () => {
    expect(
      toObject<[string, number | string], string | number>(
        item => item[0],
        item => item[1],
      )(input),
    ).toMatchSnapshot();
  });
});
