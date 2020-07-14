import GenericIterable, { AppendArray } from '../src/GenericIterable';

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
}

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

Array.prototype.zip = zip;
Array.prototype.splitAt = splitAt;
Array.prototype.splitBy = splitBy;

Array.prototype.append = function <T>(value: T) {
  return this.concat([value]);
};

Array.prototype.empty = function (): any[] {
  return [];
};

String.prototype.append = function (value: string) {
  return this.concat(value);
};

String.prototype.empty = function () {
  return '';
};
