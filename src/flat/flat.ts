/**
 * @module array=>array
 */
/**
 * Flatten an array of array into an array by concat all array items
 * @return A flat function ready to applied on an array of array
 * @example
 * ```
 * flat<number>()([[1, 2], [3, 4, 5]]) // [1, 2, 3, 4, 5]
 * ```
 * @example Using the chain
 * ```
 * chain([[1, 2], [3, 4, 5]])
 *   .chain(flat<number>())
 *   .value() // [1, 2, 3, 4, 5]
 * ```
 */
export function flat<T>(): (
  array: ReadonlyArray<ReadonlyArray<T>>
) => ReadonlyArray<T> {
  return (array: ReadonlyArray<ReadonlyArray<T>>) =>
    array.reduce(
      (result: ReadonlyArray<T>, element: ReadonlyArray<T>) => [
        ...result,
        ...element
      ],
      []
    );
}
