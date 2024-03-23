import { describe, expect, test } from 'vitest';
import { sort } from './sort';
import { ComparaisonResultChoice } from '../@types/comparaison-result-choice.enum';

describe('sort function', () => {
  const input = [5, 2, 8, 9, 4, 1];

  test('is a pure function', () => {
    sort()(input);
    expect(input).toMatchSnapshot();
  });

  test('[] |> sort === []', () => {
    expect(sort()([])).toMatchSnapshot();
  });

  test('[5, 2, 8, 9, 4, 1] |> sort === [1, 2, 4, 5, 8, 9]', () => {
    expect(sort()(input)).toMatchSnapshot();
  });

  test('["a", "z", "e", "r", "t", "y"] |> sort === ["a", "e", "r", "t", "y", "z"]', () => {
    expect(sort()(['a', 'z', 'e', 'r', 't', 'y'])).toMatchSnapshot();
  });

  test('collection |> sort(comparator)', () => {
    type Sample = { a: number; b: number };
    const comparatorSample = (
      d1: Sample,
      d2: Sample,
    ): ComparaisonResultChoice => {
      if (d1.a === d2.a && d1.b === d2.b) {
        return ComparaisonResultChoice.Equal;
      }
      if (d1.a < d2.a) {
        return ComparaisonResultChoice.Lower;
      }
      if (d2.a < d1.a) {
        return ComparaisonResultChoice.Greater;
      }
      if (d1.a === d2.a) {
        if (d1.b < d2.b) {
          return ComparaisonResultChoice.Lower;
        }
        if (d2.b < d1.b) {
          return ComparaisonResultChoice.Greater;
        }
      }
      return ComparaisonResultChoice.Equal;
    };
    const arraySample: Sample[] = [
      { a: 2, b: 2 },
      { a: 2, b: 1 },
      { a: 3, b: 3 },
      { a: 3, b: 1 },
      { a: 3, b: 2 },
      { a: 1, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 1, b: 3 },
    ];
    expect(sort(comparatorSample)(arraySample)).toMatchSnapshot();
  });
});
