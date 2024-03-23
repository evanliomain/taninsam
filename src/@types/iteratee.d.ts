import { Links } from './links';

export type Iteratee<T, U> = (
  value: T,
  index: number,
  array: ReadonlyArray<T>,
  links?: Links,
) => U;
