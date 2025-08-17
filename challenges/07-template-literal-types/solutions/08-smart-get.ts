import { Equal, Expect } from '../../common';

/**
 * Type the "get" function to infer its return type
 * from the object's type and the "path" string.
 */
namespace smartGet {
  declare function get<T, S extends string>(obj: T, path: S): GetFromPath<T, S>;

  // We first need to parse the path string into a list of Properties,
  // Then, we recursively access Properties on the input object.
  type GetFromPath<Obj, Path> = RecursiveGet<Obj, ParsePath<Path>>;

  // transform the path into a list of properties,
  // we need to check if each character  belongs to the
  // `"." | "[" | "]"` union type. If it does, we split
  // the string at this position. If it does not, we
  // keep going.
  //
  // This is similar to the `RemovePunctuation` generic we have
  // seen in this chapter, except we create a tuple type instead
  // of a string here.
  type ParsePath<
    // our unparsed path string
    Path,
    // `Properties` is our list of properties:
    Properties extends string[] = [],
    // `CurrentProp` is the property name currently in progress:
    CurrentProp extends string = '',
  > =
    // Split the path after the first character
    Path extends `${infer First}${infer Rest}`
      ? // if the first character is a delimiter
        First extends '.' | '[' | ']'
        ? // we add the CurrentProp to `Properties` if it isn't
          // an empty string.
          ParsePath<Rest, [...Properties, ...(CurrentProp extends '' ? [] : [CurrentProp])], ''>
        : // Otherwise, we add the first character to the
          // current property name:
          ParsePath<Rest, Properties, `${CurrentProp}${First}`>
      : // If the input string is empty, we return the list of
        // properties, with the current prop appended to it.
        [...Properties, ...(CurrentProp extends '' ? [] : [CurrentProp])];

  // Then we need to loop on the list of properties
  // and get the corresponding value from the object.
  // We recurse until the list is empty
  type RecursiveGet<Obj, Properties> = Properties extends [infer First, ...infer Rest]
    ? First extends keyof Obj
      ? RecursiveGet<Obj[First], Rest>
      : // Special case if `Obj` is an array
        // and the path is a number string.
        // in this case we read the array's inner
        // type using `array[number]`.
        [First, Obj] extends [`${number}`, any[]]
        ? RecursiveGet<As<Obj, any[]>[number], Rest>
        : undefined
    : Obj;

  // We have seen `As` in Chapter 6. It
  // forces typescript to consider that
  // the first type parameter is a subtype
  // of the second.
  type As<A, B> = A extends B ? A : never;

  // several object keys
  declare const obj1: { a: { b: { c: string } } };
  const res1 = get(obj1, 'a.b.c');
  type test1 = Expect<Equal<typeof res1, string>>;

  // objects and arrays
  declare const obj2: { author: { friends: [{ age: 29 }] } };
  const res2 = get(obj2, 'author.friends[0].age');
  type test2 = Expect<Equal<typeof res2, 29>>;

  // accessing a precise index of a tuple type
  declare const obj3: { author: { friends: [undefined, { name: 'Bob' }] } };
  const res3 = get(obj3, 'author.friends[1].name');
  type test3 = Expect<Equal<typeof res3, 'Bob'>>;

  // several tuple types
  declare const obj4: [1, 2, [3, [{ title: '🎉' }]]];
  const res4 = get(obj4, '[2][1][0].title');
  type test4 = Expect<Equal<typeof res4, '🎉'>>;
}
