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
    groupBy<R>(grouper: (x: T) => string, iterable?: Iterable<T>): Iterable<T>;
  }
}

// declare global {
//   interface IterableIterator<T> {
//     map<R>(f: (x: T) => R, iterable?: Iterable<R>): Iterable<R>;
//     groupBy<R>(grouper: (x: T) => string, iterable?: Iterable<T>): Iterable<T>;
//   }
// }

declare global {
  interface Iterable<T> {
    groupBy<R>(grouper: (x: T) => string, iterable?: Iterable<T>): Iterable<T>;
  }
}

Number.prototype.succ = function () {
  return this.valueOf() + 1;
};

String.prototype.succ = function () {
  return String.fromCharCode(this.charCodeAt() + 1);
};

declare module "./GenericIterable" {
  interface GenericIterable<T> {
    map<R>(mapper: (value: T) => R, iterable?: Iterable<T>): Iterable<T>;
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
Array.prototype.groupBy = groupBy;

// console.log(Object.getPrototypeOf(function* () { }).constructor);
// console.log('>>>', [1, 2, 3].entries().constructor.prototype);

// Object.getPrototypeOf(function* () { }).constructor.prototype.map = map;

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
  [range(1, 5), range('a', 'z')].zip(([n, c]) => [n, c])
    .groupBy(([n, c]) => even(n) ? 'even' : 'odd')
  // .map([n, c] => n)
));

console.log(Array.from(
  map((x: number) => x * x)([1, 2, 3])
));
