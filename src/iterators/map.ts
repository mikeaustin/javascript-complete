import GenericIterable from '../GenericIterable';

class MapIterable<T, R> extends GenericIterable<R> {
  constructor(
    private mapper: (value: T) => R,
    private iterable: Iterable<T>
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<R> {
    for (let value of this.iterable) {
      yield this.mapper(value);
    }
  }
}

function map<T, R>(
  mapper: (value: T) => R
): (iterator: Iterable<T>) => GenericIterable<R>;

function map<T, R>(
  mapper: (value: T) => R,
  iterable: Iterable<T>
): GenericIterable<R>;

function map<T, R>(
  mapper: (value: T) => R,
  iterable: Iterable<T> | void = this
): GenericIterable<R> | ((iterator: Iterable<T>) => GenericIterable<R>) {
  if (iterable) {
    return new MapIterable<T, R>(mapper, iterable);
  } else {
    return (iterable: Iterable<T>) => new MapIterable<T, R>(mapper, iterable);
  }
}

export default map;
