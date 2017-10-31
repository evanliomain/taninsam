import { map } from './map';

describe('map function', () => {
  const input = [1, 2, 3, 4, 5];
  const incr = x => 1 + x;

  test('is a pure function', () => {
    map(incr)(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> map(incr) === [2, 3, 4, 5, 6]', () => {
    expect(map(incr)(input)).toMatchSnapshot();
  });

  test('[ |> map(incr) === []', () => {
    expect(map(incr)([])).toMatchSnapshot();
  });

  test('call the iteree callback with correct inputs', () => {
    const cb = jest.fn((x: number) => 1 + x);
    const link = { fake: 'fake' };
    map<number, number>(cb)(input, link);
    input.forEach((i, index) => {
      expect(cb.mock.calls[index][0]).toBe(i);
      expect(cb.mock.calls[index][1]).toBe(index);
      expect(cb.mock.calls[index][2]).toEqual(input);
      expect(cb.mock.calls[index][3]).toBe(link);
    });
  });
});
