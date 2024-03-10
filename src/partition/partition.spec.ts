import { describe, expect, test } from 'vitest';
import { partition } from './partition';

describe('partition function', () => {
  const input1 = [
    { a: 1, b: 1 },
    { a: 1, b: 2 },
    { a: 2, b: 1 },
    { a: 2, b: 2 }
  ];
  const input2 = [1.1, 1.5, 2.1, 2.3, 2.8, 3, 4.12];

  test('is a pure function', () => {
    partition<{ a: number; b: number }, number>(x => x.a)(input1);
    expect(input1).toMatchSnapshot();
  });

  test(
    '[{ a: 1, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 1 }, { a: 2, b: 2 }]' +
      ' |> partition(x => x.a) === [[{ a: 1, b: 1}, { a: 1, b: 2 }],[{ a: 2, b: 1 }, { a: 2, b: 2 }]]',
    () => {
      expect(
        partition<{ a: number; b: number }, number>(x => x.a)(input1)
      ).toMatchSnapshot();
    }
  );

  test(
    '[{ a: 1, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 1 }, { a: 2, b: 2 }]' +
      ' |> partition(x => x.b) === [[{ a: 1, b: 1}, { a: 1, b: 2 }],[{ a: 2, b: 1 }, { a: 2, b: 2 }]]',
    () => {
      expect(
        partition<{ a: number; b: number }, number>(x => x.b)(input1)
      ).toMatchSnapshot();
    }
  );

  test(
    '[1.1, 1.5, 2.1, 2.3, 2.8, 3, 4.12]' +
      ' |> partition(Math.floor) === [[1.1, 1.5],[2.1, 2.3, 2.8],[3],[4.12]]',
    () => {
      expect(partition<number, number>(Math.floor)(input2)).toMatchSnapshot();
    }
  );
});
