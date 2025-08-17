import { Equal, Expect } from '../../common';

/**
 * The `flatten` function takes a heterogeneous array
 * that can contain arrays, but also regular values.
 * It should flatten arrays but should leave other
 * values unchanged.
 *
 * Note: This is *not* a recursive flatten!
 * Only one level of nesting should be removed.
 */
namespace heterogeneousFlatten {

  type Flatten<Arr extends any[]> = TODO

  declare function flatten<A extends any[]>(arr: A): Flatten<A>;

  let res1 = flatten([1, 2, [3, 4]]);
  type test1 = Expect<Equal<typeof res1, number[]>>;

  // if the array is already flat, leave it unchanged
  let res2 = flatten(["a", "b", "c", "d"]);
  type test2 = Expect<Equal<typeof res2, string[]>>;

  // This should work when the types of values are different.
  let res3 = flatten(["a", "b", [3, 4]]);
  type test3 = Expect<Equal<typeof res3, (number | string)[]>>;

  // This should work when the types of values are different.
  let res4 = flatten(["a", ["b"], [3, [4, 5]]]);
  type test4 = Expect<Equal<typeof res4, (number | string | number[])[]>>;
}
