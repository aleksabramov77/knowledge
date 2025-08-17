import { Equal, Expect } from '../../common';

/**
 * Write a type-level function that transforms
 * snake_case strings into camelCase.
 */
namespace snakeToCamel {
  type SnakeToCamel<Str> = TODO;

  // it should let strings with no underscore in them unchanged
  type res1 = SnakeToCamel<'hello'>;
  type test1 = Expect<Equal<res1, 'hello'>>;

  // one underscore
  type res2 = SnakeToCamel<'hello_world'>;
  type test2 = Expect<Equal<res2, 'helloWorld'>>;

  // many underscores
  type res3 = SnakeToCamel<'hello_type_level_type_script'>;
  type test3 = Expect<Equal<res3, 'helloTypeLevelTypeScript'>>;
}
