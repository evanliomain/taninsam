import { map } from '../map';

/**
 * @module matrix=>matrix
 */
/**
 * Apply a function on each element of a matrix.
 * @param iteratee The iteratee invoked per element.
 * @return the new matrix
 * @example
 * ```
 * mapMatrix(x => 1 === x ? '.' : '-')([[1, 4, 2], [1, 1, 3]])
 * // [['.', '-', '-'], ['.', '.', '-']]
 * ```
 * @example Using the chain
 * ```
 * chain([[1, 4, 2], [1, 1, 3]])
 *   .chain(mapMatrix(x => 1 === x ? '.' : '-'))
 *   .value() // [['.', '-', '-'], ['.', '.', '-']]
 * ```
 */
export function mapMatrix<T, U>(
  iteratee: (
    cell: T,
    columnIndex?: number,
    rowIndex?: number,
    originalMatrix?: ReadonlyArray<ReadonlyArray<T>>
  ) => U
): (
  matrix: ReadonlyArray<ReadonlyArray<T>>
) => ReadonlyArray<ReadonlyArray<U>> {
  return matrix =>
    map<ReadonlyArray<T>, ReadonlyArray<U>>((row, rowIndex) =>
      map<T, U>((cell, columnIndex) =>
        iteratee(cell, columnIndex, rowIndex, matrix)
      )(row)
    )(matrix);
}
