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
  type P = HTMLElementTagNameMap["p"];
  //   👆 For example, here is how to get the element type for "p".

  function querySelector<S extends string>(
    selector: S
  ): SelectorToElement<S> | null {
    return document.querySelector(selector) as any;
  }

  type SelectorToElement<Selector> = TODO

  const res1 = querySelector("p");
  type test1 = Expect<Equal<typeof res1, HTMLParagraphElement | null>>;

  const res2 = querySelector("div.className");
  type test2 = Expect<Equal<typeof res2, HTMLDivElement | null>>;

  const res3 = querySelector("div > a");
  type test3 = Expect<Equal<typeof res3, HTMLAnchorElement | null>>;

  const res4 = querySelector("p[attr]");
  type test4 = Expect<Equal<typeof res4, HTMLParagraphElement | null>>;

  const res5 = querySelector("div p.text a[href='#']");
  type test5 = Expect<Equal<typeof res5, HTMLAnchorElement | null>>;
}
