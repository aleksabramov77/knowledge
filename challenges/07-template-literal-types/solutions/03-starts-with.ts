import { Equal, Expect } from '../../common';

/**
 * Implement a `StartsWith` generic that takes
 * 2 string literals, and returns true if the
 * first string starts with the second one.
 */
namespace startsWith {
  type StartsWith<Str extends string, Start extends string> = Str extends `${Start}${string}`
    ? true
    : false;

  type res1 = StartsWith<'getUsers', 'get'>;
  type test1 = Expect<Equal<res1, true>>;

  type res2 = StartsWith<'getArticles', 'post'>;
  type test2 = Expect<Equal<res2, false>>;

  type res3 = StartsWith<'Type-Level Programming!', 'Type'>;
  type test3 = Expect<Equal<res3, true>>;
}
