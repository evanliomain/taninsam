import { Links } from './links';

export interface ChainFn<T> {
  value: () => (e) => T;
  chain<U>(g: (x: T, links?: Links) => U): ChainFn<U>;
  link(linkName: string): ChainFn<T>;
  log(flag: string): ChainFn<T>;
}
