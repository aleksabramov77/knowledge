import { Equal, Expect } from '../../common';

/**
 * Implement a generic returning:
 *  - The 2nd parameter if the 1st one is `true`
 *  - The 3rd parameter if the 1st one is `false`
 */
namespace ifElse {
  type If<Condition, Branch1, Branch2> = Condition extends true ? Branch1 : Branch2;

  type res1 = If<true, string, number>;
  type test1 = Expect<Equal<res1, string>>;

  type res2 = If<false, string, number>;
  type test2 = Expect<Equal<res2, number>>;

  type res3 = If<boolean, string, number>;
  type test3 = Expect<Equal<res3, string | number>>;
  /**                                    ^ 🤯
   * Don't worry if this doesn't fully make sense yet.
   * We will cover why this works in the advanced union
   * types chapter!
   */
}
