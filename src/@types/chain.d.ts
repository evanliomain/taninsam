import { Links } from './links';

export interface Chain<T> {
  value(): T;
  chain<U>(f: (x: T, links: Links) => U): Chain<U>;
  link(linkName: string): Chain<T>;
  log(flag: string): Chain<T>;
}
