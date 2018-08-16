import { toObject } from './toObject';

describe('toObject function', () => {
  const input = [['a', 1], ['b', 'c']];

  test('is a pure function', () => {
    toObject(x => `${x}`, x => x)(input);
    expect(input).toMatchSnapshot();
  });

  test("[['a', 1], ['b', 'c']] |> toObject(key => key, value => value + value) === {a: 1, b: 'c'}", () => {
    expect(toObject(item => item[0], item => item[1])(input)).toEqual({
      a: 1,
      b: 'c'
    });
  });
});
