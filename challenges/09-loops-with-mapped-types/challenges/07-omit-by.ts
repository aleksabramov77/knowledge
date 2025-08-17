import { Equal, Expect } from '../../common';

/**
 * Let's improve the type-safety of lodash's `omitBy` function.
 * `omitBy` takes an object, a type predicate, and removes
 * keys that do not pass this predicate.
 *
 * The output type should:
 * - Keep keys that are *not* assignable to the predicate's return type.
 * - Remove keys that are *equal* to the predicate's return type.
 * - Make keys that aren't equal but *assignable* to the predicate's
 *   return type *optional*.
 *
 * @examples:
 *
 * let res1 = omitBy({ name: 'a', age: 1 }, isNumber) // => { name: 'a' }
 * //    ^? { name: string }
 * let res2 = omitBy({ name: 'a', age: 1 }, isString) // => { age: 1 }
 * //    ^? { age: number }
 * let res3 = omitBy({ key: Math.random() > .5 ? 'a' : 1 }, isString)
 * //    ^? { key?: number }
 */
namespace omitBy {
  declare function omitBy(
    obj: TODO,
    predicate: (value: TODO) => value is TODO
  ): OmitBy<TODO, TODO>;

  type OmitBy<Obj, OmittedValue> = TODO

  // Predicate functions:
  const isUndefined = (x: unknown): x is undefined => typeof x === "undefined";
  const isNumber = (x: unknown): x is number => typeof x === "number";
  const isString = (x: unknown): x is string => typeof x === "string";

  // Tests:
  declare const user: { name: string; age: number | undefined };
  const res1 = omitBy(user, isUndefined);
  type test1 = Expect<Equal<typeof res1, { name: string; age?: number }>>;

  declare const video: { src: string; createdAt: number; updatedAt: number };
  const res2 = omitBy(video, isNumber);
  type test2 = Expect<Equal<typeof res2, { src: string }>>;

  declare const image: { src: string; id: number | string };
  const res3 = omitBy(image, isString);
  type test3 = Expect<Equal<typeof res3, { id?: number }>>;
}
