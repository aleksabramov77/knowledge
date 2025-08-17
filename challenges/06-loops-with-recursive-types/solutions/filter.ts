import { Equal, Expect } from '../../common';

/**
 * Make a `Filter` generic that takes a tuple,
 * an arbitrary `Cond` type, filters out any element
 * that isn't assignable to `Cond`.
 */
namespace filter {
  type Filter<Tuple, Cond> = Tuple extends [infer First, ...infer Rest]
    ? First extends Cond
      ? [First, ...Filter<Rest, Cond>]
      : Filter<Rest, Cond>
    : [];

  type res1 = Filter<[1, 2, 'oops', 3, 'hello'], number>;
  type test1 = Expect<Equal<res1, [1, 2, 3]>>;

  type res2 = Filter<['a', 1, 'b', true, 'c'], string>;
  type test2 = Expect<Equal<res2, ['a', 'b', 'c']>>;

  type res3 = Filter<['hello', null, 42, {}, [], undefined], {}>;
  type test3 = Expect<Equal<res3, ['hello', 42, {}, []]>>;
  //                                 ^      ^
  // Note: strings and numbers are assignable to the `{}` object type.
}
