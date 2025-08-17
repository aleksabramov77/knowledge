import { Equal, Expect } from '../../common';

/**
 * Build a `DeepRequired` generic that turns every
 * key of a nested object structure into a required property.
 */
namespace deepRequired {
  type DeepRequired<T> = { [K in keyof T]-?: DeepRequired<T[K]> };

  type res1 = DeepRequired<{ a?: string; b?: string }>;
  type test1 = Expect<Equal<res1, { a: string; b: string }>>;

  type res2 = DeepRequired<{ a?: { b?: string; c?: { d?: string } } }>;
  type test2 = Expect<Equal<res2, { a: { b: string; c: { d: string } } }>>;

  type res3 = DeepRequired<{ a?: string; b?: { c?: string; d?: number }[] }>;
  type test3 = Expect<Equal<res3, { a: string; b: { c: string; d: number }[] }>>;
}
