import GenericIterable from '../GenericIterable';

class SplitEveryIterable<T> extends GenericIterable<T[]> {
  constructor(
    private count: number,
    private iterable?: Iterable<T>
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T[]> {
    if (!this.iterable) {
      return;
    }

    let result = [];

    for (let value of this.iterable) {
      result.push(value);

      if (result.length === this.count) {
        yield result;

        result = [];
      }
    }

    if (result.length !== 0) {
      yield result;
    }
  }
}

function splitEvery<T>(
  index: number,
  iterable: Iterable<T> = this
): GenericIterable<T[]> {
  return new SplitEveryIterable<T>(index, iterable);
}

export default splitEvery;
