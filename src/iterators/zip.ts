import GenericIterable from '../GenericIterable';
import { identity } from '../standard'

class ZipIterable<T> extends GenericIterable<any> {
  constructor(
    private zipper: (values: any[]) => any,
    private iterables: Iterable<any>[]
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    let iterators = this.iterables.map((iterable: Iterable<any>) => iterable[Symbol.iterator]());
    let results = iterators.map(iterator => iterator.next());

    while (results.every(result => !result.done)) {
      yield this.zipper(results.map(result => result.value));

      results = iterators.map(iterator => iterator.next());
    }
  }
}

// const items = ([...values]: any[]): any => [...values];

function zip<T, R>(
  zipper: (values: any[]) => any = identity,
  iterables: Iterable<any>[] = this
): GenericIterable<any> {
  return new ZipIterable<T>(zipper, iterables);
};

export default zip;
