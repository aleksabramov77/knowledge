import { Equal, Expect } from '../../common';

/**
 * Create an `AllPaths` generic that returns the
 * union of all possible paths in an object.
 * A path is a succession of properties separated by dots.
 *
 * Try not to use Mapped Types!
 *
 * @examples
 * { a: unknown } => 'a'
 * { a: { b: unknown } } => 'a.b'
 */
namespace allObjectPaths {

  type AllPaths<T> = TODO

  type res1 = AllPaths<{ name: string; age: number }>;
  type test1 = Expect<Equal<res1, "name" | "age">>;

  type res2 = AllPaths<{ user: { name: { first: string } } }>;
  type test2 = Expect<Equal<res2, "user" | "user.name" | "user.name.first">>;

  type res3 = AllPaths<{ user: { name: { first: string; last: string } } }>;
  type test3 = Expect<Equal<res3, "user" | "user.name" | "user.name.first" | "user.name.last">>;

  type res4 = AllPaths<{
    name: string;
    age: number;
    team: { name: number; membersCount: number };
  }>;
  type test4 = Expect<
    Equal<res4, "name" | "age" | "team" | "team.name" | "team.membersCount">
  >;
}
