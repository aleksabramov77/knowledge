import { Equal, Expect } from '../../common';

/**
 * Type the `filterTable` function to take a Table,
 * a list of column names, and to return a table that
 * only contains columns with these names.
 */
namespace filterTable {

  type Column = { name: string, values: unknown[] }

  declare function filterTable<
    // Infer `T` as a tuple containing columns:
    T extends [Column, ...Column[]],
    // Infer `N` as a union of string literal type:
    N extends string
  >(table: T, columnNames: N[]): FilterTable<T, N>;

  type FilterTable<Table, NameUnion> = TODO

  declare const userTable: [
    { name: 'firstName', values: string[] },
    { name: 'lastName', values: string[] },
    { name: 'age', values: number[] },
  ]

  const res1 = filterTable(userTable, ['age']);
  type test1 = Expect<Equal<typeof res1, [
    { name: 'age', values: number[] }
  ]>>;

  const res2 = filterTable(userTable, ['firstName', 'lastName']);
  type test2 = Expect<Equal<typeof res2, [
    { name: 'firstName', values: string[] },
    { name: 'lastName', values: string[] }
  ]>>;

  const res3 = filterTable(userTable, []);
  type test3 = Expect<Equal<typeof res3, []>>;
}
