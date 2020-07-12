import GenericIterable from '../GenericIterable';
import { identity } from '../standard'

class ZipIterable<T> extends GenericIterable<unknown> {
  constructor(
    private zipper: (values: unknown[]) => unknown,
    private iterables: Iterable<unknown>[]
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<unknown> {
    let iterators = this.iterables.map((iterable: Iterable<unknown>) => iterable[Symbol.iterator]());
    let results = iterators.map(iterator => iterator.next());

    while (results.every(result => !result.done)) {
      yield this.zipper(results.map(result => result.value));

      results = iterators.map(iterator => iterator.next());
    }
  }
}

function zip<T, R>(
  zipper: (values: unknown[]) => unknown = identity,
  iterables: Iterable<unknown>[] = this
): GenericIterable<unknown> {
  return new ZipIterable<T>(zipper, iterables);
};

export default zip;
