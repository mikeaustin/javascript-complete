interface AssociativeIterable<T> extends Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
  add<K, C>(key: K, value: T): C;
}

export default AssociativeIterable;
