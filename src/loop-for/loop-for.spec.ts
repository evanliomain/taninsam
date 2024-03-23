import { describe, expect, test } from 'vitest';
import { map } from '../map';
import { loopFor } from './loop-for';

describe('loopFor function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    loopFor<ReadonlyArray<number>>(5, array =>
      map<number, number>(x => 1 + x)(array),
    )(input);
    expect(input).toMatchSnapshot();
  });

  test('increment a number', () => {
    expect(loopFor<number>(5, x => 1 + x)(1)).toBe(6);
  });

  test('sum even square', () => {
    expect(
      loopFor<number>({ start: 2, stop: 10, step: 2 }, (x, i) => x + i ** 2)(0),
    ).toBe(120);
  });
});
