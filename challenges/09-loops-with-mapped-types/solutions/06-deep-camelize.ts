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
  type DeepCamelize<T> =
    /**
     * We don't want to transform keys of
     * arrays and tuples into snake case,
     * we only want to transform their content.
     *
     * For that reason, we need to handle them differently:
     */
    T extends any[]
      ? /**
         * If `T` is a tuple or an array, we loop over its
         * values and apply `DeepCamelize` to them
         * using a Mapped Type:
         */
        { [I in keyof T]: DeepCamelize<T[I]> }
      : /**
         * Otherwise, we transform object keys to snake keys
         * and recurse normally:
         */
        {
          [K in keyof T as SnakeToCamel<K>]: DeepCamelize<T[K]>;
        };

  type SnakeToCamel<Str> = Str extends `${infer First}_${infer Rest}`
    ? `${First}${Capitalize<SnakeToCamel<Rest>>}`
    : Str;

  // single layer
  type res1 = DeepCamelize<{ public_key: string; private_key: string }>;
  type test1 = Expect<Equal<res1, { publicKey: string; privateKey: string }>>;

  // nested object
  type res2 = DeepCamelize<{
    url: { path: string; search_params?: { user_id: string } };
  }>;
  type test2 = Expect<Equal<res2, { url: { path: string; searchParams?: { userId: string } } }>>;

  // objects and arrays
  type res3 = DeepCamelize<{
    game_name: string;
    players: { user_name: string; user_id: number }[];
  }>;
  type test3 = Expect<
    Equal<res3, { gameName: string; players: { userName: string; userId: number }[] }>
  >;

  // tuples
  type res4 = DeepCamelize<[{ session_id: string }, { error_messages: string[] }]>;
  type test4 = Expect<Equal<res4, [{ sessionId: string }, { errorMessages: string[] }]>>;
}
