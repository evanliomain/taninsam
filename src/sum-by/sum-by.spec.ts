import { sumBy } from './sum-by';

describe('sumBy function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    sumBy<number>(x => x)(input);
    expect(input).toMatchSnapshot();
  });

  test('[{ a:1 }, { a:2 }, { a:3 }, { a:4 }] |> sumBy === 10', () => {
    expect(
      sumBy<{ a: number }>(x => x.a)([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }])
    ).toMatchSnapshot();
  });

  test('call the iteree callback with correct inputs', () => {
    const cb = jest.fn((x: number) => x);
    const link = { fake: 'fake' };
    sumBy<number>(cb)(input, link);
    input.forEach((i, index) => {
      expect(cb.mock.calls[index][0]).toBe(i);
      expect(cb.mock.calls[index][1]).toBe(index);
      expect(cb.mock.calls[index][2]).toEqual(input);
      expect(cb.mock.calls[index][3]).toBe(link);
    });
  });
});
