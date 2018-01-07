import { chainFn } from './chainFn';

describe('chainFn function', () => {
  beforeEach(() => {
    console.group = jest.fn();
    console.groupEnd = jest.fn();
    console.table = jest.fn();
    console.log = jest.fn();
  });

  test('by function', () => {
    const mapFn = jest.fn(array => array.map((x: number) => x + 1));
    const filterFn = jest.fn(array => array.filter((x: number) => 0 === x % 2));

    const chainResult = chainFn(mapFn)
      .chain(filterFn)
      .value();

    const result = chainResult([1, 2, 3, 4]);

    expect(mapFn.mock.calls.length).toBe(1);
    expect(filterFn.mock.calls.length).toBe(1);
    expect(mapFn.mock.calls[0][0]).toEqual([1, 2, 3, 4]);
    expect(filterFn.mock.calls[0][0]).toEqual([2, 3, 4, 5]);
    expect(result).toEqual([2, 4]);
  });

  test('by function with links', () => {
    const mapFn = jest.fn((array, _) => {
      return array.map((x: number) => x + 1);
    });
    const filterFn = jest.fn((array, _) => {
      return array.filter((x: number) => 0 === x % 2);
    });
    const doubleFn = jest.fn((array, _) => {
      return array.map((x: number) => 2 * x);
    });
    const printRatio = jest.fn((array, links) => {
      return `${array.length}/${links.total.length}`;
    });

    const chainResult = chainFn(mapFn)
      .link('total')
      .chain(filterFn)
      .chain(doubleFn)
      .chain(printRatio)
      .value()([1, 2, 3, 4]);

    expect(chainResult).toMatchSnapshot();
  });

  describe('log chainFn', () => {
    test('with array', () => {
      const mapFn = jest.fn((array, _) => {
        return array.map((x: number) => x + 1);
      });
      const filterFn = jest.fn((array, _) => {
        return array.filter((x: number) => 0 === x % 2);
      });
      const doubleFn = jest.fn((array, _) => {
        console.log('doubleFn', array);

        return array.map((x: number) => 2 * x);
      });
      const printRatio = jest.fn((array, links) => {
        return `${array.length}/${links.total.length}`;
      });

      const chainResult = chainFn(mapFn)
        .log('maped')
        .link('total')
        .chain(filterFn)
        .log('filtered')
        .chain(doubleFn)
        .chain(printRatio)
        .value()([1, 2, 3, 4]);

      expect(console.group).toBeCalled();
      expect(console.table).toBeCalled();
      expect(console.groupEnd).toBeCalled();
      expect(chainResult).toMatchSnapshot();
    });

    test('with object', () => {
      chainFn(x => x)
        .log('test')
        .value()('test');
      expect(console.group).toBeCalled();
      expect(console.log).toBeCalled();
      expect(console.groupEnd).toBeCalled();
    });
  });
});
