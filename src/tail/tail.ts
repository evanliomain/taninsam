/**
 * @module array=>array
 */
/**
 * Return the array without the first element. Return an empty array
 * if the input is an empty array.
 * @return the function to apply on the array
 * to do return it without the first element
 * @example
 * ```
 * tail<number>()([1, 2, 3, 4, 5]) // [2, 3, 4, 5]
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4, 5])
 *   .chain(tail<number>())
 *   .value() // [2, 3, 4, 5]
 * ```
 */
export function tail<T>(): (array: ReadonlyArray<T>) => ReadonlyArray<T> {
  return (array: ReadonlyArray<T>) => {
    if (0 === array.length) {
      return [];
    }
    const [_, ...end] = array;
    return end;
  };
}
