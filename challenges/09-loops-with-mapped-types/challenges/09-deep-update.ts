import { Equal, Expect } from '../../common';

/**
 * Let's type lodash's `update` function.
 *
 * `update` takes an object, a path to one of the
 * value it contains, and an `updater` function that
 * takes the value under this path and can turn it
 * into a value of a different type.
 *
 * @examples
 * ```ts
 * const player = { position: { x: "1", y: 0 } };
 * const res1 = update(player, "position.x", toNumber);
 * //    ^? { position: { x: number, y: number } }
 *
 * const pkg = { name: "such-wow", releases: [{ version: 1 }] };
 * const res2 = update(pkg, "releases[0].version", (v) => `${v}.0.0`);
 * //    ^? { name: string, releases: { version: string }[] }
 */
namespace deepUpdate {
  declare function update<Obj, Path extends string, T>(
    obj: Obj,
    path: Path,
    updater: (value: GetDeep<Obj, Path>) => T
  ): SetDeep<Obj, Path, T>;

  // Hint: It's easier if you start by parsing the
  // `Path` string into a list of properties!
  type SetDeep<Obj, Path, T> = TODO;

  type GetDeep<Obj, Path> = TODO;

  const player = { position: { x: "1", y: 0 } };
  declare function toNumber(x: unknown): number;
  const res1 = update(player, "position.x", toNumber);
  type test1 = Expect<
    Equal<typeof res1, { position: { x: number; y: number } }>
  >;

  const pkg = { name: "such-wow", releases: [{ version: 1 }] };
  const res2 = update(pkg, "releases[0].version", (v) => `${v}.0.0`);
  type test2 = Expect<
    Equal<typeof res2, { name: string; releases: { version: string }[] }>
  >;

  declare const input3: [0, [1, [2, [3]]]];
  const res3 = update(input3, "[1][1][1][0]", () => 42 as const);
  type test3 = Expect<Equal<typeof res3, [0, [1, [2, [42]]]]>>;
}
