import range from '../src/generators/range';
import repeat from '../src/generators/repeat';
import iterate from '../src/generators/iterate';

import '../src/polyfills';

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

  expect(Array.from(
    repeat([1, 2, 3]).take(5)
  )).toEqual(
    [1, 2, 3, 1, 2]
  );
});

test('iterate()', () => {
  expect(Array.from(
    iterate(n => n * 2, 2).take(5)
  )).toEqual(
    [2, 4, 8, 16, 32]
  );

  expect(Array.from(
    repeat([1, 2, 3]).take(5)
  )).toEqual(
    [1, 2, 3, 1, 2]
  );
});
