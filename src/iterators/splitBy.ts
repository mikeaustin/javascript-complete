import GenericIterable from '../GenericIterable';

class SplitByIterable<T> extends GenericIterable<T[]> {
  constructor(
    private splitter: (a: T, b: T) => boolean,
    private iterable?: Iterable<T>
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T[]> {
    let result = [];
    let prev;
    let n = 0;

    for (let value of this.iterable) {
      if (n++ > 0 && !this.splitter(prev, value)) {
        yield result;

        result = [];
      }

      result.push(value);

      prev = value;
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
