interface AssociativeIterable<T> extends Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
  add<K, C>(key: K, value: T): C;
}

export default AssociativeIterable;

/*

s = new Set("aabbc")
Set(3) {"a", "b", "c"}

class StringSet {
  str: string;
  set: Set;

  constructor(str: string) {
    this.str = str;
    this.set = new Set(str);
  }
}

s = new StringSet("aabbc")

s[2] === "b"
s.has("b")

*/
