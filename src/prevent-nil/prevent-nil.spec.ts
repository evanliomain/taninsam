import { preventNil } from './prevent-nil';

describe('preventNil function', () => {
  const input = [1, 2, 3, 4, 5];
  let f;

  beforeEach(() => {
    f = jest.fn().mockReturnValue(1);
  });

  test('is a pure function', () => {
    preventNil(f)(input);
    expect(input).toMatchSnapshot();
  });

  test('undefined |> preventNil(f) === 1', () => {
    expect(preventNil(f)(undefined)).toBe(undefined);
    expect(f).not.toHaveBeenCalled();
  });

  test('null |> preventNil(f) === 1', () => {
    expect(preventNil(f)(null)).toBe(undefined);
    expect(f).not.toHaveBeenCalled();
  });

  test('1 |> preventNil(f) === 1', () => {
    expect(preventNil(f)(1)).toBe(1);
    expect(f).toHaveBeenCalledWith(1);
  });
});
