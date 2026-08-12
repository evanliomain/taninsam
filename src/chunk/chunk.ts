/**
 * @module array=>array<array>
 */
/**
 * This method chunk an array into multiple array of the same size,
 * except the last one
 * @param size The number elements by chunk.
 * @return the function to apply on the TBD to do something
 * @example
 * ```
 * chunk<number>(2)([1, 2, 3, 4]) // [[1, 2], [3, 4]]
 * chunk<number>(2)([1, 2, 3, 4, 5]) // [[1, 2], [3, 4], [5]]
 * ```
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4])
 *   .chain(chunk<number>(2))
 *   .value() // [[1, 2], [3, 4]]
 * ```
 * @example default size is 1
 * ```
 * chunk<number>()([1, 2, 3, 4]) // [[1], [2], [3], [4]]
 * ```
 * @example when size is superior to input length
 * ```
 * chunk<number>(5)([1, 2, 3, 4]) // [[1, 2, 3, 4]]
 * ```
 * @example when size is 0
 * ```
 * chunk<number>(0)([1, 2, 3, 4]) // []
 * ```
 * @example when size is less than 0
 * ```
 * chunk<number>(-1)([1, 2, 3, 4]) // []
 * ```
 */
export function chunk<T>(
  size = 1
): (element: ReadonlyArray<T>) => ReadonlyArray<ReadonlyArray<T>> {
  if (size <= 0) {
    return () => [];
  }

  return (array: ReadonlyArray<T>): ReadonlyArray<ReadonlyArray<T>> => {
    const result: T[][] = [];
    let counter = 0;
    let accu: T[] = [];
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (i !== 0 && 0 === counter % size) {
        result.push(accu);
        accu = [];
      }
      accu.push(element);
      counter++;
    }
    result.push(accu);

    return result;
  };
}
