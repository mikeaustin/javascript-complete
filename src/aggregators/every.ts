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

export default every;
