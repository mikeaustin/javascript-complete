import GenericIterable from '../GenericIterable';

class CombinationsIterable<T> extends GenericIterable<T[]> {
  constructor(
    private iterable?: Iterable<T>
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T[]> {
    let n = 0;

    for (let value of this.iterable) {
      let i = 0;

      for (let value2 of this.iterable) {
        if (i++ <= n) {
          continue;
        }

        yield [value, value2];
      }
      ++n;
    }
  }
}

function combinations<T>(iterable = this) {
  return new CombinationsIterable<T>(iterable);
}

export default combinations;
