/**
 * @module array=>array
 */
/**
 * Transform an array in a triangular array
 * [A, B, C, D] =>
 * [
 *  [A],
 *  [A, B],
 *  [A, B, C],
 *  [A, B, C, D]
 * ]
 * @return the function to apply on the array to do transform it to a triangular array
 * @example
 * ```
 * triangular<number>()([1, 2, 3]) // [[1], [1, 2], [1, 2, 3]]
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3])
 *   .chain(triangular<number>())
 *   .value() // [[1], [1, 2], [1, 2, 3]]
 * ```
 */
export function triangular<T>(): (
  array: ReadonlyArray<T>
) => ReadonlyArray<ReadonlyArray<T>> {
  return (array: ReadonlyArray<T>): ReadonlyArray<ReadonlyArray<T>> =>
    array.reduce((acc: ReadonlyArray<ReadonlyArray<T>>, current: T) => {
      if (0 === acc.length) {
        return [[current]];
      }
      return [...acc, [...acc[acc.length - 1], current]];
    }, []);
}
