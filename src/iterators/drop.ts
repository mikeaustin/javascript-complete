import GenericIterable from '../GenericIterable';

class DropIterable<T> extends GenericIterable<T> {
  constructor(
    private count: number,
    private iterable: Iterable<T>,
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    let n = 0;

    for (let value of this.iterable) {
      if (++n > this.count) {
        yield value;
      }
    }
  }
}

function drop<T>(
  count: number,
  iterable: Iterable<T> = this
): GenericIterable<T> {
  return new DropIterable<T>(count, iterable);
}

export default drop;
