import GenericIterable, { AppendArray } from '../src/GenericIterable';

import { Group } from '../src/iterators/groupBy';

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
    reduce<R>(reducer: (acc: R, value: T) => R, initial: R, iterable?: Iterable<T>): R;
  }
}

declare global {
  interface Number {
    succ(): number;
  }

  interface String {
    succ(): string;
    append(value: string): string;
    empty(): string;
  }

  interface Array<T> {
    append<R>(value: R): T;
    empty(): T[];
  }

  interface ArrayConstructor {
    fromEntries<K, V>(iterable: Iterable<[K, V]>): Array<V>;
  }

  interface MapConstructor {
    fromEntries<K, V>(iterable: Iterable<[string, V]>): Map<string, V>;
  }

  interface Object {
    entries<V>(iterator?: Object): IterableIterator<[string, V]>;
    // [Symbol.iterator]<V>(iterator?: Object): IterableIterator<[string, V]>;
  }
}
