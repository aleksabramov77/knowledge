import { Equal, Expect } from '../common';

/**
 * `pipe2` takes a value and pipes it into 2 functions
 * sequentially. For example, `pipe2(x, f1, f2)` will
 * result in `f2(f1(x))`. Make it generic!
 */
namespace pipe2 {

  function pipe2(
    x: TODO,
    f1: (value: TODO) => TODO,
    f2: (value: TODO) => TODO
  ): TODO {
    return f2(f1(x));
  }

  let res1 = pipe2(
    [1, 2, 3],
    arr => arr.length,
    length => `length: ${length}`
  );

  type test1 = Expect<Equal<typeof res1, string>>;

  let res2 = pipe2(
    { name: 'Alice' },
    user => user.name,
    name => name.length > 5
  );

  type test2 = Expect<Equal<typeof res2, boolean>>;

}
