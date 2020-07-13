import GenericIterable from '../GenericIterable';

class TakeIterable<T> extends GenericIterable<T> {
  constructor(
    private count: number,
    private iterable: Iterable<T>,
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    let n = 0;

    for (let value of this.iterable) {
      if (n++ === this.count) {
        return value;
      }

      yield value;
    }
  }
}

function take<T>(
  count: number,
  iterable: Iterable<T> = this
): GenericIterable<T> {
  return new TakeIterable<T>(count, iterable);
}

export default take;
