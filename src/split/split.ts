/**
 * @module string=>array
 */
/**
 * Split a string according a given separator
 * @param separator The character to use to split the string.
 * @return the function to apply on the string to split it
 * @example
 * ```
 * split('/')('a/b/cd') // ['a', 'b', 'cd']
 * ```
 * @example
 * ```
 * split('/')('') // []
 * ```
 * @example
 * ```
 * split('')('abcd') // ['a', 'b', 'c', 'd']
 * ```
 * @example
 * ```
 * split()('abcd') // ['a', 'b', 'c', 'd']
 * ```
 * @example Using the chain
 * ```
 * chain('a/b/cd')
 *   .chain(split('/'))
 *   .value() // ['a', 'b', 'cd']
 * ```
 */
export function split(
  separator: string = ''
): (str: string) => ReadonlyArray<string> {
  return (str: string) => str.split(separator).filter(s => '' !== s);
}
