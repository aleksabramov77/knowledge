import { Equal, Expect } from '../../common';

/**
 * Implement `IsShadowing`:
 */
export type IsShadowing<Path1, Path2> =
  ParamsToStrings<Path2> extends ParamsToStrings<Path1> ? true : false;

/**
 * Takes a route path and replace all `:params`
 * into the `string` type.
 *
 * @example
 *
 * type X = ParamsToStrings<"/test/:path"> // => `/test/${string}`
 * type Y = ParamsToStrings<"/a/:b/c/:d"> // => `/a/${string}/c/${string}`
 */
type ParamsToStrings<Path> = Path extends `${infer Start}/${infer Rest}`
  ? `${ParamsToStrings<Start>}/${ParamsToStrings<Rest>}`
  : Path extends `:${string}`
    ? string
    : Path;

/**
 * Does shadow:
 */
type res1 = IsShadowing<'GET /', 'GET /'>;
type test1 = Expect<Equal<res1, true>>;

type res2 = IsShadowing<'GET /user/:name', 'GET /user/:username'>;
type test2 = Expect<Equal<res2, true>>;

type res3 = IsShadowing<'GET /user/:name', 'GET /user/:name/profile'>;
type test3 = Expect<Equal<res3, true>>;

/**
 * Does not shadow:
 */
type res4 = IsShadowing<'GET /', 'GET /users'>;
type test4 = Expect<Equal<res4, false>>;

type res5 = IsShadowing<'GET /trick/:trickId', 'GET /'>;
type test5 = Expect<Equal<res5, false>>;

type res6 = IsShadowing<'GET /trick/:trickId', 'PUT /trick/:trickId'>;
type test6 = Expect<Equal<res6, false>>;
