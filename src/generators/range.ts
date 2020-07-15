import GenericIterable, { Enumerabe } from '../GenericIterable';

class RangeIterable<T extends Enumerabe<T>> extends GenericIterable<T>  {
  constructor(
    public from: T,
    public to: T
  ) {
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

function range<T extends Enumerabe<T>>(
  from: T,
  to: T
): GenericIterable<T> {
  return new RangeIterable(from, to);
};

export default range;
