import { Equal, Expect } from '../../common';

/**
 * `map` transforms all values in an array to a value of
 * different type. Make it generic!
 */
namespace map {
  function map<A, B>(array: A[], fn: (value: A) => B): B[] {
    return array.map(fn);
  }

  let input1 = [1, 2, 3];
  let res1 = map(input1, (value) => value.toString());

  type test1 = Expect<Equal<typeof res1, string[]>>;

  let input2 = ['Hello', 'Hola', 'Bonjour'];
  let res2 = map(input2, (str) => str.length);

  type test2 = Expect<Equal<typeof res2, number[]>>;
}
