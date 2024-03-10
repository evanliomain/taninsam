import { describe, expect, test } from 'vitest';
import { split } from './split';

describe('split function', () => {
  const input = 'a/b/cd';

  test('is a pure function', () => {
    split()(input);
    expect(input).toMatchSnapshot();
  });

  test('input |> split("/") === ["a", "b", "cd"]', () => {
    expect(split('/')(input)).toEqual(['a', 'b', 'cd']);
  });

  test('input |> split("") === ["a", "/", "b", "/", "c", "d"]', () => {
    expect(split('')(input)).toEqual(['a', '/', 'b', '/', 'c', 'd']);
  });

  test('input |> split() === ["a", "/", "b", "/", "c", "d"]', () => {
    expect(split('')(input)).toEqual(['a', '/', 'b', '/', 'c', 'd']);
  });

  test('"" |> split("/") === []', () => {
    expect(split('/')('')).toEqual([]);
  });

  test('"a,s,x,,,c,,," |> split(",") === ["a", "s", "x", "c"]', () => {
    expect(split(',')('a,s,x,,,c,,,')).toEqual(['a', 's', 'x', 'c']);
  });
});
