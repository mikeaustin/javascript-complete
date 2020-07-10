export interface Ordered<T> {
  succ(): T;
}

export abstract class GenericIterable<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;
}

export default GenericIterable;
