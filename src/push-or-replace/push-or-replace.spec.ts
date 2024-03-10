import { describe, expect, test } from 'vitest';
import { pushOrReplace } from './push-or-replace';

describe('pushOrReplace function', () => {
  const input = [1, 2, 4];

  test('is a pure function', () => {
    pushOrReplace({
      match: x => x % 2 === 0,
      replacement: 2
    })(input);
    expect(input).toMatchSnapshot();
  });

  test(
    '[4, 6, 8] ' +
      '|> pushOrReplace({ match: x => x % 2 === 0, replacement: 2 })' +
      ' === [2, 2, 2]',
    () => {
      expect(
        pushOrReplace<number>({
          match: x => x % 2 === 0,
          replacement: 2
        })([4, 6, 8])
      ).toMatchSnapshot();
    }
  );

  test(
    '[1, 2, 4] ' +
      '|> pushOrReplace({ match: x => x % 2 === 0, replacement: 2 }, { match: x => x % 3 === 0, replacement: 3 })' +
      ' === [1, 2, 2, 3]',
    () => {
      expect(
        pushOrReplace<number>(
          {
            match: x => x % 2 === 0,
            replacement: 2
          },
          {
            match: x => x % 3 === 0,
            replacement: 3
          }
        )(input)
      ).toMatchSnapshot();
    }
  );

  test('[] |> pushOrReplace({ match: x => x % 2 === 0, replacement: 2 }) === [2]', () => {
    expect(
      pushOrReplace<number>({
        match: x => x % 2 === 0,
        replacement: 2
      })([])
    ).toMatchSnapshot();
  });
});
