import { ifElse } from './ifElse';

describe('ifElse function', () => {
  const input = 1;
  const evenTransform = x => `${x} is even`;
  const oddTransform = x => `${x} is odd`;
  const isEven = x => 0 === x % 2;

  test('is a pure function', () => {
    ifElse(isEven, evenTransform, oddTransform)(input);
    expect(input).toMatchSnapshot();
  });

  test("1 |> ifElse(isEven, say it's even, say it's odd) === 1 is odd", () => {
    expect(ifElse(isEven, evenTransform, oddTransform)(1)).toMatchSnapshot();
  });

  test("2 |> ifElse(isEven, say it's even, say it's odd) === 2 is even", () => {
    expect(ifElse(isEven, evenTransform, oddTransform)(2)).toMatchSnapshot();
  });
});
