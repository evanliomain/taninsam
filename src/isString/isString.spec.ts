import { isString } from './isString';

describe('isString function', () => {
  const input = 'abba';

  test('is a pure function', () => {
    isString(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2] |> isString === false', () => {
    expect(isString([1, 2])).toBeFalsy();
  });

  test('[] |> isString === false', () => {
    expect(isString([])).toBeFalsy();
  });

  test('"abba" |> isString === true', () => {
    expect(isString('abba')).toBeTruthy();
  });

  test('1 |> isString === true', () => {
    expect(isString(1)).toBeFalsy();
  });

  test('true |> isString === false', () => {
    expect(isString(true)).toBeFalsy();
  });

  test('{ a: 1 } |> isString === false', () => {
    expect(isString({ a: 1 })).toBeFalsy();
  });
});
