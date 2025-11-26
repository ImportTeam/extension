/**
 * Utility types for reuse across the codebase
 */

/**
 * Makes all properties of T optional
 */
export type Optional<T> = {
  [K in keyof T]?: T[K];
};

/**
 * Makes specific keys K of T optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Makes specific keys K of T required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
