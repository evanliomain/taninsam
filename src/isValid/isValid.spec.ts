import { isValid } from './isValid';

describe('isValid function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    isValid(input);
    expect(input).toMatchSnapshot();
  });

  test('undefined |> isValid === false', () => {
    expect(isValid(undefined)).toBe(false);
  });
  test('null |> isValid === false', () => {
    expect(isValid(null)).toBe(false);
  });
  test('[] |> isValid === true', () => {
    expect(isValid([])).toBe(true);
  });
  test('{} |> isValid === true', () => {
    expect(isValid({})).toBe(true);
  });
  test('"" |> isValid === true', () => {
    expect(isValid('')).toBe(true);
  });
  test('0 |> isValid === true', () => {
    expect(isValid(0)).toBe(true);
  });
  test('[0] |> isValid === true', () => {
    expect(isValid([0])).toBe(true);
  });
  test('"TEST" |> isValid === true', () => {
    expect(isValid('TEST')).toBe(true);
  });
});
