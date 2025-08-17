import { Equal, Expect } from '../common';

/**
 * `safeHead` takes an array, a default value
 * and returns the first element of the array
 * if it isn't empty. Make it generic!
 */
namespace safeHead {
  function safeHead(array: TODO[], defaultValue: TODO): TODO {
    return array[0] ?? defaultValue;
  }

  let input1 = [1, 2, 3];
  let res1 = safeHead(input1, 0);

  type test1 = Expect<Equal<typeof res1, number>>;

  let input2 = ['Hello', 'Hola', 'Bonjour'];
  let res2 = safeHead(input2, 'Hi');

  type test2 = Expect<Equal<typeof res2, string>>;
}
