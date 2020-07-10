export interface Ordered<T> {
  succ(): T;
}

export abstract class GenericIterable<T, R> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T, R>;
}

export default GenericIterable;
