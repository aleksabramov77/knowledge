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
 * { a: { b: unknown } } => 'a' | 'a.b'
 */
namespace allObjectPaths {
  type AllPaths<T> =
    // if `T` is an object with string keys
    T extends Record<string, unknown>
      ? // Assign the union `keyof T` to a variable `K`
        keyof T extends infer K
        ? // We distribute K.
          // For each member in `K`:
          K extends string
          ? // Concat `K` with the rest of the path
            K | `${K}.${AllPaths<T[K]>}`
          : // unreachable branch (`K` is always a string)
            never
        : // unreachable branch (`extends infer` is always truthy)
          never
      : // if `T` isn't a record, we return the empty type
        never;

  // Alternative implementation using a Mapped Type,
  // A feature we will get to know in the next chapter:
  type AllPaths2<T> = {
    [K in keyof T]: K | `${Extract<K, string>}.${AllPaths<T[K]>}`;
  }[keyof T];

  type res1 = AllPaths<{ name: string; age: number }>;
  type test1 = Expect<Equal<res1, 'name' | 'age'>>;

  type res2 = AllPaths<{ user: { name: { first: string } } }>;
  type test2 = Expect<Equal<res2, 'user' | 'user.name' | 'user.name.first'>>;

  type res3 = AllPaths<{ user: { name: { first: string; last: Error } } }>;
  type test3 = Expect<Equal<res3, 'user' | 'user.name' | 'user.name.first' | 'user.name.last'>>;

  type res4 = AllPaths<{
    name: string;
    age: number;
    team: { name: number; membersCount: number };
  }>;
  type test4 = Expect<Equal<res4, 'name' | 'age' | 'team' | 'team.name' | 'team.membersCount'>>;
}
