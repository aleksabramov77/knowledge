import { Equal, Expect } from '../../common';

/**
 * Implement `IsShadowing`:
 */
export type IsShadowing<Path1, Path2> = TODO;

/**
 * Does shadow:
 */
type res1 = IsShadowing<"GET /", "GET /">;
type test1 = Expect<Equal<res1, true>>;

type res2 = IsShadowing<"GET /user/:name", "GET /user/:username">;
type test2 = Expect<Equal<res2, true>>;

type res3 = IsShadowing<"GET /user/:name", "GET /user/:name/profile">;
type test3 = Expect<Equal<res3, true>>;

/**
 * Does not shadow:
 */
type res4 = IsShadowing<"GET /", "GET /users">;
type test4 = Expect<Equal<res4, false>>;

type res5 = IsShadowing<"GET /trick/:trickId", "GET /">;
type test5 = Expect<Equal<res5, false>>;

type res6 = IsShadowing<"GET /trick/:trickId", "PUT /trick/:trickId">;
type test6 = Expect<Equal<res6, false>>;
