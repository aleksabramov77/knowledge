import { Equal, Expect } from '../../common';

/**
 * Type the `querySelector` function to return an HTMLElement of the
 * right type!
 *
 * Hint: TypeScript standard library exposes a `HTMLElementTagNameMap` type
 * containing all element types stored by their HTML tag name. Use it
 * to turn tag names into element types!
 */
namespace querySelector {
  function querySelector<S extends string>(selector: S): SelectorToElement<S> | null {
    return document.querySelector(selector) as any;
  }

  // Lookup the Element type from a tag name, and default to null:
  type SelectorToElement<Selector> = Get<HTMLElementTagNameMap, SelectorToTagName<Selector>, null>;

  // Get an object's property and return a default value if the key doesn't exist:
  type Get<Obj, Key, Def> = Key extends keyof Obj ? Obj[Key] : Def;

  // Turns the selector string into a tag name string:
  type SelectorToTagName<Selector> = GetTagName<GetLastWord<Selector>>;

  // Get the last word of our selector string:
  type GetLastWord<Str> = Last<Split<Str, ' '>>;

  // Get the tag name from a string like `a.class` or `a[attr]` or `a:pseudo`:
  type GetTagName<Str> = First<Split<Str, ':' | '[' | '.'>>;

  // Get the last element from a tuple
  type Last<Tuple> = Tuple extends [...any, infer LastItem] ? LastItem : never;

  // Get the first element from a tuple
  type First<Tuple> = Tuple extends [infer FirstItem, ...any] ? FirstItem : never;

  // This split function is a bit complex because it needs to support
  // a union type as a separator.
  type Split<
    Str,
    Sep extends string,
    Output extends string[] = [],
    CurrentChunk extends string = '',
  > =
    // Loop through each character:
    Str extends `${infer First}${infer Rest}`
      ? // If `First` is a separator:
        First extends Sep
        ? // Add the current chunk to our output:
          Split<Rest, Sep, [...Output, CurrentChunk], ''>
        : // Otherwise, add it to the chunk:
          Split<Rest, Sep, Output, `${CurrentChunk}${First}`>
      : // If the string is empty and `CurrentChunk` as well:
        CurrentChunk extends ''
        ? // Return the output:
          Output
        : // Otherwise, append the CurrentChunk to our Output:
          [...Output, CurrentChunk];

  const res1 = querySelector('p');
  type test1 = Expect<Equal<typeof res1, HTMLParagraphElement | null>>;

  const res2 = querySelector('div.className');
  type test2 = Expect<Equal<typeof res2, HTMLDivElement | null>>;

  const res3 = querySelector('div > a');
  type test3 = Expect<Equal<typeof res3, HTMLAnchorElement | null>>;

  const res4 = querySelector('p[attr]');
  type test4 = Expect<Equal<typeof res4, HTMLParagraphElement | null>>;

  const res5 = querySelector("div p.text a[href='#']");
  type test5 = Expect<Equal<typeof res5, HTMLAnchorElement | null>>;
}
