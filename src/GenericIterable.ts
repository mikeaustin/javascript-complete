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
  equals(other: T): boolean;
}

export interface Orderable<T> extends Equatable<T> {

}

export abstract class GenericIterable<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;
}

export default GenericIterable;
