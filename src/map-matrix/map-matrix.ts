/**
 * @module array=>array
 */
import { Links } from '../@types';

/**
 * Apply the iteratee to every cell of a 2-D array and return a new matrix
 * of the same shape.
 * A matrix is read as an array of rows, so `matrix[y][x]` is the cell of
 * the column `x` in the row `y`: `y` is the index of the row the cell
 * belongs to, and `x` its index inside that row.
 * Rows are visited from the first to the last one, and each row from its
 * first to its last cell. Rows of different lengths are left as they are,
 * each one being mapped over its own cells.
 * @param iteratee The iteratee invoked per cell.
 * @return the function to apply on the matrix to transform its cells
 * @example
 * ```
 * mapMatrix<number, number>(cell => 1 + cell)([[1, 2], [3, 4]])
 * // [[2, 3], [4, 5]]
 * mapMatrix<number, string>((cell, x, y) => `${x},${y}=${cell}`)([
 *   [1, 2],
 *   [3, 4]
 * ])
 * // [['0,0=1', '1,0=2'], ['0,1=3', '1,1=4']]
 * ```
 * @example Using the chain
 * ```
 * chain([[1, 2], [3, 4]])
 *   .chain(mapMatrix<number, number>(cell => 1 + cell))
 *   .value() // [[2, 3], [4, 5]]
 * ```
 */
export function mapMatrix<T, U>(
  iteratee: (
    cell: T,
    x: number,
    y: number,
    matrix: ReadonlyArray<ReadonlyArray<T>>,
    links?: Links,
  ) => U,
): (
  matrix: ReadonlyArray<ReadonlyArray<T>>,
  links?: Links,
) => ReadonlyArray<ReadonlyArray<U>> {
  return (matrix: ReadonlyArray<ReadonlyArray<T>>, links?: Links) =>
    matrix.map((row: ReadonlyArray<T>, y: number) =>
      row.map((cell: T, x: number) => iteratee(cell, x, y, matrix, links)),
    );
}
