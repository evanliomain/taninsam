import { isBoolean } from './is-boolean';

describe('isBoolean function', () => {
  const input = true;

  test('is a pure function', () => {
    isBoolean(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2] |> isBoolean === false', () => {
    expect(isBoolean([1, 2])).toBeFalsy();
  });

  test('[] |> isBoolean === false', () => {
    expect(isBoolean([])).toBeFalsy();
  });

  test('"abba" |> isBoolean === false', () => {
    expect(isBoolean('abba')).toBeFalsy();
  });

  test('1 |> isBoolean === false', () => {
    expect(isBoolean(1)).toBeFalsy();
  });

  test('true |> isBoolean === true', () => {
    expect(isBoolean(true)).toBeTruthy();
  });

  test('false |> isBoolean === true', () => {
    expect(isBoolean(false)).toBeTruthy();
  });

  test('{ a: 1 } |> isBoolean === false', () => {
    expect(isBoolean({ a: 1 })).toBeFalsy();
  });
});
