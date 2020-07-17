function reduce<T, R>(
  reducer: (acc: R, value: T) => R,
  initial: R,
  iterable: Iterable<T> = this
): R {
  if (iterable === undefined) {
    return initial;
  }

  let result = initial;

  for (let value of iterable) {
    result = reducer(result, value);
  }

  return result;
}

export default reduce;
