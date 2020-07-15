import GenericIterable, { AppendArray } from '../src/GenericIterable';

import { even } from '../src/standard';
import range from '../src/generators/range';

import '../src/polyfills';

function testAppendArray<T>(value: AppendArray<T>) {
  let result = value.empty();

  result = result.append(value[0]);

  return result;
}

test('AppendArray', () => {
  expect(testAppendArray('abcde')).toEqual('a');
  expect(testAppendArray([1, 2, 3])).toEqual([1]);
});

test('Map.fromEntries()', () => {
  expect(
    Array.fromEntries([['a', 1], ['b', 2]])
  ).toEqual(
    [1, 2]
  );
});

test('Map.fromEntries()', () => {
  expect(
    Map.fromEntries(new Map([['a', 1], ['b', 2]]).entries())
  ).toEqual(
    new Map([['a', 1], ['b', 2]])
  );
});

test('Object.fromEntries()', () => {
  expect(
    Object.fromEntries([['a', 1], ['b', 2]])
  ).toEqual(
    { a: 1, b: 2 }
  );
});

test('Object.prototype.entries()', () => {
  expect(
    Array.from((({ a: 1, b: 2 }).entries()))
  ).toEqual(
    [['a', 1], ['b', 2]]
  );
});

//
//
//

test('range() zip() groupBy() map()', () => {
  expect(Array.from(
    [range(1, 5), range('a', 'z')].zip(([n, c]) => [n * n, c])
      .groupBy(([n, c]) => even(n) ? 'even' : 'odd')
      .map(([k, v]) => [k, v.toString()])
  )).toEqual(
    [['odd', '1,a,9,c,25,e'], ['even', '4,b,16,d']]
  );
});

test('new Map() range()', () => {
  expect(Array.from(
    new Map([['one', 1], ['two', 2]])
      .map(([key, value]) => `${key}: ${value}`)
  )).toEqual(
    ['one: 1', 'two: 2']
  );
});
