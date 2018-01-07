import { Links } from './links';
export type Function<T, U> = (x: T, links?: Links) => U;
