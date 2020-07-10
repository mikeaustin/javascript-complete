import GenericIterable from '../GenericIterable';

class SplitAtIterable<T> extends GenericIterable<T> {
  constructor(private index: number, private iterable?: Iterable<any>) {
    super();
  }

  *[Symbol.iterator](): Iterator<any> {
    let result = [];
    let n = 0;

    for (let value of this.iterable) {
      result.push(value);

      if (++n === this.index) {
        yield result;

        result = [];
      }
    }

    if (result.length !== 0) {
      yield result;
    }
  }
}

function splitAt<T>(index: number, iterable: Iterable<T> = this): Iterable<T> {
  return new SplitAtIterable<T>(index, iterable);
}

export default splitAt;
