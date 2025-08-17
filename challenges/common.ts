type Compute<T> = T extends object ? { [K in keyof T]: T[K] } : T;

/**
 * Equal takes 2 types and returns true if they are the same.
 */
export type Equal<X, Y> =
  (<T>() => T extends Compute<X> ? 1 : 2) extends <T>() => T extends Compute<Y> ? 1 : 2
    ? true
    : false;

/**
 * Expect takes one type parameter and only type-checks if it is true.
 */
export type Expect<T extends true> = T;

// @ts-expect-error ✅ this type-checks because
let x: number = 'Hello'; // this line does not.

// @ts-expect-error ❌ this doesn't type-check because
let y: number = 2; // this line does!
