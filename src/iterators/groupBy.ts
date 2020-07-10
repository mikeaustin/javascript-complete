import GenericIterable from '../GenericIterable';

class GroupByIterator<T, R> extends GenericIterable<T, R> {
  constructor(private grouper: (x: T) => string, private iterable: Iterable<T>) {
    super();
  }

  *[Symbol.iterator](): Iterator<any> {
    let result: { [key: string]: T[]; } = {};

    for (let value of this.iterable) {
      let key = this.grouper(value);

      result = {
        ...result,
        [key]: [
          ...result[key] || [],
          value,
        ]
      };
    }

    return yield result;
  }
}

function groupBy<T, R>(grouper: (x: T) => string, iterable: Iterable<T> = this): Iterable<T> {
  return new GroupByIterator<T, R>(grouper, iterable);
}

export default groupBy;
