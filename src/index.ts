import GenericIterable from './GenericIterable';

import { identity, even } from './standard';
import range from './generators/range';
import map from './iterators/map';
import zip from './iterators/zip';
import splitAt from './iterators/splitAt';
import splitBy from './iterators/splitBy';
import splitEvery from './iterators/splitEvery';
import groupBy, { Group } from './iterators/groupBy';

declare global {
  interface Number {
    succ(): number;
  }

  interface String {
    succ(): string;
    append(value: string): string;
  }

  interface Array<T> {
    zip(zipper?: (values: any[]) => any, iterables?: Iterable<any>[]): GenericIterable<any>;
    groupBy(grouper: (x: T) => string, iterable?: Iterable<T>): GenericIterable<Group<T>>;
    splitAt(index: number, iterable?: Iterable<T>): GenericIterable<T[]>;
    splitBy(splitter: (a: T, b: T) => boolean, iterable?: Iterable<T>): GenericIterable<T[]>;
    append<R>(value: R): T;
    combinations<T>(iterable?: Iterable<T>): GenericIterable<T[]>;
  }

  interface Map<K, V> {
    map<R>(mapper: (value: [K, V]) => R, iterable?: Iterable<V>): GenericIterable<R>;
  }
}

declare global {
  interface Iterable<T> {
    // map<R>(mapper: (value: T) => R, iterable?: Iterable<T>): Iterable<R>;
    // groupBy(grouper: (x: T) => string, iterable?: Iterable<T>): Iterable<Group<T>>;
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
    take<T>(count: number, iterable?: Iterable<T>): GenericIterable<T>;
    drop<T>(count: number, iterable?: Iterable<T>): GenericIterable<T>;
    map<R>(mapper: (value: T) => R, iterable?: Iterable<T>): GenericIterable<R>;
    zip(zipper?: (values: any[]) => any, iterables?: Iterable<any>[]): GenericIterable<any>;
    splitAt(index: number, iterable?: Iterable<T>): GenericIterable<T[]>;
    splitBy(splitter: (a: T, b: T) => boolean, iterable?: Iterable<T>): GenericIterable<T[]>;
    splitEvery(count: number, iterable?: Iterable<T>): GenericIterable<T[]>;
    groupBy(grouper: (x: T) => string, iterable?: Iterable<T>): GenericIterable<Group<T>>;
  }
}

GenericIterable.prototype.map = map;
GenericIterable.prototype.zip = zip;
GenericIterable.prototype.splitAt = splitAt;
GenericIterable.prototype.splitBy = splitBy;
GenericIterable.prototype.splitEvery = splitEvery;
GenericIterable.prototype.groupBy = groupBy;

Array.prototype.zip = zip;
Array.prototype.groupBy = groupBy;
Map.prototype.map = map;

// console.log(Object.getPrototypeOf(function* () { }).constructor);
// console.log('>>>', [1, 2, 3].entries().constructor.prototype);

// Object.getPrototypeOf(function* () { }).constructor.prototype.map = map;

console.log(identity('hello'));

console.log(Array.from(
  range(-3, 3).map((x: number) => x.toString())
));

console.log(Array.from(
  [range(1, 5), range('a', 'z')].zip(([n, c]) => [n * n, c])
));

console.log(Array.from(
  range(1, 5).splitAt(2)
));

console.log(Array.from(
  range(1, 5).splitEvery(2)
));

console.log(Array.from(
  range(1, 5).groupBy(n => even(n) ? 'even' : 'odd')
));

console.log(Array.from(
  [range(1, 5), range('a', 'z')].zip(([n, c]) => [n * n, c])
    .groupBy(([n, c]) => even(n) ? 'even' : 'odd')
    .map(([k, v]) => [k, v.toString()])
));

console.log(Array.from(
  map((x: number) => x * x)([1, 2, 3])
));

console.log(Array.from(
  map((x: number) => x * x, [1, 2, 3])
));

console.log(Array.from(
  new Map([['one', 1], ['two', 2]])
    .map(([key, value]) => `${key}: ${value}`)
));
