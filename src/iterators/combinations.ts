import GenericIterable from '../GenericIterable';

import head from './head';
import take from './take';
import drop from './drop';

export function* combine2<T>(
  depth: number,
  prev: T,
  iterable: Iterable<T>
): Iterable<T[]> {
  let n = 0;

  for (let value of iterable) {
    if (depth > 0) {
      yield* combine2(depth - 1, value, iterable);
    }

    if (n++ <= depth) {
      continue;
    }

    yield [prev, value];
  }
}

// export function combine<T>(depth: number, iterable: Iterable<T>) {
//   function* inner(n: number, prev: T[], iterable: Iterable<T>): Iterable<T[]> {
//     // console.log('>>>', n, depth);

//     for (let value of iterable) {
//       yield [prev, value];

//       if (n < depth) {
//         yield* inner(n + 1, value, drop(n, iterable));
//       }

//     }
//   }

//   return inner(1, Array.from(take(depth, iterable)), drop(depth, iterable));
// }


class CombinationsIterable<T> extends GenericIterable<T[]> {
  constructor(
    private iterable?: Iterable<T>
  ) {
    super();
  }

  *[Symbol.iterator](): Iterator<T[]> {
    if (!this.iterable) {
      return;
    }

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
