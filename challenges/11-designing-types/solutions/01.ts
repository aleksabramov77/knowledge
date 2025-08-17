import { Equal, Expect } from '../../common';

/**
 * Add code branches covering the following invalid cases:
 * - No method was provided.
 * - An unsupported method was provided.
 * - A valid method was provided, but a path is missing.
 */
type NoMethodError = 'Method missing.';
type UnknownMethodError<M extends string> = `'${M}' isn't a supported method.`;
type PathMissingError<T extends string> = `A path is missing after '${T}'.`;
type NoSpacesError = "Spaces aren't allowed in route paths.";

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH';

type ValidateRoute<Path> = Path extends `${Method} ${string} ${string}`
  ? NoSpacesError
  : Path extends `${infer M extends Method} `
    ? PathMissingError<M>
    : Path extends `${Method} ${string}`
      ? Path
      : Path extends `${infer M} ${string}`
        ? UnknownMethodError<M>
        : NoMethodError;

type res1 = ValidateRoute<'GET '>;
type test1 = Expect<Equal<res1, "A path is missing after 'GET'.">>;

type res2 = ValidateRoute<'POST '>;
type test2 = Expect<Equal<res2, "A path is missing after 'POST'.">>;

type res3 = ValidateRoute<'/no/method'>;
type test3 = Expect<Equal<res3, 'Method missing.'>>;

type res4 = ValidateRoute<'OOPS /unknown-method'>;
type test4 = Expect<Equal<res4, "'OOPS' isn't a supported method.">>;

type res5 = ValidateRoute<'GET /spaces spaces'>;
type test5 = Expect<Equal<res5, NoSpacesError>>;

type res6 = ValidateRoute<'GET /valid-route'>;
type test6 = Expect<Equal<res6, 'GET /valid-route'>>;

export {};
