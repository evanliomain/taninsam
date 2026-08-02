import { describe, expect, test, vi } from 'vitest';
import { patternMatchingBy } from './pattern-matching-by';

describe('patternMatchingBy function', () => {
  const input = [1, 2, 3, 4, 5];
  const size = patternMatchingBy<ReadonlyArray<number>, number, string>(
    array => array.length,
    [0, () => 'empty'],
    [1, () => 'single'],
    [() => 'many'],
  );

  test('is a pure function', () => {
    size(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });

  test('[] |> size === "empty"', () => {
    expect(size([])).toBe('empty');
  });

  test('[1] |> size === "single"', () => {
    expect(size([1])).toBe('single');
  });

  test('[1, 2, 3] |> size === "many"', () => {
    expect(size([1, 2, 3])).toBe('many');
  });

  test('"abc" |> patternMatchingBy(length, [1, …]) === "abc"', () => {
    expect(
      patternMatchingBy<string, number, string>(
        s => s.length,
        [1, () => 'one character'],
      )('abc'),
    ).toBe('abc');
  });

  test('"a" |> patternMatchingBy(length, [1, …]) === "one character"', () => {
    expect(
      patternMatchingBy<string, number, string>(
        s => s.length,
        [1, () => 'one character'],
      )('a'),
    ).toBe('one character');
  });

  test('"abc" |> patternMatchingBy(length) === "abc"', () => {
    expect(
      patternMatchingBy<string, number, string>(s => s.length)('abc'),
    ).toBe('abc');
  });

  test('a default rule hides the patterns written after it', () => {
    expect(
      patternMatchingBy<ReadonlyArray<number>, number, string>(
        array => array.length,
        [() => 'any'],
        [1, () => 'single'],
      )([1]),
    ).toBe('any');
  });

  test('matches on a strict equality, never on a loose one', () => {
    expect(
      patternMatchingBy<string, unknown, string>(
        s => s.length,
        ['1', () => 'one character'],
      )('a'),
    ).toBe('a');
  });

  test('calls the rule with the input, not with by(input)', () => {
    expect(
      patternMatchingBy<ReadonlyArray<number>, number, string>(
        array => array.length,
        [2, array => `${array.join('+')}`],
      )([1, 2]),
    ).toBe('1+2');
  });

  test('calls the default rule with the input, not with by(input)', () => {
    expect(
      patternMatchingBy<ReadonlyArray<number>, number, string>(
        array => array.length,
        [array => `${array.join('+')}`],
      )([1, 2]),
    ).toBe('1+2');
  });

  test('calls by exactly once', () => {
    const by = vi.fn((array: ReadonlyArray<number>) => array.length);
    patternMatchingBy<ReadonlyArray<number>, number, string>(
      by,
      [0, () => 'empty'],
      [1, () => 'single'],
      [() => 'many'],
    )([1, 2, 3]);
    expect(by.mock.calls.length).toBe(1);
    expect(by.mock.calls[0][0]).toEqual([1, 2, 3]);
  });
});
