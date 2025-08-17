import { Equal, Expect } from '../../common';

/**
 * The `navigate` function takes a `Path` string that
 * can contain parameter names using the `users/:username`
 * syntax. Type it so that the `params` object provided
 * as the second argument always contains a key for each variable
 * in the `Path`.
 */
namespace parseUrlParams {
  declare function navigate<U extends string>(path: U, params: ParseUrlParams<U>): void;

  type ParseUrlParams<Url> =
    // 1. Split the string using `/`:
    Url extends `${infer Start}/${infer Rest}`
      ? // 2. Recurse on the two sides of the slash,
        //    and merge the objects with &:
        ParseUrlParams<Start> & ParseUrlParams<Rest>
      : // 3. If the url is a param, create a
        //    `{ [Param]: string }` object:
        Url extends `:${infer Param}`
        ? { [K in Param]: string }
        : // 4. Otherwise, return an empty object:
          {};

  type res1 = ParseUrlParams<'user/:userId'>;
  type test1 = Expect<Equal<res1, { userId: string }>>;

  type res2 = ParseUrlParams<'user/:userId/dashboard'>;
  type test2 = Expect<Equal<res2, { userId: string }>>;

  type res3 = ParseUrlParams<'user/:userId/dashboard/:dashboardId'>;
  type test3 = Expect<Equal<res3, { userId: string } & { dashboardId: string }>>;

  navigate('user/:userId', { userId: '2' }); // ✅

  navigate('user/:userId/dashboard', { userId: '2' }); // ✅

  // @ts-expect-error ❌ `userId` is missing.
  navigate('user/:userId/dashboard/:dashboardId', { dashboardId: '2' });

  // ❌
  navigate('user/:userId/dashboard/:dashboardId', {
    userId: '2',
    dashboardId: '2',
    // @ts-expect-error
    oops: ':(',
  });
}
