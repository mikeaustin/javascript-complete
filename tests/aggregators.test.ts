import reduce from '../src/aggregators/reduce';
import every from '../src/aggregators/every';
import some from '../src/aggregators/some';

import { even } from '../src/standard';
import range from '../src/generators/range';

import '../src/polyfills';

test('reduce()', () => {
  expect(
    reduce((total, n) => total + n, 0, [1, 2, 3, 4])
  ).toEqual(
    10
  );

  expect(
    range(1, 4).reduce((total, n) => total + n, 0)
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
