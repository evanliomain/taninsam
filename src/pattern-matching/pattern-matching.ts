/**
 * @module any=>any
 */
import { Pattern } from '../@types';
import { patternMatchingBy } from '../pattern-matching-by';

/**
 * Match the input against a list of patterns, and apply the rule of the
 * first one that matches.
 *
 * A pattern is a tuple:
 * - `[value, rule]` matches when `input === value`, a strict equality, so
 *   `NaN` never matches and two distinct objects of the same shape never
 *   match either;
 * - `[rule]`, with no value, matches anything: it is the default rule.
 *
 * Patterns are tried in the order they are given and the first match wins,
 * so a default rule hides every pattern written after it. The rule is
 * called with the input, and when no pattern matches the input is returned
 * untouched.
 *
 * See {@link patternMatchingBy} to match on a reduced form of the input,
 * and {@link patternMatchingWith} to match with predicates.
 * @param patterns The patterns to match the input against, in order.
 * @return the function to apply on the input to match it
 * @example
 * ```
 * const spell = patternMatching<number, string>(
 *   [1, () => 'one'],
 *   [2, () => 'two'],
 *   [n => `${n} is a lot`]
 * );
 * spell(1) // 'one'
 * spell(2) // 'two'
 * spell(3) // '3 is a lot'
 * ```
 * @example Without a default rule, an unmatched input is returned untouched
 * ```
 * patternMatching<number, string>([1, () => 'one'])(2) // 2
 * ```
 * @example Using the chain
 * ```
 * chain(2)
 *   .chain(patternMatching<number, string>(
 *     [1, () => 'one'],
 *     [() => 'not one']
 *   ))
 *   .value() // 'not one'
 * ```
 */
export function patternMatching<T, U>(
  ...patterns: ReadonlyArray<Pattern<T, T, U>>
): (value: T) => T | U {
  return patternMatchingBy<T, T, U>((value: T) => value, ...patterns);
}
