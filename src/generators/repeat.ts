import GenericIterable from '../GenericIterable';

class RepeatIterable<T> extends GenericIterable<T>  {
  constructor(
    private repeater: Iterable<T> | ((index: number) => T)
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    let n = 0;

    if (typeof this.repeater === 'function') {
      while (true) {
        yield this.repeater(n++);
      }
    }

    while (true) {
      for (let value of this.repeater) {
        yield value;
      }
    }
  }
}

function repeat<T>(
  repeater: Iterable<T> | ((index: number) => T),
): GenericIterable<T> {
  return new RepeatIterable(repeater);
};

export default repeat;
