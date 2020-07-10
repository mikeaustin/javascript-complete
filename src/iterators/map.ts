import GenericIterable from '../GenericIterable';

class MapIterable<T> extends GenericIterable<T> {
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
    return new MapIterable<T>(mapper, iterable);
  } else {
    return (iterable: Iterable<T>) => new MapIterable<T>(mapper, iterable);
  }
}

export default map;
