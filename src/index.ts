import GenericIterable from './GenericIterable';

import { identity } from './standard';
import range from './generators/range';
import map from './iterators/map';
import zip from './iterators/zip';
import splitAt from './iterators/splitAt';
import groupBy from './iterators/groupBy';

const even = (n: number) => n % 2 === 0;

declare global {
  interface Number {
    succ(): number;
  }

  interface String {
    succ(): string;
  }

  interface Array<T> {
    zip<T, S, R>(zipper?: (x: any[]) => R, iterables?: Iterable<R>[]): Iterable<R>;
  }
}

declare global {
  interface IterableIterator<T> {
    map<R>(f: (x: T) => R, iterable?: Iterable<R>): Iterable<R>;
  }
}

Number.prototype.succ = function () {
  return this.valueOf() + 1;
};

String.prototype.succ = function () {
  return String.fromCharCode(this.charCodeAt() + 1);
};

declare module "./GenericIterable" {
  interface GenericIterable<T, R> {
    map<T, R>(mapper: (value: T) => R, iterable?: Iterable<T>): Iterable<T>;
    zip<R>(zipper?: (values: any[]) => any, iterables?: Iterable<R>[]): Iterable<R>;
    splitAt<R>(index: number, iterable?: Iterable<R>): Iterable<R>;
    groupBy<R>(grouper: (x: T) => string, iterable?: Iterable<T>): Iterable<T>;
  }
}

GenericIterable.prototype.map = map;
GenericIterable.prototype.zip = zip;
GenericIterable.prototype.splitAt = splitAt;
GenericIterable.prototype.groupBy = groupBy;
Array.prototype.zip = zip;

// console.log(Object.getPrototypeOf(function* () { }).constructor);
// console.log('>>>', [1, 2, 3].entries().constructor.prototype);

// Object.getPrototypeOf(function* () { }).constructor.prototype.map = map;

// [1, 2, 3].values().constructor.prototype.map = map;
// console.log([1, 2, 3].values());
// console.log(Object.prototype);

console.log(identity('hello'));

console.log(Array.from(
  range(1, 5).map((x: number) => x * x)
));

console.log(Array.from(
  [range(1, 5), range('a', 'z')].zip(([n, c]) => [n * n, c])
));

console.log(Array.from(
  range(1, 5).splitAt(2)
));

console.log(Array.from(
  range(1, 5).groupBy(n => even(n) ? 'even' : 'odd')
));

console.log(Array.from(
  map((x: number) => x * x)([1, 2, 3])
));


// const map2 = function <T, R = T>(f: (value: T) => R, iterable = this): Iterator<T> {
//   const inner = function* () {
//     for (let value of iterable) {
//       yield f(value);
//     }
//   };

//   if (iterable) {
//     return inner();
//   } else {
//     return inner;
//   }
// };

// console.log(Array.from(
//   map2((x: number) => x * x)([1, 2, 3])
// ));
