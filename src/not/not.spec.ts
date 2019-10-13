import { map } from '../map';
import { not } from './not';

describe('not function', () => {
  const input = [1, 2, 3, 4, 5];
  const isEven = (x: number): boolean => 0 === x % 2;

  test('is a pure function', () => {
    map(not(isEven))(input);
    expect(input).toMatchSnapshot();
  });

  test('1 |> not === 1', () => {
    expect(not(isEven)(1)).toBe(true);
  });

  test('x |> not(predicat) calls the predicat', () => {
    const predicat = jest.fn().mockReturnValue(true);
    not(predicat)('foo');
    expect(predicat).toHaveBeenCalledWith('foo');
  });
});
