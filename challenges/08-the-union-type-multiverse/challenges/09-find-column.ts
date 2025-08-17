import { Equal, Expect } from '../../common';

/**
 * A `Table` is a tuple containing `Column`s.
 * A `Column` is an object with a `name` and a `values`
 * property.
 *
 * Using what we've learned, type the `findColumn`
 * function to take a generic `Table`, a column name and
 * return the type of its `values` property.
 *
 * Try to find a solution that doesn't involve
 * a recursive type!
 */
namespace findColumn {

  type Column = { name: string, values: unknown[] }

  declare function findColumn(table: TODO, columnNames: TODO): TODO;

  declare const userTable: [
    { name: 'firstName', values: string[] },
    { name: 'lastName', values: string[] },
    { name: 'age', values: number[] },
  ]

  const res1 = findColumn(userTable, 'age');
  type test1 = Expect<Equal<typeof res1, number[]>>;

  const res2 = findColumn(userTable, 'firstName');
  type test2 = Expect<Equal<typeof res2, string[]>>;

  declare const colName: 'firstName' | 'age'
  const res3 = findColumn(userTable, colName);
  type test3 = Expect<Equal<typeof res3, string[] | number[]>>;
}
