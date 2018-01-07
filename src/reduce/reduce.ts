/**
 * @module array=>any
 */
/**
 * Calls the specified callback function for all the elements in an array.
 * The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
 * See the [native reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) for more informations.
 * @param iteratee A function that accepts up to four arguments.
 * The reduce method calls the iteratee function one time for each element in the array.
 * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation.
 * @return A reduce function ready to applied on an array
 * @example
 * ```
 * reduce((a, b) => a - b, 0)([1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 * //          -               -10
 * //         / \              / \
 * //        -   4           -6   4
 * //       / \              / \
 * //      -   3   ==>     -3   3
 * //     / \              / \
 * //    -   2           -1   2
 * //   / \              / \
 * //  0   1            0   1
 * ```
 *
 * @example Using the chain
 * ```
 * chain([1, 2, 3, 4])
 *   .chain(reduce((a, b) => a - b, 0))
 *   .value() // -10
 * ```
 */
export function reduce<T, U>(
  iteratee: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => U,
  initialValue: U
): (array: T[]) => U;

export function reduce<T>(
  iteratee: (
    previousValue: T,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => T
): (array: T[]) => T;

export function reduce(iteratee, initialValue?) {
  if (undefined !== initialValue) {
    return array => array.reduce(iteratee, initialValue);
  }
  return array => array.reduce(iteratee);
}
