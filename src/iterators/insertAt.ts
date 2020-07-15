import GenericIterable from '../GenericIterable';

class InsertAtIterable<T> extends GenericIterable<T> {
  constructor(
    private index: number,
    private value: T,
    private iterable: Iterable<T>
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    let n = 0;

    for (let value2 of this.iterable) {
      if (n++ === this.index) {
        yield this.value;
      }

      yield value2;
    }

    if (this.index >= n) {
      yield this.value;
    }
  }
}

function insertAt<T>(
  index: number,
  value: T,
  iterable: Iterable<T> = this
) {
  return new InsertAtIterable(index, value, iterable);
}

export default insertAt;
