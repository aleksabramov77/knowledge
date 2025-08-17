import { Equal, Expect } from '../../common';

/**
 * Re-implement `SpacesToUnderscores` by defining a `Split`
 * and a `Join` generic that behaves like the value-level
 * `.split(separator)` and `.join(separator)` methods.
 */
namespace splitAndJoin {
  type SpacesToUnderscores<Str> = Join<Split<Str, " ">, "_">;

  type Split<Str, Separator extends string> = TODO

  type Join<List, Separator extends string> = TODO

  type res1 = Split<"a.b.c", ".">;
  type test1 = Expect<Equal<res1, ["a", "b", "c"]>>;

  type res2 = Join<["a", "b", "c"], ".">;
  type test2 = Expect<Equal<res2, "a.b.c">>;

  type res3 = SpacesToUnderscores<"hey">;
  type test3 = Expect<Equal<res3, "hey">>;

  type res4 = SpacesToUnderscores<"user name">;
  type test4 = Expect<Equal<res4, "user_name">>;

  type res5 = SpacesToUnderscores<"type level typescript">;
  type test5 = Expect<Equal<res5, "type_level_typescript">>;
}
