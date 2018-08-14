import { isObject } from './isObject';

describe('isObject function', () => {
  const input = { a: 1 };

  test('is a pure function', () => {
    isObject(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2] |> isObject === false', () => {
    expect(isObject([1, 2])).toBeFalsy();
  });

  test('[] |> isObject === false', () => {
    expect(isObject([])).toBeFalsy();
  });

  test('"abba" |> isObject === false', () => {
    expect(isObject('abba')).toBeFalsy();
  });

  test('1 |> isObject === false', () => {
    expect(isObject(1)).toBeFalsy();
  });

  test('true |> isObject === false', () => {
    expect(isObject(true)).toBeFalsy();
  });

  test('{ a: 1 } |> isObject === true', () => {
    expect(isObject({ a: 1 })).toBeTruthy();
  });

  test('{} |> isObject === true', () => {
    expect(isObject({})).toBeTruthy();
  });
});
