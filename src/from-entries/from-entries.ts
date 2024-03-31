/**
 * @module array=>object
 */

/**
 * Transform an array of key/value pairs into a keys/values object
 * @return the function to apply on the array to transform it into an object
 * @example
 * ```
 * fromEntries()([['a', 1],['b', 'c']]) // {a: 1, b: 'c'}
 * ```
 * @example Using the chain
 * ```
 * chain([['a', 1],['b', 'c']])
 *   .chain(fromEntries())
 *   .value() // {a: 1, b: 'c'}
 * ```
 */
export function fromEntries(): (en: ReadonlyArray<[string, unknown]>) => {
  [key: string]: unknown;
} {
  return (en: ReadonlyArray<[string, unknown]>) =>
    en.reduce(
      (ob: object, [key, value]) => ({
        ...ob,
        [key]: value,
      }),
      {},
    );
}
