import GenericIterable, { Ordered } from '../GenericIterable';

class RangeIterable<T extends Ordered<T>> extends GenericIterable<T>  {
  constructor(public from: T, public to: T) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    let value = this.from;

    while (true) {
      yield value;

      if (value === this.to) {
        return value;
      }

      value = value.succ();
    }
  }
}

function range<T extends Ordered<T>>(from: T, to: T) {
  const iterator = new RangeIterable(from, to);

  iterator.from = from;
  iterator.to = to;

  return iterator;
};

export default range;
