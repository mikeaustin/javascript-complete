import GenericIterable from '../GenericIterable';

type Group<T> = [string, T[]]

class GroupByIterable<T> extends GenericIterable<Group<T>> {
  constructor(
    private grouper: (x: T) => string,
    private iterable: Iterable<T>
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<Group<T>> {
    let result: { [key: string]: T[] } = {};

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

    yield* Object.entries(result);
  }
}

function groupBy<T>(
  grouper: (x: T) => string,
  iterable: Iterable<T> = this
): GenericIterable<Group<T>> {
  return new GroupByIterable<T>(grouper, iterable);
}

export default groupBy;

export {
  Group
}
