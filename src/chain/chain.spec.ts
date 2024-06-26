import { beforeEach, describe, expect, test, vi } from 'vitest';
import { chain } from './chain';

describe('chain function', () => {
  beforeEach(() => {
    console.group = vi.fn();
    console.groupEnd = vi.fn();
    console.table = vi.fn();
    console.log = vi.fn();
  });

  test('by value', () => {
    const mapFn = vi.fn(array => array.map((x: number) => x + 1));
    const filterFn = vi.fn(array => array.filter((x: number) => 0 === x % 2));

    const chainResult = chain([1, 2, 3, 4])
      .chain(mapFn)
      .chain(filterFn)
      .value();

    expect(mapFn.mock.calls.length).toBe(1);
    expect(filterFn.mock.calls.length).toBe(1);
    expect(mapFn.mock.calls[0][0]).toEqual([1, 2, 3, 4]);
    expect(filterFn.mock.calls[0][0]).toEqual([2, 3, 4, 5]);
    expect(chainResult).toEqual([2, 4]);
  });

  test('by value with links', () => {
    const mapFn = vi.fn((array, _) => array.map((x: number) => x + 1));
    const filterFn = vi.fn((array, _) =>
      array.filter((x: number) => 0 === x % 2),
    );
    const printRatio = vi.fn(
      (array, links) => `${array.length}/${links.total.length}`,
    );

    const chainResult = chain<number[]>([1, 2, 3, 4])
      .chain(mapFn)
      .link('total')
      .chain(filterFn)
      .chain(printRatio)
      .value();

    expect(chainResult).toBe('2/4');
  });

  describe('log chain', () => {
    test('with array', () => {
      chain([1, 2, 3, 4]).log('test').value();
      expect(console.group).toBeCalled();
      expect(console.table).toBeCalled();
      expect(console.groupEnd).toBeCalled();
    });

    test('with object', () => {
      chain('test').log('test').value();
      expect(console.group).toBeCalled();
      expect(console.log).toBeCalled();
      expect(console.groupEnd).toBeCalled();
    });
  });
});
