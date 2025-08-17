import { Equal, Expect } from '../../common';

/**
 * Implement a `SettersAngGetters` generic that takes an object
 * type, and returns a new object with a getter and a setter method
 * for each of the keys present on this object
 */
namespace settersAndGetters {
  type SettersAngGetters<Obj> = TODO

  type res1 = SettersAngGetters<{ theme: "light" | "dark" }>;
  type tes1 = Expect<
    Equal<
      res1,
      {
        getTheme: () => "light" | "dark";
        setTheme: (value: "light" | "dark") => void;
      }
    >
  >;

  type res2 = SettersAngGetters<{ name: string; age: number }>;
  type tes2 = Expect<
    Equal<
      res2,
      {
        getName: () => string;
        setName: (value: string) => void;
        getAge: () => number;
        setAge: (value: number) => void;
      }
    >
  >;

  type res3 = SettersAngGetters<{}>;
  type tes3 = Expect<Equal<res3, {}>>;
}
