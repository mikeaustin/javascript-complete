export interface Enumerabe<T> {
  succ(): T;
}

export interface Numerable<T> {
  add(other: T): T;
}

export interface Stringable<T> {
  toString(): string;
}

export interface Equatable<T> {
  equalTo(other: T): boolean;
  notEqualTo(other: T): boolean;
}

export interface Orderable<T> extends Equatable<T> {
  compare(a: T, b: T): boolean;
  greaterThan(other: T): boolean;
  greaterThanOrEaualTo(other: T): boolean;
  lessThan(other: T): boolean;
  lessThanOrEqualTo(other: T): boolean;
  min(): T;
  max(): T;
}

export interface AppendArray<T> extends ArrayLike<T> {
  append<R>(value: T): R;
  empty(): AppendArray<T>;
}

export abstract class GenericIterable<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;
}

export default GenericIterable;
