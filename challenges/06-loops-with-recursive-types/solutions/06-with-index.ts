import { Equal, Expect } from '../../common';

/**
 * Write a `WithIndex` type level function
 * that takes a tuple, and maps it to a tuple
 * of [value, index] pairs.
 *
 * Hint: you will need to use T["length"]
 * to generate indices
 */
namespace withIndex {
  type WithIndex<
    Tuple extends any[],
    Output extends any[] = []
  > =
  // 1, split the list
    Tuple extends [infer First, ...infer Rest]
      // 2. recurse on `Rest`, and add a new entry to `Output`.
      //    We use the previous length of `Output` to get
      //    the current index:
      ? WithIndex<Rest, [...Output, [First, Output['length']]]>
      // 3. If the list is empty, return the output
      : Output

  type res1 = WithIndex<['a']>;
  type test1 = Expect<Equal<res1, [['a', 0]]>>;

  type res2 = WithIndex<['a', 'b']>;
  type test2 = Expect<Equal<res2, [['a', 0], ['b', 1]]>>;

  type res3 = WithIndex<['a', 'b', 'c']>;
  type test3 = Expect<Equal<res3, [['a', 0], ['b', 1], ['c', 2]]>>;
}
