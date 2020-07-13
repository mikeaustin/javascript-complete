import GenericIterable from '../src/GenericIterable';

import { identity, even } from '../src/standard';
import range from '../src/generators/range';
import repeat from '../src/generators/repeat';
import take from '../src/iterators/take';
import map from '../src/iterators/map';
import zip from '../src/iterators/zip';
import splitAt from '../src/iterators/splitAt';
import splitBy from '../src/iterators/splitBy';
import splitEvery from '../src/iterators/splitEvery';
import groupBy, { Group } from '../src/iterators/groupBy';
import combinations from '../src/iterators/combinations';

GenericIterable.prototype.take = take;
GenericIterable.prototype.map = map;
GenericIterable.prototype.zip = zip;
GenericIterable.prototype.splitAt = splitAt;
GenericIterable.prototype.splitBy = splitBy;
GenericIterable.prototype.splitEvery = splitEvery;
GenericIterable.prototype.groupBy = groupBy;

Array.prototype.zip = zip;
Array.prototype.splitAt = splitAt;
Array.prototype.splitBy = splitBy;

const boundary = <T>(
  f: (value: T) => boolean,
) => (a: T, b: T) => f(a) === f(b);


declare global {
  interface Number {
    succ(): number;
  }

  interface String {
    succ(): string;
  }
}

Number.prototype.succ = function () {
  return this.valueOf() + 1;
};

String.prototype.succ = function () {
  return String.fromCharCode(this.charCodeAt() + 1);
};

test('range()', () => {
  expect(Array.from(
    range(1, 5)
  )).toEqual(
    [1, 2, 3, 4, 5]
  );

  expect(Array.from(
    range('a', 'e')
  )).toEqual(
    ['a', 'b', 'c', 'd', 'e']
  );
});

test('repeat()', () => {
  expect(Array.from(
    repeat(i => i).take(5)
  )).toEqual(
    [0, 1, 2, 3, 4]
  );
});

test('take()', () => {
  expect(Array.from(
    range(1, 10).take(5)
  )).toEqual(
    [1, 2, 3, 4, 5]
  );
});

test('map()', () => {
  expect(Array.from(
    range(1, 5).map(n => n * n)
  )).toEqual(
    [1, 4, 9, 16, 25]
  );
});

test('zip()', () => {
  expect(Array.from(
    [range(1, 5), range('a', 'z')].zip(([n, c]) => [n * n, c])
  )).toEqual(
    [[1, 'a'], [4, 'b'], [9, 'c'], [16, 'd'], [25, 'e']]
  );
});

test('splitAt()', () => {
  expect(Array.from(
    [1, 1, 2, 2, 3].splitAt(2)
  )).toEqual(
    [[1, 1], [2, 2, 3]]
  );
});

test('splitBy()', () => {
  expect(Array.from(
    [1, 1, 2, 2, 3].splitBy(boundary(even))
  )).toEqual(
    [[1, 1], [2, 2], [3]]);
});

test('splitEvery()', () => {
  expect(Array.from(
    range(1, 5).splitEvery(2)
  )).toEqual(
    [[1, 2], [3, 4], [5]]);
});

test('groupBy()', () => {
  expect(Array.from(
    range(1, 5).groupBy(n => even(n) ? 'even' : 'odd')
  )).toEqual(
    [['odd', [1, 3, 5]], ['even', [2, 4]]]
  );
});

// console.log('>>>', Array.from(
//   combinations([1, 2, 3, 4, 5])
// ));
