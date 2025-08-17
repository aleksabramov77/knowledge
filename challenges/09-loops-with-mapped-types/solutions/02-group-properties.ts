import { Equal, Expect } from '../../common';

/**
 * The `groupProperties` function takes a homogenous
 * list of objects, and returns a single object
 * where all properties contain lists of values.
 * Make it generic!
 */
namespace groupProperties {
  declare function groupProperties<T>(args: T[]): ValuesToArrays<T>;

  type ValuesToArrays<T> = { [K in keyof T]: T[K][] };
  //               We put each value in an array 👆

  const input1 = [
    { x: 0, y: 0 },
    { x: 12, y: 2 },
    { x: 7, y: -2 },
  ];
  const res1 = groupProperties(input1);
  type test1 = Expect<Equal<typeof res1, { x: number[]; y: number[] }>>;

  const input2 = [
    { title: '🧐', createdAt: 1678282179 },
    { title: '🔥', createdAt: 1678283456 },
  ];
  const res2 = groupProperties(input2);
  type test2 = Expect<Equal<typeof res2, { title: string[]; createdAt: number[] }>>;

  const input3 = [{}, {}, {}];
  const res3 = groupProperties(input3);
  type test3 = Expect<Equal<typeof res3, {}>>;
}
