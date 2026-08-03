/**
 * @module any=>any
 */
import { Pattern } from '../@types';
import { find } from '../find';
import { isUndefined } from '../is-undefined';

/**
 * Match the input against a list of patterns, and apply the rule of the
 * first one that matches.
 *
 * A pattern is a tuple:
 * - `[predicate, rule]` matches when `predicate(input)` is true;
 * - `[rule]`, with no predicate, matches anything: it is the default rule.
 *
 * Patterns are tried in the order they are given and the first match wins,
 * so a default rule hides every pattern written after it. The rule is
 * called with the input, and when no pattern matches the input is returned
 * untouched.
 * @param patterns The patterns to match the input against, in order.
 * @return the function to apply on the input to match it
 * @example
 * ```
 * const sign = patternMatchingWith<number, string>(
 *   [x => x < 0, () => 'negative'],
 *   [x => 0 === x, () => 'zero'],
 *   [() => 'positive']
 * );
 * sign(-2) // 'negative'
 * sign(0) // 'zero'
 * sign(2) // 'positive'
 * ```
 * @example Without a default rule, an unmatched input is returned untouched
 * ```
 * patternMatchingWith<number, string>([x => x < 0, () => 'negative'])(2) // 2
 * ```
 * @example Using the chain
 * ```
 * chain(-2)
 *   .chain(patternMatchingWith<number, string>(
 *     [x => x < 0, () => 'negative'],
 *     [() => 'positive']
 *   ))
 *   .value() // 'negative'
 * ```
 */
export function patternMatchingWith<T, U>(
  ...patterns: ReadonlyArray<Pattern<(value: T) => boolean, T, U>>
): (value: T) => T | U {
  return (value: T) => {
    const matched = find<Pattern<(value: T) => boolean, T, U>>(
      pattern => 1 === pattern.length || pattern[0](value),
    )(patterns);

    return isUndefined(matched) ? value : ruleOf<T, U>(matched)(value);
  };
}

/**
 * @ignore
 */
function ruleOf<T, U>(
  pattern: Pattern<(value: T) => boolean, T, U>,
): (value: T) => U {
  return 1 === pattern.length ? pattern[0] : pattern[1];
}
