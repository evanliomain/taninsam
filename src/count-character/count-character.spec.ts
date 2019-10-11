import { countCharacter } from './count-character';

describe('countCharacter function', () => {
  const input = 'abba';

  test('is a pure function', () => {
    countCharacter('a')(input);
    expect(input).toMatchSnapshot();
  });

  test('"abba" |> countCharacter("a") === 2', () => {
    expect(countCharacter('a')('abba')).toMatchSnapshot();
  });

  test('"abba" |> countCharacter("w") === 0', () => {
    expect(countCharacter('w')('abba')).toMatchSnapshot();
  });

  test('"" |> countCharacter("w") === 0', () => {
    expect(countCharacter('w')('')).toMatchSnapshot();
  });

  test('countCharacter("wtf") throw exception', () => {
    expect(() => countCharacter('wtf')).toThrowErrorMatchingSnapshot();
  });
});
