import { Equal, Expect } from '../../common';

/**
 * Type the "get" function to infer its return type
 * from the object's type and the "path" string.
 */
namespace smartGet {

  declare function get<T, S extends string>(
    obj: T,
    path: S
  ): TODO

  // several object keys
  declare const obj1: { a: { b: { c: string } } };
  const res1 = get(obj1, "a.b.c");
  type test1 = Expect<Equal<typeof res1, string>>;

  // objects and arrays
  declare const obj2: { author: { friends: [{ age: 29 }] } };
  const res2 = get(obj2, "author.friends[0].age");
  type test2 = Expect<Equal<typeof res2, 29>>;

  // accessing a precise index of a tuple type
  declare const obj3: { author: { friends: [undefined, { name: 'Bob' }] } };
  const res3 = get(obj3, "author.friends[1].name");
  type test3 = Expect<Equal<typeof res3, 'Bob'>>;

  // several tuple types
  declare const obj4: [1, 2, [3, [{ title: "🎉" }]]];
  const res4 = get(obj4, "[2][1][0].title");
  type test4 = Expect<Equal<typeof res4, '🎉'>>;
}
