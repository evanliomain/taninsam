/**
 * @module array=>array
 */
/**
 * Extract the tail of an array and return an empty array if the original one is empty
 * @return the function to apply on the TBD to do something
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
