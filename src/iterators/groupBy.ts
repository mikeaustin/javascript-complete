import GenericIterable from '../GenericIterable';

class GroupByIterable<T> extends GenericIterable<T> {
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
  return new GroupByIterable<T>(grouper, iterable);
}

export default groupBy;
