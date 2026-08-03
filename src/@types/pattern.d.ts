export type Pattern<K, T, U> =
  | readonly [K, (value: T) => U]
  | readonly [(value: T) => U];
