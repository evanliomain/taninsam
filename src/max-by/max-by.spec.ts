import { describe, expect, test } from 'vitest';
import { maxBy } from './max-by';

type Test = { x: number; y: number };

describe('maxBy function', () => {
  const input: ReadonlyArray<Test> = [
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 3 },
    { x: 4, y: 2 }
  ];

  test('is a pure function', () => {
    maxBy<Test>(e => e.x)(input);
    expect(input).toMatchSnapshot();
  });

  test('[{ x, y }] |> maxBy(e => e.x) === max by x', () => {
    expect(maxBy<Test>(e => e.x)(input)).toEqual({ x: 4, y: 2 });
  });

  test('[{ x, y }] |> maxBy(e => e.y) === max by y', () => {
    expect(maxBy<Test>(e => e.y)(input)).toEqual({ x: 1, y: 5 });
  });

  test('[{ x, y }] 1 element |> maxBy(e => e.x or e => e.y) === first element', () => {
    expect(maxBy<Test>(e => e.x)([{ x: 1, y: 5 }])).toEqual({ x: 1, y: 5 });
    expect(maxBy<Test>(e => e.y)([{ x: 1, y: 5 }])).toEqual({ x: 1, y: 5 });
  });

  test('[] |> maxBy() === undefined', () => {
    expect(maxBy<Test>(e => e.x)([])).toBeUndefined();
  });
});
