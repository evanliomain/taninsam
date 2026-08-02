import { describe, expect, test, vi } from 'vitest';
import { patternMatchingWith } from './pattern-matching-with';

describe('patternMatchingWith function', () => {
  const input = [1, 2, 3, 4, 5];
  const sign = patternMatchingWith<number, string>(
    [x => x < 0, () => 'negative'],
    [x => 0 === x, () => 'zero'],
    [() => 'positive'],
  );

  test('is a pure function', () => {
    patternMatchingWith<ReadonlyArray<number>, number>([arr => arr.length])(
      input,
    );
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });

  test('-2 |> sign === "negative"', () => {
    expect(sign(-2)).toBe('negative');
  });

  test('0 |> sign === "zero"', () => {
    expect(sign(0)).toBe('zero');
  });

  test('2 |> sign === "positive"', () => {
    expect(sign(2)).toBe('positive');
  });

  test('2 |> patternMatchingWith(x < 0) === 2', () => {
    expect(
      patternMatchingWith<number, string>([x => x < 0, () => 'negative'])(2),
    ).toBe(2);
  });

  test('2 |> patternMatchingWith() === 2', () => {
    expect(patternMatchingWith<number, string>()(2)).toBe(2);
  });

  test('a default rule hides the patterns written after it', () => {
    expect(
      patternMatchingWith<number, string>(
        [() => 'any'],
        [x => x < 0, () => 'negative'],
      )(-2),
    ).toBe('any');
  });

  test('calls the rule with the input', () => {
    expect(
      patternMatchingWith<number, string>([
        x => 0 < x,
        x => `${x} is positive`,
      ])(2),
    ).toBe('2 is positive');
  });

  test('calls the default rule with the input', () => {
    expect(
      patternMatchingWith<number, string>([x => `${x} by default`])(2),
    ).toBe('2 by default');
  });

  test('a default rule returning a falsy value still matches', () => {
    expect(patternMatchingWith<number, string>([() => ''])(2)).toBe('');
  });

  test('stops at the first matching pattern', () => {
    const first = vi.fn((x: number) => x < 0);
    const second = vi.fn((x: number) => 0 === x);
    const third = vi.fn((x: number) => 0 < x);
    const rule = vi.fn((x: number) => `${x} is zero`);
    patternMatchingWith<number, string>(
      [first, () => 'negative'],
      [second, rule],
      [third, () => 'positive'],
    )(0);
    expect(first.mock.calls.length).toBe(1);
    expect(second.mock.calls.length).toBe(1);
    expect(third.mock.calls.length).toBe(0);
    expect(rule.mock.calls.length).toBe(1);
    expect(rule.mock.calls[0][0]).toBe(0);
  });

  test('tries every predicate when no pattern matches', () => {
    const first = vi.fn((x: number) => x < 0);
    const second = vi.fn((x: number) => 0 === x);
    patternMatchingWith<number, string>(
      [first, () => 'negative'],
      [second, () => 'zero'],
    )(2);
    expect(first.mock.calls.length).toBe(1);
    expect(second.mock.calls.length).toBe(1);
  });
});
