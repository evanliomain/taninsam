/**
 * @module any=>any
 */
import { Pattern } from '../@types';
import { patternMatchingWith } from '../pattern-matching-with';

/**
 * Match a reduced form of the input against a list of patterns, and apply
 * the rule of the first one that matches.
 *
 * It is {@link patternMatching} matching on `by(input)` instead of on the
 * input itself. A pattern is a tuple:
 * - `[value, rule]` matches when `by(input) === value`, a strict equality;
 * - `[rule]`, with no value, matches anything: it is the default rule.
 *
 * Patterns are tried in the order they are given and the first match wins,
 * so a default rule hides every pattern written after it. `by` is called
 * exactly once, the rule is called with the input rather than with
 * `by(input)`, and when no pattern matches the input is returned untouched.
 * @param by The function reducing the input to the form to match on.
 * @param patterns The patterns to match `by(input)` against, in order.
 * @return the function to apply on the input to match it
 * @example
 * ```
 * const size = patternMatchingBy<ReadonlyArray<number>, number, string>(
 *   array => array.length,
 *   [0, () => 'empty'],
 *   [1, () => 'single'],
 *   [() => 'many']
 * );
 * size([]) // 'empty'
 * size([1]) // 'single'
 * size([1, 2, 3]) // 'many'
 * ```
 * @example Without a default rule, an unmatched input is returned untouched
 * ```
 * patternMatchingBy<string, number, string>(
 *   s => s.length,
 *   [1, () => 'one character']
 * )('abc') // 'abc'
 * ```
 * @example Using the chain
 * ```
 * chain([1])
 *   .chain(patternMatchingBy<ReadonlyArray<number>, number, string>(
 *     array => array.length,
 *     [1, () => 'single'],
 *     [() => 'many']
 *   ))
 *   .value() // 'single'
 * ```
 */
export function patternMatchingBy<T, K, U>(
  by: (value: T) => K,
  ...patterns: ReadonlyArray<Pattern<K, T, U>>
): (value: T) => T | U {
  return (value: T) => {
    const key = by(value);

    return patternMatchingWith<T, U>(
      ...patterns.map(
        (pattern: Pattern<K, T, U>): Pattern<(value: T) => boolean, T, U> =>
          1 === pattern.length
            ? [pattern[0]]
            : [() => key === pattern[0], pattern[1]],
      ),
    )(value);
  };
}
