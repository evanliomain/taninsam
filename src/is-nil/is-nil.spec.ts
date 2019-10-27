import { isNil } from './is-nil';

describe('isNil function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    isNil(input);
    expect(input).toMatchSnapshot();
  });

  test('undefined |> isNil === true', () => {
    expect(isNil(undefined)).toBe(true);
  });
  test('null |> isNil === true', () => {
    expect(isNil(null)).toBe(true);
  });
  test('[] |> isNil === false', () => {
    expect(isNil([])).toBe(false);
  });
  test('{} |> isNil === false', () => {
    expect(isNil({})).toBe(false);
  });
  test('"" |> isNil === false', () => {
    expect(isNil('')).toBe(false);
  });
  test('0 |> isNil === false', () => {
    expect(isNil(0)).toBe(false);
  });
  test('[0] |> isNil === false', () => {
    expect(isNil([0])).toBe(false);
  });
  test('"TEST" |> isNil === false', () => {
    expect(isNil('TEST')).toBe(false);
  });
});
