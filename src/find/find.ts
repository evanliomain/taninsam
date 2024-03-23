/**
 * @module array=>any
 */
/**
 * Returns the value of the first element in the array where predicate is true,
 * and undefined otherwise.
 * @param predicate find calls predicate once for each element of the array,
 * in ascending order, until it finds one where predicate returns true.
 * If such an element is found, find immediately returns that element value.
 * Otherwise, find returns undefined.
 * @return A find function ready to applied on an array
 * @example
 * ```
 * const input = [
 *   { a: 1, b: 'a' },
 *   { a: 2, b: 'b' },
 *   { a: 3, b: 'c' },
 *   { a: 4, b: 'd' }
 * ];
 * find<{ a: number; b: string }[]>(({ a }) => 3 === a)(input)
 * // { a: 3, b: 'c' }
 * ```
 * @example Using the chain
 * ```
 * chain(input)
 *   .chain(find<{ a: number; b: string }[]>(({ a }) => 3 === a))
 *   .value() // { a: 3, b: 'c' }
 * ```
 */
export function find<T>(
  predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
): (array: ReadonlyArray<T>) => T | undefined {
  return (array: ReadonlyArray<T>) => array.find(predicate);
}
