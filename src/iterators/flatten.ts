import GenericIterable from '../GenericIterable';

class FlattenIterable<T> extends GenericIterable<T> {
  constructor(
    private depth: number,
    private iterable: Iterable<T>
  ) {
    super();
  }

  *flatten(depth = 1, iterable: Iterable<T> = this): Iterable<T> {
    for (let value of iterable) {
      let iteratorValue: Iterable<T> = (value as any)[Symbol.iterator] && (value as unknown as Iterable<T>);

      if (depth > 0 && iteratorValue) {
        yield* this.flatten(depth - 1, iteratorValue);
      } else {
        yield value;
      }
    }
  }

  *[Symbol.iterator](): Iterator<T> {
    yield* this.flatten(this.depth, this.iterable);
  }
}

function flatten<T>(
  depth: number = 1,
  iterable: Iterable<T> = this
) {
  return new FlattenIterable<T>(depth, iterable);
}

export default flatten;
