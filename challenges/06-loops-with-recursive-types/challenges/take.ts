import { Equal, Expect } from '../../common';

/**
 * Write a `Take` type level function
 * that takes a tuple, a `N` number and
 * returns the first `N` elements of this
 * tuple.
 *
 * Hint: you will need to use T["length"]
 * to read the length of a tuple `T`.
 */
namespace take {
  type Take<Tuple extends any[], N, Output extends any[] = []> = TODO;

  type res1 = Take<[1, 2, 3], 2>;
  type test1 = Expect<Equal<res1, [1, 2]>>;

  type res2 = Take<[1, 2, 3], 1>;
  type test2 = Expect<Equal<res2, [1]>>;

  type res3 = Take<[1, 2, 3], 0>;
  type test3 = Expect<Equal<res3, []>>;

  type res4 = Take<[1, 2], 5>;
  type test4 = Expect<Equal<res4, [1, 2]>>;
}
