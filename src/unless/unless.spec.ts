import { unless } from './unless';
import { map } from '../map';

describe('unless function', () => {
  const input = [1, 2, 3, 4, 5];
  const transform = map<number, number>(x => 1 + x);
  const predicat = array => 0 === array.length;

  test('is a pure function', () => {
    unless(predicat, transform)(input);
    expect(input).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> unless(0 === length, map x => 1 + x) ===  [2, 3, 4, 5, 6]', () => {
    expect(unless(predicat, transform)(input)).toMatchSnapshot();
  });

  test('[1, 2, 3, 4, 5] |> unless(0 !== length, map x => 1 + x) ===  [1, 2, 3, 4, 5]', () => {
    expect(unless(x => !predicat(x), transform)(input)).toMatchSnapshot();
  });
});
