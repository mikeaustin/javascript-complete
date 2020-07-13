import GenericIterable from '../GenericIterable';

// function* combine<T>(depth: number, prev: T, iterable: Iterable<T>) {
//   let n = 0;

//   for (let value of this.iterable) {
//     if (depth > 0) {
//       yield* combine(depth + 1, value, iterable);
//     }

//     if (n++ <= depth) {
//       continue;
//     }

//     yield [prev, value];
//   }
// }

class CombinationsIterable<T> extends GenericIterable<T[]> {
  constructor(
    private iterable?: Iterable<T>
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T[]> {
    let n = 0;

    for (let value of this.iterable) {
      let i = 0;

      for (let value2 of this.iterable) {
        if (i++ <= n) {
          continue;
        }

        yield [value, value2];
      }

      ++n;
    }
  }
}

function combinations<T>(iterable = this) {
  return new CombinationsIterable<T>(iterable);
}

export default combinations;
