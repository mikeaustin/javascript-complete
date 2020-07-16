import GenericIterable from '../GenericIterable';

class SplitByIterable<T> extends GenericIterable<T[]> {
  constructor(
    private splitter: (a: T, b: T) => boolean,
    private iterable?: Iterable<T>
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T[]> {
    if (!this.iterable) {
      return;
    }

    let result = [];
    let previousValue;

    for (let value of this.iterable) {
      if (previousValue && !this.splitter(previousValue, value)) {
        yield result;

        result = [];
      }

      result.push(value);

      previousValue = value;
    }

    if (result.length !== 0) {
      yield result;
    }
  }
}

function splitBy<T>(
  splitter: (a: T, b: T) => boolean = (a, b) => a === b,
  iterable: Iterable<T> = this
): GenericIterable<T[]> {
  return new SplitByIterable<T>(splitter, iterable);
}

export default splitBy;
