import { minBy } from './minBy';

type Test = { x: number; y: number };

describe('minBy function', () => {
  const input: ReadonlyArray<Test> = [
    { x: 1, y: 5 },
    { x: 1, y: 4 },
    { x: 2, y: 4 },
    { x: 3, y: 3 },
    { x: 4, y: 2 },
    { x: 3, y: 2 }
  ];

  test('is a pure function', () => {
    minBy<Test>(e => e.x)(input);
    expect(input).toMatchSnapshot();
  });

  test('[{ x, y }] |> minBy(e => e.x) === min by x', () => {
    expect(minBy<Test>(e => e.x)(input)).toEqual({ x: 1, y: 5 });
  });

  test('[{ x, y }] |> minBy(e => e.y) === min by y', () => {
    expect(minBy<Test>(e => e.y)(input)).toEqual({ x: 4, y: 2 });
  });

  test('[{ x, y }] 1 element |> minBy(e => e.x or e => e.y) === first element', () => {
    expect(minBy<Test>(e => e.x)([{ x: 1, y: 5 }])).toEqual({ x: 1, y: 5 });
    expect(minBy<Test>(e => e.y)([{ x: 1, y: 5 }])).toEqual({ x: 1, y: 5 });
  });

  test('[] |> minBy() === undefined', () => {
    expect(minBy<Test>(e => e.x)([])).toBeUndefined();
  });
});
