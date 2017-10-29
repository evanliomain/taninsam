import { Links } from './links';
export type Identity<T> = (x: T, links?: Links) => T;
