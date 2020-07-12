import GenericIterable from '../src/GenericIterable';

import { identity, even } from '../src/standard';
import range from '../src/generators/range';
import map from '../src/iterators/map';
import zip from '../src/iterators/zip';
import splitAt from '../src/iterators/splitAt';
import splitBy from '../src/iterators/splitBy';
import splitEvery from '../src/iterators/splitEvery';
import groupBy, { Group } from '../src/iterators/groupBy';

GenericIterable.prototype.map = map;
GenericIterable.prototype.splitBy = splitBy;

Array.prototype.splitBy = splitBy;

declare global {
  interface Number {
    succ(): number;
  }
}

Number.prototype.succ = function () {
  return this.valueOf() + 1;
};

test('range(-2, 2).map((x: number) => x * x) == [4, 1, 0, 1, 4]', () => {
  expect(Array.from(
    range(-2, 2).map((x: number) => x * x)
  )).toEqual([4, 1, 0, 1, 4]);
});

test('[1, 1, 2, 2, 3].splitBy((a, b) => even(a) === even(b))', () => {
  expect(Array.from(
    [1, 1, 2, 2, 3].splitBy((a, b) => even(a) === even(b))
  )).toEqual([[1, 1], [2, 2], [3]]);
});



interface Printable<T> {
  print(value: T): string;
}

function logValue<T>(value: T, stringable: Printable<T>) {
  console.log(stringable.print(value));
}

const numberPrintable: Printable<number> = {
  print(value: number) {
    return value.toString();
  }
};

logValue(10, numberPrintable);
