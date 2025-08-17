import { Equal, Expect } from '../../common';

/**
 * Implement a `GetColor` generic that takes
 * a union of `LogStatus` string and return
 * the appropriate union of colors for
 * these statuses among "red", "orange" and "blue".
 */
namespace getColor {
  type LogStatus = 'error' | 'warning' | 'info';

  type GetColor<Status extends LogStatus> =
    // Since conditional types distribute over
    // unions, we can just pretend we are dealing
    // with a single type at a time:
    Status extends 'error' ? 'red' : Status extends 'warning' ? 'orange' : 'blue';

  // Alternative solution using an object type:
  type GetColor2<Status extends LogStatus> = {
    error: 'red';
    warning: 'orange';
    info: 'blue';
  }[Status];

  type res1 = GetColor<'error'>;
  type test1 = Expect<Equal<res1, 'red'>>;

  type res2 = GetColor<'error' | 'warning'>;
  type test2 = Expect<Equal<res2, 'red' | 'orange'>>;

  type res3 = GetColor<'warning' | 'info'>;
  type test3 = Expect<Equal<res3, 'orange' | 'blue'>>;

  type res4 = GetColor<'error' | 'warning' | 'info'>;
  type test4 = Expect<Equal<res4, 'red' | 'orange' | 'blue'>>;
}
