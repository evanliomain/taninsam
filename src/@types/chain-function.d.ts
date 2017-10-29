import { Links } from './links';

export type ChainFunction<T, U> = (input: T, links?: Links) => U;
