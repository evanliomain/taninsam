import { isEqualObjectOn } from './is-equal-object-on';

describe('isEqualObjectOn function', () => {
  const input1 = { a: 1, b: 2, c: 3 };
  const input2 = { a: 1, b: 2, c: 4 };
  const mapping = ['a', 'b'];

  test('is a pure function', () => {
    isEqualObjectOn(mapping)(input1)(input2);
    expect(input1).toMatchSnapshot();
    expect(input2).toMatchSnapshot();
  });

  test('{ a: 1, b: 2, c: 4 } |> isEqualObjectOn(["a", "b"])({ a: 1, b: 2, c: 3 }) === true', () => {
    expect(isEqualObjectOn(mapping)(input1)(input2)).toBeTruthy();
  });

  test('{ a: 1, b: 2, c: 4 } |> isEqualObjectOn(["a", "b", "c"])({ a: 1, b: 2, c: 3 }) === true', () => {
    expect(isEqualObjectOn(['a', 'b', 'c'])(input1)(input2)).toBeFalsy();
  });
});
