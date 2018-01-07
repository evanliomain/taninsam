import { values } from './values';

describe('values function', () => {
  const input = { a: 1, b: 2, c: 3 };

  test('is a pure function', () => {
    values()(input);
    expect(input).toMatchSnapshot();
  });

  test('{ a: 1, b: 2, c: 3 } |> values === [1, 2, 3]', () => {
    expect(values()(input)).toMatchSnapshot();
  });

  test('{} |> values === []', () => {
    expect(values()({})).toMatchSnapshot();
  });
});
