import GenericIterable from '../GenericIterable';

class ZipIterator<T, R> extends GenericIterable<T, R> {
  constructor(private zipper: (values: any[]) => any, private iterables: Iterable<any>[]) {
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

const items = ([...values]: any[]): any => [...values];

function zip<T, R>(zipper: (values: any[]) => R = items, iterables: Iterable<any>[] = this) {
  return new ZipIterator<T, R>(zipper, iterables);
};

export default zip;
