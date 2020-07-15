import GenericIterable from '../GenericIterable';

class IterateIterable<T> extends GenericIterable<T>  {
  constructor(
    private iterator: (value: T) => T,
    private initial: T
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    let result = this.initial;

    while (true) {
      yield result;

      result = this.iterator(result);
    }
  }
}

function iterate<T>(
  iterator: (value: T) => T,
  initial: T,
): GenericIterable<T> {
  return new IterateIterable(iterator, initial);
};

export default iterate;
