import { Equal, Expect } from '../../common';

/**
 * Implement a `MakeEnum` generic taking a union of strings
 * and returning an object with a `key: value` pair for
 * each element in the union.
 * Keys and values should be the same.
 */
namespace makeEnum {
  type MakeEnum<Props> = TODO

  type res1 = MakeEnum<"red" | "green" | "blue">;
  type tes1 = Expect<Equal<res1, { red: "red"; green: "green"; blue: "blue" }>>;

  type res2 = MakeEnum<"cat">;
  type tes2 = Expect<Equal<res2, { cat: "cat" }>>;

  type res3 = MakeEnum<never>;
  type tes3 = Expect<Equal<res3, {}>>;
}
