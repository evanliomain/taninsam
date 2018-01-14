import { isNumber } from './isNumber';

describe('isNumber function', () => {
  const input = 1;

  test('is a pure function', () => {
    isNumber(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2] |> isNumber === false', () => {
    expect(isNumber([1, 2])).toBeFalsy();
  });

  test('[] |> isNumber === false', () => {
    expect(isNumber([])).toBeFalsy();
  });

  test('"abba" |> isNumber === false', () => {
    expect(isNumber('abba')).toBeFalsy();
  });

  test('1 |> isNumber === true', () => {
    expect(isNumber(1)).toBeTruthy();
  });

  test('0 |> isNumber === true', () => {
    expect(isNumber(0)).toBeTruthy();
  });

  test('-1 |> isNumber === true', () => {
    expect(isNumber(0)).toBeTruthy();
  });

  test('3.14 |> isNumber === true', () => {
    expect(isNumber(3.14)).toBeTruthy();
  });

  test('true |> isNumber === false', () => {
    expect(isNumber(true)).toBeFalsy();
  });

  test('{ a: 1 } |> isNumber === false', () => {
    expect(isNumber({ a: 1 })).toBeFalsy();
  });
});
