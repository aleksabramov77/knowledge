import { Equal, Expect } from '../../common';

/**
 * The `flatten` function can take arrays of values,
 * Or arrays containing other arrays.
 * When given a nested array, `flatten` removes
 * one level of nesting. Make it generic!
 */
namespace flatten {
  type Flatten<Arr extends any[]> = Arr extends (infer Item)[][] ? Item[] : Arr;

  function flatten<A extends any[]>(arrayOfArrays: A): Flatten<A> {
    return arrayOfArrays.reduce(
      (acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])],
      [],
    );
  }

  // Zero levels of nesting
  let res1 = flatten(['a', 'b', 'c', 'd']);
  type test1 = Expect<Equal<typeof res1, string[]>>;

  // One level of nesting
  let res2 = flatten([
    [1, 2],
    [3, 4],
  ]);
  type test2 = Expect<Equal<typeof res2, number[]>>;

  // Two levels of nesting
  let res3 = flatten([[['a'], ['b', 'c']], [['d']]]);
  type test3 = Expect<Equal<typeof res3, string[][]>>;

  // Three levels of nesting
  let res4 = flatten([[[[true]], [[false, true]]], [[[true]]]]);
  type test4 = Expect<Equal<typeof res4, boolean[][][]>>;
}
