import GenericIterable from '../src/GenericIterable';

import { identity, even } from '../src/standard';
import range from '../src/generators/range';
import map from '../src/iterators/map';
import zip from '../src/iterators/zip';
import splitAt from '../src/iterators/splitAt';
import splitEvery from '../src/iterators/splitEvery';
import groupBy, { Group } from '../src/iterators/groupBy';

GenericIterable.prototype.map = map;

test('test', () => {
  expect(1).toEqual(1);
});


declare global {
  interface Number {
    succ(): number;
    [foo](): string;
  }
}


const foo = Symbol('foo');

interface Printable2<T> {
  print(): string;
  [foo](): string;
}


Number.prototype.print = function () { return this.toString(); };
Number.prototype[foo] = function () { return this.toString(); };

function logValue2<T extends Printable2<T>>(value: T) {
  console.log(value.print());
}

// logValue2(20);



declare global {
  interface Number {
    print(): string;
  }
}

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
};;

// logValue(10, numberPrintable);
