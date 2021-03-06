import GenericIterable from './GenericIterable';

import { identity, even } from './standard';

import head from './iterators/head';
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
  interface Iterator<T> {
    map<R>(mapper: (value: T) => R, iterable?: Iterable<T>): Iterable<R>;
    // groupBy(grouper: (x: T) => string, iterable?: Iterable<T>): Iterable<Group<T>>;
  }
}

// console.log(Object.getPrototypeOf(function* () { }).constructor);
// console.log('>>>', [1, 2, 3].entries().constructor.prototype);

// Object.getPrototypeOf(function* () { }).constructor.prototype.map = map;

function* foo() {
  yield 10;
}

Object.getPrototypeOf(function* () { }).prototype.map = map;
Object.getPrototypeOf([].entries()).map = map;

console.log(Array.from([1, 2, 3].values().map((x: number) => x * x)));
console.log(Array.from(foo().map((x: number) => x * x)));

let x = head([1]);
// x.toString();

const capitalize = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1);

console.log(capitalize('hello'));
