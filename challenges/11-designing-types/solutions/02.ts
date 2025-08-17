import { Compute, Equal, Expect } from '../../common';

/**
 *  Make the `body` parameter type-safe!
 *  Given the following predicates:
 */
declare const isComment: (x: unknown) => x is Comment;
declare const isVideo: (x: unknown) => x is Video;

/* `body` should be correctly narrowed:  */
route('POST /comments')
  .validateBody(isComment)
  .handle(({ body }) => {
    type test = Expect<Equal<typeof body, Comment>>;
    return '✅';
  });

route('PUT /video/:id')
  .validateBody(isVideo)
  .handle(({ body }) => {
    type test = Expect<Equal<typeof body, Video>>;
    return '✅';
  });

/**
 * Modify the `route` function and its methods
 * to keep track of the type of `body`! 👇
 */

/*
   First, let's add a body field to our RouteState:
                                                  */
type RouteStateConstraint = {
  method: Method;
  isValid: boolean;
  body: unknown;
  /*       👆
    We use `unknown` as a constraint
    because all types are assignable to it.  */
};

type InitialRouteState<Path, Body> = {
  method: GetMethod<Path>;
  isValid: GetMethod<Path> extends 'GET' ? true : false;
  body: Body; // 👈
};

declare function route<const Path extends string>(
  path: Path,
): Route<InitialRouteState<Path, unknown>>;
/*                                 👆
               By default, `body` is unknown.    */

/*
   We have extracted the types of `handle` and `validateBody`
   to separate generic types for readability:              */
type Route<State extends RouteStateConstraint> = {
  isAuthenticated: () => Route<State>;
  isAdmin: () => Route<State>;

  validateBody: ValidateBodyMethod<State>;
  handle: HandleMethod<State>;
};

/*
   We need to extract the narrowed type of Body from the
   `isValid` predicate.                                     */
type ValidateBodyMethod<State extends RouteStateConstraint> = State['method'] extends 'GET'
  ? GETBodyError
  : /* We need to make `validateBody` generic
         👇                                       */
    <Body>(
      isValid: (body: unknown) => body is Body,
      /*                                  👆
            and use the `Body` parameter to let TypeScript
            infer its type!                                   */
    ) => Route<Assign<State, { isValid: true; body: Body }>>;
//                 We can now assign Body to our state 👆

/*
   Lastly, we need to use `State["body"]` in the definition of the
   handler function.
   `body` is contained in the `ParsedRequest` object, so
   we have to make it generic:
                                                                    */
type ParsedRequest<Body> = {
  cookies: Record<string, string>;
  params: Record<string, string>;
  body: Body;
};

/* And we can pass this parameter by reading the State type:  */
type HandleMethod<State extends RouteStateConstraint> = State['isValid'] extends false
  ? UnvalidatedBodyError<State['method']>
  : (
      //                             👇
      fn: (req: ParsedRequest<State['body']>) => string | Promise<string>,
    ) => Route<State>;

/*
  That's it! 😌
                */

/**
 * Helper types and functions
 */

type Comment = { content: string; author: string };

type Video = { src: string; title: string };

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH';

type GetMethod<P> = P extends `${infer M extends Method} ${string}` ? M : never;

type Assign<A, B> = Compute<Omit<A, keyof B> & B>;

type GETBodyError = ".validateBody(...) isn't available on GET routes.";

type UnvalidatedBodyError<M extends Method> =
  `You must call .validateBody(...) before .handle(...) on ${M} routes.`;

export {};
