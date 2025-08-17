/**
 * Return the following error message from `router.add()`
 * if the route is unreachable.
 */
type UnreachableRouteError<ShadowPath extends string> =
  `This route is being shadowed by '${ShadowPath}'.`;

/**
 * Remember that `IsShadowing` is in scope:
 */
type IsShadowing<Path1, Path2> =
  ParamsToStrings<Path2> extends ParamsToStrings<Path1> ? true : false;

namespace testCases {
  const handler = () => '...';

  const router1 = router()
    .add(route('GET /').handle(handler))
    // @ts-expect-error ❌
    .add(route('GET /').handle(handler));

  const router2 = router()
    .add(route('GET /user/:username').handle(handler))
    // @ts-expect-error ❌
    .add(route('GET /user/:name').handle(handler));

  const router3 = router()
    .add(route('GET /user/:username').handle(handler))
    .add(route('GET /').handle(handler))
    // @ts-expect-error ❌
    .add(route('GET /user/:username/followers').handle(handler));

  const router4 = router()
    .add(route('GET /trick/:trickId').handle(handler))
    .add(route('PUT /trick/:trickId').validateBody(isTrick).handle(handler)); // ✅

  const router5 = router()
    .add(route('GET /user/:username/followers').handle(handler))
    .add(route('GET /user/:username').handle(handler)); // ✅;

  declare function isTrick(x: unknown): x is unknown;
}

/**
 *
 * Update the types of our `router` function! 👇
 *
 */

/**
 * First, let's update the RouteState type to
 * contain the full route path, so that we can
 * read it in the router later:
 */

type RouteStateConstraint = {
  path: string; // 👈 new
  method: Method;
  isValid: boolean;
  body: unknown;
  hasIsAuthenticatedBeenCalled: boolean;
  hasIsAdminBeenCalled: boolean;
};

type InitialRouteState<Path extends string, Body> = {
  path: Path; // 👈 new
  method: GetMethod<Path>;
  isValid: GetMethod<Path> extends 'GET' ? true : false;
  body: Body;
  hasIsAuthenticatedBeenCalled: false;
  hasIsAdminBeenCalled: false;
};

/**
 * Then, let's add a type parameter to track
 * the list of paths that are already handled.
 */
//            👇
type Router_1<Paths extends string[] = []> = {
  add: <S extends RouteStateConstraint>(route: Route<S>) => Router_1<[...Paths, S['path']]>;
  /*              👆
        We accumulate route paths
        every time we call .add()     */
  start: (port: number) => void;
};

/**
 * Now, we can write our Type Validator function
 * that rejects unreachable routes!
 */

type Router<Paths extends string[] = []> = {
  add: <S extends RouteStateConstraint>(
    route: ValidateReachable<Route<S>, Paths>,
    //          👆
    // We wrap it in our validator.
  ) => Router<[...Paths, S['path']]>;
  start: (port: number) => void;
};

type ValidateReachable<R, Paths extends string[]> =
  R extends Route<infer State>
    ? //    👇 we try to find a path that shadows this one
      FindShadowingPath<State['path'], Paths> extends infer ShadowPath
      ? // If the result is a string,
        // then we raise the error:
        ShadowPath extends string
        ? UnreachableRouteError<ShadowPath>
        : // Otherwise we return the input Route type
          // because it is valid!
          R
      : never
    : never;

/**
 * This is a typical example of a type-level
 * find function, as we've seen in chapter 6:
 */
type FindShadowingPath<NewPath, ExistingPaths> = ExistingPaths extends [infer First, ...infer Rest]
  ? IsShadowing<First, NewPath> extends true
    ? First
    : FindShadowingPath<NewPath, Rest>
  : undefined;

/**
 * That's it!
 */

export declare function router(): Router;

export declare function route<const P extends string>(
  path: ValidateRoute<P>,
): Route<InitialRouteState<P, unknown>>;

/**
 * You shouldn't have to update anything beyond this point.
 */

type ParamsToStrings<Path> = Path extends `${infer Start}/${infer Rest}`
  ? `${ParamsToStrings<Start>}/${ParamsToStrings<Rest>}`
  : Path extends `:${string}`
    ? string
    : Path;

type Route<State extends RouteStateConstraint> = {
  isAuthenticated: IsAuthenticatedMethod<State>;
  isAdmin: IsAdminMethod<State>;
  handle: HandleMethod<State>;
  validateBody: ValidateBodyMethod<State>;
};

type IsAuthenticatedMethod<State extends RouteStateConstraint> =
  State['hasIsAuthenticatedBeenCalled'] extends true
    ? SeveralAuthError
    : () => Route<Assign<State, { hasIsAuthenticatedBeenCalled: true }>>;

type IsAdminMethod<State extends RouteStateConstraint> =
  // We guard against invalid cases:
  State['hasIsAdminBeenCalled'] extends true
    ? SeveralAdminError
    : State['hasIsAuthenticatedBeenCalled'] extends false
      ? UnauthenticatedAdminError
      : () => Route<Assign<State, { hasIsAdminBeenCalled: true }>>;

type HandleMethod<State extends RouteStateConstraint> = State['isValid'] extends false
  ? UnvalidatedBodyError<State['method']>
  : (fn: (req: ParsedRequest<State['body']>) => string | Promise<string>) => Route<State>;

type ValidateBodyMethod<State extends RouteStateConstraint> = State['method'] extends 'GET'
  ? GETBodyError
  : <Body>(
      isValid: (body: unknown) => body is Body,
    ) => Route<Assign<State, { isValid: true; body: Body }>>;

type ParsedRequest<Body> = {
  cookies: Record<string, string>;
  params: Record<string, string>;
  body: Body;
};

/**
 * Error messages
 */

type NoSpacesError = "Spaces aren't allowed in route paths.";
type GETBodyError = ".validateBody(...) isn't available on GET routes.";
type UnvalidatedBodyError<M extends Method> =
  `You must call .validateBody(...) before .handle(...) on ${M} routes.`;
type SeveralAuthError = '.isAuthenticated() can only be called once.';
type SeveralAdminError = '.isAdmin() can only be called once.';
type UnauthenticatedAdminError = 'You must call .isAuthenticated() before .isAdmin().';

/**
 * Route validation logic
 */
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH';

type Suggestions<Path extends string> = NoInfer<`${Method} ${Path}` | `${Method} /`>;

type ValidateRoute<Path extends string> = Path extends `${string} ${string} ${string}`
  ? NoSpacesError
  : Path extends `${Method} ${string}`
    ? Path
    : Suggestions<Path>;

/**
 * Helpers
 */

type Compute<T> = { [K in keyof T]: T[K] } | never;

type Assign<A, B> = Compute<Omit<A, keyof B> & B>;

type GetMethod<P> = P extends `${infer M extends Method} ${string}` ? M : never;
