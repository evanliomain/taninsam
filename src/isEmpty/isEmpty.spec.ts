import { isEmpty } from './isEmpty';

describe('isEmpty function', () => {
  const input = [1, 2, 3, 4, 5];

  test('is a pure function', () => {
    isEmpty(input);
    expect(input).toMatchSnapshot();
  });

  test('undefined |> isEmpty === true', () => {
    expect(isEmpty(undefined)).toBe(true);
  });
  test('null |> isEmpty === true', () => {
    expect(isEmpty(null)).toBe(true);
  });
  test('[] |> isEmpty === true', () => {
    expect(isEmpty([])).toBe(true);
  });
  test('{} |> isEmpty === true', () => {
    expect(isEmpty({})).toBe(true);
  });
  test('"" |> isEmpty === true', () => {
    expect(isEmpty('')).toBe(true);
  });
  test('0 |> isEmpty === false', () => {
    expect(isEmpty(0)).toBe(false);
  });
  test('[0] |> isEmpty === false', () => {
    expect(isEmpty([0])).toBe(false);
  });
  test('"TEST" |> isEmpty === false', () => {
    expect(isEmpty('TEST')).toBe(false);
  });
});
