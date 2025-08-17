import { Equal, Expect } from '../../common';

/**
 * Using what we've learned in chapter 7, implement
 * a `DeepCamelize` generic to turn all keys in a deeply
 * nested structure of objects, arrays and tuples from snake_case
 * to camelCase.
 *
 * Hint: Be careful not to apply key remapping to arrays and tuples.
 */
namespace deepCamelize {
  type DeepCamelize<T> = TODO

  // single layer
  type res1 = DeepCamelize<{ public_key: string; private_key: string }>;
  type test1 = Expect<Equal<res1, { publicKey: string; privateKey: string }>>;

  // nested object
  type res2 = DeepCamelize<{
    url: { path: string; search_params?: { user_id: string } };
  }>;
  type test2 = Expect<
    Equal<res2, { url: { path: string; searchParams?: { userId: string } } }>
  >;

  // objects and arrays
  type res3 = DeepCamelize<{
    game_name: string;
    players: { user_name: string; user_id: number }[];
  }>;
  type test3 = Expect<
    Equal<
      res3,
      { gameName: string; players: { userName: string; userId: number }[] }
    >
  >;

  // tuples
  type res4 = DeepCamelize<
    [{ session_id: string }, { error_messages: string[] }]
  >;
  type test4 = Expect<
    Equal<res4, [{ sessionId: string }, { errorMessages: string[] }]>
  >;
}
