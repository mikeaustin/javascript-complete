import GenericIterable from './GenericIterable';

import take from '../src/iterators/take';
import drop from '../src/iterators/drop';
import map from '../src/iterators/map';
import zip from '../src/iterators/zip';
import splitAt from '../src/iterators/splitAt';
import splitBy from '../src/iterators/splitBy';
import splitEvery from '../src/iterators/splitEvery';
import groupBy, { Group } from '../src/iterators/groupBy';
import reduce from '../src/aggregators/reduce';
import combinations from '../src/iterators/combinations';

import './declarations';

//
// Static Functions
//

Array.fromEntries = function <K, V>(iterable: Iterable<[K, V]>): V[] {
  let result: V[] = [];

  for (let [key, value] of iterable) {
    result.push(value);
  }

  return result;
};

Map.fromEntries = function <K, V>(iterable: Iterable<[K, V]>) {
  return new Map(iterable);
};

Object.defineProperty(Object, 'fromEntries', {
  value: function <K extends string | number, V>(iterable: Iterable<[K, V]>) {
    return reduce((a, [k, v]: [K, V]) => ({ ...a, [k]: v }), {}, iterable);
  }
});

//
// Methods
//

Object.defineProperty(Object.prototype, 'entries', {
  value: function* <V>(iterator: Object = this): IterableIterator<[string, V]> {
    for (let key in iterator) {
      if (this.hasOwnProperty(key)) {
        yield [key, this[key]];
      }
    }
  }
});

// Object.defineProperty(Object.prototype, Symbol.iterator, {
//   value: Object.prototype.entries
// });

Number.prototype.succ = function () {
  return this.valueOf() + 1;
};

String.prototype.succ = function () {
  return String.fromCharCode(this.charCodeAt() + 1);
};

GenericIterable.prototype.take = take;
GenericIterable.prototype.drop = drop;
GenericIterable.prototype.map = map;
GenericIterable.prototype.zip = zip;
GenericIterable.prototype.splitAt = splitAt;
GenericIterable.prototype.splitBy = splitBy;
GenericIterable.prototype.splitEvery = splitEvery;
GenericIterable.prototype.groupBy = groupBy;
GenericIterable.prototype.reduce = reduce;

Array.prototype.zip = zip;
Array.prototype.splitAt = splitAt;
Array.prototype.splitBy = splitBy;
Array.prototype.groupBy = groupBy;
Array.prototype.combinations = combinations;

Array.prototype.append = function <T>(value: T) {
  return this.concat([value]);
};

Array.prototype.empty = function (): any[] {
  return [];
};

Map.prototype.map = map;

String.prototype.append = function (value: string) {
  return this.concat(value);
};

String.prototype.empty = function () {
  return '';
};
