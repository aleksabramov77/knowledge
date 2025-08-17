import { Equal, Expect } from '../../common';

/**
 * implement a generic to extract the type of the
 * `name` property from an object type.
 *
 * Note: This generic must also accept objects that
 *       Don't have a name property, and return
 *       `undefined` in this case.
 */
namespace getName {
  type GetName<Input> = TODO;

  type res1 = GetName<{ name: 'Gabriel' }>;
  type test1 = Expect<Equal<res1, 'Gabriel'>>;

  type res2 = GetName<{ name: string; age: number }>;
  type test2 = Expect<Equal<res2, string>>;

  type res3 = GetName<{ age: number }>;
  type test3 = Expect<Equal<res3, undefined>>;

  type res4 = GetName<{
    name: { firstName: string; lastName: string };
    age: number;
  }>;
  type test4 = Expect<Equal<res4, { firstName: string; lastName: string }>>;
}
