import { Equal, Expect } from '../../common';

/**
 * Lodash's `partition` function takes an array, a *type guard*
 * function, and returns a *tuple* containg *two arrays*.
 * - The left array contains elements passing the predicate
 * - the right array contains elements that didn't pass
 *
 * Type `partition` so that output arrays are narrowed
 * using the return type of the guard function.
 *
 * Note: Type guards are predicate functions that TypeScript
 * can use for type narrowing. their type signatures look like this:
 * `(param) => param is SomeType`.
 * Learn more: https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 */
namespace partition {
  declare function partition(
    list: TODO,
    predicate: (value: TODO) => value is TODO
  ): TODO;

  const res1 = partition(
    [1, 2, "N/A", 7, "oops"],
    (x): x is number => typeof x === "number"
  );
  type test1 = Expect<Equal<typeof res1, [number[], string[]]>>;

  const res2 = partition(
    [true, false, 1, true, 0],
    (x): x is boolean => typeof x === "boolean"
  );
  type test2 = Expect<Equal<typeof res2, [boolean[], number[]]>>;

  const res3 = partition(
    ["value", "onChange", "onSubmit", "valid", "focused"],
    (x): x is `on${string}` => x.startsWith("on")
  );
  type test3 = Expect<Equal<typeof res3, [`on${string}`[], string[]]>>;
}
