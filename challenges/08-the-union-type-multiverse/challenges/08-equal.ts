import { Equal, Expect } from '../../common';

/**
 * Implement a `MyEqual` generic that checks if
 * 2 types are equal. It should support union types,
 * but it doesn't need to support `any`.
 *
 * Note: `Equal` is already in scope, but you
 * aren't allowed to use it! 😅
 */
namespace equal {
  type MyEqual<A, B> = TODO

  type res1 = MyEqual<"a", "a">;
  type test1 = Expect<Equal<res1, true>>;

  type res2 = MyEqual<"a", "b">;
  type test2 = Expect<Equal<res2, false>>;

  type res3 = MyEqual<1 | 2, 1 | 2>;
  type test3 = Expect<Equal<res3, true>>;

  type res4 = MyEqual<1 | 2, 2 | 3>;
  type test4 = Expect<Equal<res4, false>>;

  type res5 = MyEqual<1 | 2, never>;
  type test5 = Expect<Equal<res5, false>>;

  type res6 = MyEqual<never, 1 | 2>;
  type test6 = Expect<Equal<res6, false>>;
}
