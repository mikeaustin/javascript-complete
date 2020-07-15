import range from '../src/generators/range';
import { identity, reduce, even, every, some } from '../src/standard';

import '../src/polyfills';

import take from '../src/iterators/take';
import map from '../src/iterators/map';
import flatten from '../src/iterators/flatten';
import insertAt from '../src/iterators/insertAt';

const boundary = <T>(
  f: (value: T) => boolean,
) => (a: T, b: T) => f(a) === f(b);

test('take()', () => {
  expect(Array.from(
    take(5, range(1, 10))
  )).toEqual(
    [1, 2, 3, 4, 5]
  );

  expect(Array.from(
    range(1, 10).take(5)
  )).toEqual(
    [1, 2, 3, 4, 5]
  );
});

test('drop()', () => {
  expect(Array.from(
    range(1, 10).drop(5)
  )).toEqual(
    [6, 7, 8, 9, 10]
  );
});

test('map()', () => {
  expect(Array.from(
    map((n: number) => n * n, range(1, 5))
  )).toEqual(
    [1, 4, 9, 16, 25]
  );

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

test('combinations()', () => {
  expect(Array.from(
    [1, 2, 3].combinations()
  )).toEqual(
    [[1, 2], [1, 3], [2, 3]]
  );
});

test('reduce()', () => {
  expect(
    reduce((a: number, n: number) => a + n, 0, [1, 2, 3, 4])
  ).toEqual(
    10
  );
});

test('every()', () => {
  expect(every(even, [2, 4, 6])).toBe(true);
  expect(every(even, [2, 3, 6])).toBe(false);
});

test('some()', () => {
  expect(some(even, [2, 3, 6])).toBe(true);
  expect(every(even, [1, 3, 5])).toBe(false);
});

test('takeAt()', () => {
  expect(Array.from(
    insertAt(0, 10, [1, 2, 3])
  )).toEqual(
    [10, 1, 2, 3]
  );

  expect(Array.from(
    insertAt(3, 10, [1, 2, 3])
  )).toEqual(
    [1, 2, 3, 10]
  );

  expect(Array.from(
    insertAt(5, 10, [1, 2, 3])
  )).toEqual(
    [1, 2, 3, 10]
  );
});

test('flatten()', () => {
  expect(Array.from(
    flatten(1, [1, [2, [3, [4]]]])
  )).toEqual(
    [1, 2, [3, [4]]]
  );

  expect(Array.from(
    flatten(2, [1, [2, [3, [4]]]])
  )).toEqual(
    [1, 2, 3, [4]]
  );
});
