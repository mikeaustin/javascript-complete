import GenericIterable from '../GenericIterable';

class RepeatIterable<T> extends GenericIterable<T>  {
  constructor(public repeater: (index: number) => T) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    let n = 0;

    while (true) {
      yield this.repeater(n++);
    }
  }
}

function repeat<T>(
  repeater: (index: number) => T,
): GenericIterable<T> {
  return new RepeatIterable(repeater);
};

export default repeat;
