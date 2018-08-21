/**
 * @module object=>object
 */
/**
 * Create a new object from an object, with a subset of specified properties
 * @param properties The subset of properties
 * @return the function to apply on the object to create its subset of properties
 * @example
 * ```
 * pluck<{ a: number; b: string; c: boolean }, 'a' | 'c'>(
 *    { a: 1, b: 'B', c: true }
 * )('a', 'c') // { a: 1, c: true }
 * ```
 * @example Using the chain
 * ```
 * chain({ a: 1, b: 'B', c: true })
 *   .chain(pluck<{ a: number; b: string; c: boolean }, 'a' | 'c'>())
 *   .value() // { a: 1, c: true }
 * ```
 */
export function pluck<T, K extends keyof T>(
  ...properties: K[]
): (obj: Readonly<T>) => Readonly<{ [key: string]: T[K] }> {
  return (obj: T): Readonly<{ [key: string]: T[K] }> =>
    properties
      .map((property: K) => ({ [property]: obj[property] }))
      .reduce((result, o) => ({ ...result, ...o }), {});
}
