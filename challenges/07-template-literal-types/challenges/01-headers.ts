/**
 * Type the HTTPHeaders object so that it has an `Authentication`
 * property that starts with `Bearer ` and ends with a JWT token.
 *
 * Note: JWT tokens contain 3 parts, separated by dots.
 * More info on https://jwt.io
 *
 * Hint: You shouldn't need a conditional type.
 */
namespace headers {
  type HTTPHeaders = {
    Authentication: TODO;
  };

  const test1: HTTPHeaders = {
    // ✅ This is a correct authentication header:
    Authentication:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtIjoiWW91J3JlIGEgbmVyZCA7KSJ9.gfB7ECp1ePeIB4Mh_3Ypci4y7jFjMH9w_BB4rZcMvQM',
  };

  const test2: HTTPHeaders = {
    // @ts-expect-error: ❌ Authentication should start with 'Bearer'
    Authentication: 'a.b.c',
  };

  const test3: HTTPHeaders = {
    // @ts-expect-error: ❌ Authentication should start with 'Bearer'
    Authentication: 'oops a.b.c',
  };

  const test4: HTTPHeaders = {
    // @ts-expect-error: ❌ token is invalid, only 1 part.
    Authentication: 'Bearer abc',
  };

  const test5: HTTPHeaders = {
    // @ts-expect-error: ❌ token is invalid, only 2 parts.
    Authentication: 'Bearer abc.123',
  };
}

export {};
