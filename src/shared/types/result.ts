/**
 * Result 타입 - 에러 핸들링 패턴
 * 
 * try-catch 대신 타입 안전한 에러 처리
 */

export type Result<T, E = Error> = 
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

export const Ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const Err = <E>(error: E): Result<never, E> => ({ ok: false, error });

export const isOk = <T, E>(result: Result<T, E>): result is { ok: true; value: T } => result.ok;
export const isErr = <T, E>(result: Result<T, E>): result is { ok: false; error: E } => !result.ok;

export const Result = {
  map: <T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> => 
    result.ok ? Ok(fn(result.value)) : result,
  
  flatMap: <T, U, E>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E> =>
    result.ok ? fn(result.value) : result,
  
  unwrapOr: <T, E>(result: Result<T, E>, defaultValue: T): T =>
    result.ok ? result.value : defaultValue,
  
  match: <T, E, R>(
    result: Result<T, E>, 
    handlers: { ok: (value: T) => R; err: (error: E) => R }
  ): R => result.ok ? handlers.ok(result.value) : handlers.err(result.error),
};
