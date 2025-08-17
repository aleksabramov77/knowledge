import { Compute, Equal, Expect } from '../../common';

/**
 *  Make the `body` parameter type-safe!
 *  Given the following predicates:
 */
declare const isComment: (x: unknown) => x is Comment;
declare const isVideo: (x: unknown) => x is Video;

/* `body` should be correctly narrowed:  */
route("POST /comments")
  .validateBody(isComment)
  .handle(({ body }) => {
    type test = Expect<Equal<typeof body, Comment>>;
    return "✅";
  });

route("PUT /video/:id")
  .validateBody(isVideo)
  .handle(({ body }) => {
    type test = Expect<Equal<typeof body, Video>>;
    return "✅";
  });

/**
 * Modify the `route` function and its methods
 * to keep track of the type of `body`! 👇
 */

type RouteStateConstraint = {
  method: Method;
  isValid: boolean;
};

type InitialRouteState<P> = {
  method: GetMethod<P>;
  isValid: GetMethod<P> extends "GET" ? true : false;
};

declare function route<const P extends string>(
  path: P,
): Route<InitialRouteState<P>>;

/*
   We have extracted the types of `handle` and `validateBody`
   to separate generic types for readability:              */
type Route<State extends RouteStateConstraint> = {
  isAuthenticated: () => Route<State>;
  isAdmin: () => Route<State>;

  validateBody: ValidateBodyMethod<State>;
  handle: HandleMethod<State>;
};

type ValidateBodyMethod<State extends RouteStateConstraint> =
  State["method"] extends "GET"
    ? GETBodyError
    : (
      isValid: (body: unknown) => unknown,
    ) => Route<Assign<State, { isValid: true }>>;

type ParsedRequest = {
  cookies: Record<string, string>;
  params: Record<string, string>;
  body: any;
};

type HandleMethod<State extends RouteStateConstraint> =
  State["isValid"] extends false
    ? UnvalidatedBodyError<State["method"]>
    : (fn: (req: ParsedRequest) => string | Promise<string>) => Route<State>;

/**
 * Helper types and functions
 */

type Comment = { content: string, author: string };

type Video = { src: string, title: string };

type Method = "GET" | "POST" | "PUT" | "PATCH";

type GetMethod<P> = P extends `${infer M extends Method} ${string}` ? M : never;

type Assign<A, B> = Compute<Omit<A, keyof B> & B>;

type GETBodyError = ".validateBody(...) isn't available on GET routes.";

type UnvalidatedBodyError<M extends Method> =
  `You must call .validateBody(...) before .handle(...) on ${M} routes.`;

export {};
