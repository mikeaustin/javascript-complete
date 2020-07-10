import GenericIterable from '../GenericIterable';

class MapIterator<T, R> extends GenericIterable<T, R> {
  constructor(private mapper: (value: T) => any, private iterable: Iterable<T>) {
    super();
  }

  *[Symbol.iterator](): Iterator<any> {
    for (let value of this.iterable) {
      yield this.mapper(value);
    }
  }
}

function map<T, R>(mapper: (value: T) => R): (iterator: Iterable<T>) => Iterable<T>;
function map<T, R>(mapper: (value: T) => R, iterable: Iterable<T>): Iterable<T>;
function map<T, R>(mapper: (value: T) => R, iterable: Iterable<T> | void = this): Iterable<T> | ((iterator: Iterable<T>) => Iterable<T>) {
  if (iterable) {
    return new MapIterator<T, R>(mapper, iterable);
  } else {
    return (iterable: Iterable<T>) => new MapIterator<T, R>(mapper, iterable);
  }
}

export default map;
