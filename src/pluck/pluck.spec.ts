import { pluck } from './pluck';

describe('pluck function', () => {
  const input = { a: 1, b: 'B', c: true };

  test('is a pure function', () => {
    pluck()(input);
    expect(input).toMatchSnapshot();
  });

  test("{ a: 1, b: 'B', c: true } |> pluck('a', 'c') === { a: 1, c: true }", () => {
    expect(
      pluck<{ a: number; b: string; c: boolean }, 'a' | 'c'>('a', 'c')(input)
    ).toMatchSnapshot();
  });
});
