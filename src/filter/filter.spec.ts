import { describe, expect, test, vi } from 'vitest';
import { filter } from './filter';
import { Links } from '../@types';

describe('filter function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    filter<number>((x: number) => 0 === x % 2)(input);
    expect(input).toMatchSnapshot();
  });

  test('keep even [1, 2, 3, 4, 5] |> filter === [2, 4]', () => {
    expect(filter<number>((x: number) => 0 === x % 2)(input)).toMatchSnapshot();
  });

  test('call the iteree callback with correct inputs', () => {
    const cb = vi.fn(() => true);
    const link: Links = { fake: 'fake' };
    filter<number>(cb)(input, link);
    input.forEach((i, index) => {
      expect(cb.mock.calls[index][0]).toBe(i);
      expect(cb.mock.calls[index][1]).toBe(index);
      expect(cb.mock.calls[index][2]).toEqual(input);
      expect(cb.mock.calls[index][3]).toBe(link);
    });
  });
});
