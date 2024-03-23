/**
 * @module string=>number
 */
/**
 * Count the number of character into the chained string
 * @param character the character to count
 * @param s the string where counting character
 * @returns the number of character's occurence in s
 * @example
 * ```
 * countCharacter('a')('abba') // 2
 * ```
 * @example Using the chain
 * ```
 * chain('abba')
 *   .chain(countCharacter(2))
 *   .value() // 2
 * ```
 */
export function countCharacter(character: string): (s: string) => number {
  if (1 !== character.length) {
    throw new Error(
      `Can't count a character with a lenght different of 1: ${character.length}`,
    );
  }

  return (s: string) => {
    if (0 === s.length) {
      return 0;
    }
    let counter = 0;
    for (const c of s) {
      if (c === character) {
        counter++;
      }
    }

    return counter;
  };
}
