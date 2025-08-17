import { Equal, Expect } from '../../common';

/**
 * Lodash's `compact` function takes an array
 * that can contain "falsy values", and returns
 * an array with these values filtered out.
 * Write its generic type signature!
 *
 * Note: The list of "falsy" values is
 * false, null, 0, "", and undefined.
 */
namespace compact {
  type Falsy = false | null | 0 | undefined | '';

  declare function compact<Item>(list: Item[]): Exclude<Item, Falsy>[];
  //                 👆
  // We can use `Exclude` to remove falsy values
  // From our union type.

  let res1 = compact([1, 2, null, 3, undefined, 4]);
  type test1 = Expect<Equal<typeof res1, number[]>>;

  let res2 = compact([undefined, 0 as const, 'a', '', 'b', 'c', 'd']);
  type test2 = Expect<Equal<typeof res2, string[]>>;

  let res3 = compact([...([1, undefined, true, '', 'hello', null] as const)]);
  type test3 = Expect<Equal<typeof res3, (1 | true | 'hello')[]>>;
}
