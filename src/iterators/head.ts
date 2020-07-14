import GenericIterable from '../GenericIterable';

function head<T>(
  iterable: Iterable<T> = this
): T {
  return iterable[Symbol.iterator]().next().value;
}

export default head;
