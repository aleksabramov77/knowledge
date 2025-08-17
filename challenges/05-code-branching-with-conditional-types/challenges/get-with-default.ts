import { Equal, Expect } from '../../common';

/**
 * Type the `getWithDefault` function. It takes a key, an object
 * and a default value.
 *  - If the key exists on the object, it returns the corresponding
 *    value with the right type.
 *  - Otherwise, it returns the default value.
 *
 * Note: The type of the property and the type of the default value
 * can be different.
 */
namespace getWithDefault {
  type GetWithDefault<Key, Obj, Default> = TODO

  function getWithDefault<K extends string, O extends {}, D>(
    key: K,
    obj: O,
    defaultValue: D
  ): GetWithDefault<K, O, D> {
    return (obj as any)[key] ?? defaultValue;
  }

  const res1 = getWithDefault("title", { title: "Conditional Types" }, "hello");
  type test1 = Expect<Equal<typeof res1, string>>;

  const res2 = getWithDefault("oops", { title: "Conditional Types" }, undefined);
  type test2 = Expect<Equal<typeof res2, undefined>>;

  const res3 = getWithDefault("age", { age: 29 }, 0);
  type test3 = Expect<Equal<typeof res3, number>>;

  const res4 = getWithDefault("friends", { age: 29 }, ["Bob"]);
  type test4 = Expect<Equal<typeof res4, string[]>>;
}
