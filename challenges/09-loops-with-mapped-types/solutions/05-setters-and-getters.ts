import { Equal, Expect } from '../../common';

/**
 * Implement a `SettersAngGetters` generic that takes an object
 * type, and returns a new object with a getter and a setter method
 * for each of the keys present on this object
 */
namespace settersAndGetters {
  type SettersAngGetters<Obj> = {
    [Entry in SetterGetterEntries<Obj> as Entry[0]]: Entry[1];
    //               👆
    //  Use the entries pattern to create
    // entries for setters and getter functions.
  };

  type SetterGetterEntries<T, K extends keyof T = keyof T> =
    // We distribute the conditional expression over `K`
    // while giving it a string constraint:
    K extends string
      ? // This creates two entries for each key:
        [`get${Capitalize<K>}`, () => T[K]] | [`set${Capitalize<K>}`, (value: T[K]) => void]
      : never;

  type res1 = SettersAngGetters<{ theme: 'light' | 'dark' }>;
  type tes1 = Expect<
    Equal<
      res1,
      {
        getTheme: () => 'light' | 'dark';
        setTheme: (value: 'light' | 'dark') => void;
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
