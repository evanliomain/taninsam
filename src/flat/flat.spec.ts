import { flat } from './flat';

describe('flat function', () => {
  const input = [[1, 2], [3, 4, 5]];

  test('is a pure function', () => {
    flat()(input);
    expect(input).toMatchSnapshot();
  });

  test('[[1, 2], [3, 4, 5]] |> flat === [1, 2, 3, 4, 5]', () => {
    expect(flat()(input)).toMatchSnapshot();
  });

  test('[] |> flat === []', () => {
    expect(flat()([])).toMatchSnapshot();
  });

  test('[[], [], [], []] |> flat === []', () => {
    expect(flat()([])).toMatchSnapshot();
  });
});
