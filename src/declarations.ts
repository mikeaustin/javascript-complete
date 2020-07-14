import GenericIterable, { AppendArray } from '../src/GenericIterable';
import { identity, reduce, even, every, some } from '../src/standard';

import range from '../src/generators/range';
import repeat from '../src/generators/repeat';
import take from '../src/iterators/take';
import drop from '../src/iterators/drop';
import map from '../src/iterators/map';
import zip from '../src/iterators/zip';
import splitAt from '../src/iterators/splitAt';
import splitBy from '../src/iterators/splitBy';
import splitEvery from '../src/iterators/splitEvery';
import groupBy, { Group } from '../src/iterators/groupBy';
import combinations from '../src/iterators/combinations';

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
    [Symbol.iterator]<V>(iterator?: Object): IterableIterator<[string, V]>;
  }
}
