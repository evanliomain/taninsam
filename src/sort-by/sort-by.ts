/**
 * @module array=>array
 */
import { ComparaisonResultChoice } from '../@types/comparaison-result-choice.enum';
/**
 * Sort an array of object on a given set of field
 * @param f one or more function to get string or number
 * from the T element of the array
 * @return the function to sort the array
 * @example
 * ```
 * sortBy<{ a: number; b: number }>(
 *  ({ a }) => a, ({ b }) => b
 * )([
 *   { a: 2, b: 1 },
 *   { a: 2, b: 2 },
 *   { a: 1, b: 2 },
 *   { a: 1, b: 1 }
 * ])
 * // [
 *   { a: 1, b: 1 },
 *   { a: 1, b: 2 },
 *   { a: 2, b: 1 },
 *   { a: 2, b: 2 }
 * ]
 * ```
 * @example Using the chain
 * ```
 * chain([
 *   { a: 2, b: 1 },
 *   { a: 2, b: 2 },
 *   { a: 1, b: 2 },
 *   { a: 1, b: 1 }
 * ])
 *   .chain(sortBy<{ a: number; b: number }>(({ a }) => a, ({ b }) => b))
 *   .value()
 * // [
 *   { a: 1, b: 1 },
 *   { a: 1, b: 2 },
 *   { a: 2, b: 1 },
 *   { a: 2, b: 2 }
 * ]
 * ```
 */

export function sortBy<T>(
  ...f: ((d: T) => number | string)[]
): (array: ReadonlyArray<T>) => ReadonlyArray<T> {
  return (array: ReadonlyArray<T>) =>
    array
      .slice()
      .sort((data1, data2) =>
        f.reduce(_compare<T>(data1, data2), ComparaisonResultChoice.Equal)
      );
}

function _compare<T>(
  data1: T,
  data2: T
): (
  resultChoice: ComparaisonResultChoice,
  g: (d: T) => number | string
) => ComparaisonResultChoice {
  return (
    resultChoice: ComparaisonResultChoice,
    g: (d: T) => number | string
  ) => {
    if (ComparaisonResultChoice.Equal !== resultChoice) {
      return resultChoice;
    }
    const fdata1 = g(data1);
    const fdata2 = g(data2);

    if (fdata1 < fdata2) {
      return ComparaisonResultChoice.Lower;
    }
    if (fdata2 < fdata1) {
      return ComparaisonResultChoice.Greater;
    }

    return ComparaisonResultChoice.Equal;
  };
}
