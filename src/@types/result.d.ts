import { Links } from './links';

export interface Result<T> {
  result: T;
  links: Links;
}
