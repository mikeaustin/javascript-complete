import GenericIterable from '../GenericIterable';

class FilterIterable<T> extends GenericIterable<T> {
  constructor(
    private predicate: (value: T) => boolean,
    private iterable: Iterable<T>,
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let value of this.iterable) {
      if (this.predicate(value)) {
        yield value;
      }
    }
  }
}

function take<T>(
  predicate: (value: T) => boolean,
  iterable: Iterable<T> = this,
): GenericIterable<T> {
  return new FilterIterable<T>(predicate, iterable);
}

export default take;
