import GenericIterable from '../GenericIterable';

function head<T>(
  iterable: Iterable<T> = this
): T | undefined {
  for (let value of iterable) {
    return value;
  }

  return undefined;
}

export default head;
