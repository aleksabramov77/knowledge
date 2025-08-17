import { Compute } from '../../common';

/**
 *  Make sure `isAuthenticated()` and  `isAdmin()`
 *  are always used correctly!
 */

route('GET /tricks/:trickId/details')
  .isAuthenticated()
  // @ts-expect-error ❌ already authenticated.
  .isAuthenticated();

route('GET /admin/dashboard')
  // @ts-expect-error ❌ not authenticated.
  .isAdmin();

route('GET /admin/dashboard')
  .isAuthenticated()
  .isAdmin()
  // @ts-expect-error ❌ already admin.
  .isAdmin();

route('GET /admin/dashboard')
  .isAuthenticated()
  .isAdmin()
  .handle(() => `📈`); // ✅

/**
 * Modify the `route` function and its methods 👇
 */

type SeveralAuthError = '.isAuthenticated() can only be called once.';
type SeveralAdminError = '.isAdmin() can only be called once.';
type UnauthenticatedAdminError = 'You must call .isAuthenticated() before .isAdmin().';

type RouteStateConstraint = {
  method: Method;
  isValid: boolean;
  body: unknown;
  // We add 2 new booleans:
  hasIsAuthenticatedBeenCalled: boolean;
  hasIsAdminBeenCalled: boolean;
};

type InitialRouteState<Path, Body> = {
  method: GetMethod<Path>;
  isValid: GetMethod<Path> extends 'GET' ? true : false;
  body: Body;
  // They default to false
  hasIsAuthenticatedBeenCalled: false;
  hasIsAdminBeenCalled: false;
};

/**
 * Let's update the definition of `isAuthenticated()`
 * and `isAdmin()` to flip these flags:
 */
declare function route<const Path extends string>(
  path: Path,
): Route<InitialRouteState<Path, unknown>>;

type Route<State extends RouteStateConstraint> = {
  isAuthenticated: IsAuthenticatedMethod<State>;
  isAdmin: IsAdminMethod<State>;
  validateBody: ValidateBodyMethod<State>;
  handle: HandleMethod<State>;
};

type IsAuthenticatedMethod<State extends RouteStateConstraint> =
  // We guard against invalid cases:
  State['hasIsAuthenticatedBeenCalled'] extends true
    ? SeveralAuthError
    : //  We update the state:
      () => Route<
        Assign<State, { hasIsAuthenticatedBeenCalled: true }>
        //                           👆
      >;

type IsAdminMethod<State extends RouteStateConstraint> =
  // We guard against invalid cases:
  State['hasIsAdminBeenCalled'] extends true
    ? SeveralAdminError
    : State['hasIsAuthenticatedBeenCalled'] extends false
      ? UnauthenticatedAdminError
      : //  We update the state:
        () => Route<
          Assign<State, { hasIsAdminBeenCalled: true }>
          //                      👆
        >;

/**
 * Helper types and functions
 */

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

type HandleMethod<State extends RouteStateConstraint> = State['isValid'] extends false
  ? UnvalidatedBodyError<State['method']>
  : (fn: (req: ParsedRequest<State['body']>) => string | Promise<string>) => Route<State>;

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH';

type GetMethod<P> = P extends `${infer M extends Method} ${string}` ? M : never;

type Assign<A, B> = Compute<Omit<A, keyof B> & B>;

type GETBodyError = ".validateBody(...) isn't available on GET routes.";

type UnvalidatedBodyError<M extends Method> =
  `You must call .validateBody(...) before .handle(...) on ${M} routes.`;

export {};
