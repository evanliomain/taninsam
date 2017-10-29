import { filter } from './filter';

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
    const cb = jest.fn((x: number) => true);
    const link = { fake: 'fake' };
    filter<number>(cb, link)(input);
    input.forEach((i, index) => {
      expect(cb.mock.calls[index][0]).toBe(i);
      expect(cb.mock.calls[index][1]).toBe(index);
      expect(cb.mock.calls[index][2]).toEqual(input);
      expect(cb.mock.calls[index][3]).toBe(link);
    });
  });
});
