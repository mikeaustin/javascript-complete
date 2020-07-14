import GenericIterable, { AppendArray } from '../src/GenericIterable';

import '../src/polyfills';

function testAppendArray<T>(value: AppendArray<T>) {
  let result = value.empty();

  result = result.append(value[0]);

  return result;
}

test('Map.fromEntries()', () => {
  expect(
    Map.fromEntries(new Map([['a', 1], ['b', 2]]).entries())
  ).toEqual(
    new Map([['a', 1], ['b', 2]])
  );
});

test('Object.from()', () => {
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

test('AppendArray', () => {
  expect(testAppendArray('abcde')).toEqual('a');
  expect(testAppendArray([1, 2, 3])).toEqual([1]);
});
