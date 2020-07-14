function identity<T>(value: T): T {
  return value;
}

const even = (n: number) => n % 2 === 0;

function reduce<T, R>(
  reducer: (acc: R, value: T) => R,
  initial: R,
  iterable: Iterable<T>
): R {
  let result = initial;

  for (let value of iterable) {
    result = reducer(result, value);
  }

  return result;
}

function every<T>(
  predicate: (value: T) => boolean,
  iterator: Iterable<T> = this
) {
  for (let value of iterator) {
    if (!predicate(value)) {
      return false;
    }
  }

  return true;
}

function some<T>(
  predicate: (value: T) => boolean,
  iterator: Iterable<T> = this
) {
  for (let value of iterator) {
    if (predicate(value)) {
      return true;
    }
  }

  return false;
}

export {
  identity,
  even,
  reduce,
  every,
  some,
};
