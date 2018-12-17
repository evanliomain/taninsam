import { fromEntries } from './fromEntries';

describe('fromEntries function', () => {
  const input: ReadonlyArray<[string, any]> = [['a', 1], ['b', 'c']];

  test('is a pure function', () => {
    fromEntries()(input);
    expect(input).toMatchSnapshot();
  });

  test("[['a', 1], ['b', 'c']] |> fromEntries === {a: 1, b: 'c'}", () => {
    expect(fromEntries()(input)).toMatchSnapshot();
  });

  test('[] |> fromEntries === {}', () => {
    expect(fromEntries()([])).toMatchSnapshot();
  });
});
