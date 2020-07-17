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

export default some;
