import { Equal, Expect } from '../../common';

/**
 * Implement an `AssignAll` generic that takes a tuple
 * containing object types and merges all of them.
 *
 * Bonus: make it *Tail-Recursive*.
 */
namespace assign {
  declare function assign<
    // Infer `Objects` as a tuple of objects:
    Objects extends [{}, ...{}[]],
  >(...objects: Objects): AssignAll<Objects>;

  type AssignAll<Tuple> = TODO;

  // Two objects
  const res1 = assign({ name: 'Michel', age: 82 }, { childrenCount: 3 });
  type expected1 = { name: string; age: number; childrenCount: number };
  type test1 = Expect<Equal<typeof res1, expected1>>;

  // Three objects
  const res2 = assign(
    { protocol: 'https' as const },
    { domain: 'type-level-typescript.com' },
    { path: '/recursive-types' },
  );
  type expected2 = { protocol: 'https'; domain: string; path: string };
  type test2 = Expect<Equal<typeof res2, expected2>>;

  // Five objects
  const res3 = assign({ a: true }, { b: 2 }, { c: '4' }, { d: null }, { 2: 2n });
  type expected3 = { a: boolean; b: number; c: string; d: null; 2: bigint };
  type test3 = Expect<Equal<typeof res3, expected3>>;

  // One object
  const res4 = assign({ fileName: 'hello-world', extension: 'txt' });
  type expected4 = { fileName: string; extension: string };
  type test4 = Expect<Equal<typeof res4, expected4>>;
}
