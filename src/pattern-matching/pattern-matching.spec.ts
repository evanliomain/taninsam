import { describe, expect, test } from 'vitest';
import { patternMatching } from './pattern-matching';

describe('patternMatching function', () => {
  const input = [1, 2, 3, 4, 5];
  const spell = patternMatching<number, string>(
    [1, () => 'one'],
    [2, () => 'two'],
    [n => `${n} is a lot`],
  );

  test('is a pure function', () => {
    patternMatching<ReadonlyArray<number>, number>([array => array.length])(
      input,
    );
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });

  test('1 |> spell === "one"', () => {
    expect(spell(1)).toBe('one');
  });

  test('2 |> spell === "two"', () => {
    expect(spell(2)).toBe('two');
  });

  test('3 |> spell === "3 is a lot"', () => {
    expect(spell(3)).toBe('3 is a lot');
  });

  test('2 |> patternMatching([1, …]) === 2', () => {
    expect(patternMatching<number, string>([1, () => 'one'])(2)).toBe(2);
  });

  test('2 |> patternMatching() === 2', () => {
    expect(patternMatching<number, string>()(2)).toBe(2);
  });

  test('a default rule hides the patterns written after it', () => {
    expect(
      patternMatching<number, string>([() => 'any'], [1, () => 'one'])(1),
    ).toBe('any');
  });

  test('matches on a strict equality, never on a loose one', () => {
    expect(patternMatching<unknown, string>(['1', () => 'one'])(1)).toBe(1);
  });

  test('NaN never matches', () => {
    expect(patternMatching<number, string>([NaN, () => 'nan'])(NaN)).toBe(NaN);
  });

  test('two distinct objects of the same shape never match', () => {
    expect(
      patternMatching<Record<string, number>, string>([
        { a: 1 },
        () => 'a is one',
      ])({ a: 1 }),
    ).toEqual({ a: 1 });
  });

  test('the same object reference matches', () => {
    const reference = { a: 1 };
    expect(
      patternMatching<Record<string, number>, string>([
        reference,
        () => 'a is one',
      ])(reference),
    ).toBe('a is one');
  });

  test('calls the rule with the input', () => {
    expect(patternMatching<number, string>([2, n => `${n} it is`])(2)).toBe(
      '2 it is',
    );
  });

  test('calls the default rule with the input', () => {
    expect(patternMatching<number, string>([n => `${n} by default`])(2)).toBe(
      '2 by default',
    );
  });
});
