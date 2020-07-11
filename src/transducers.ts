
const map =
  <T, U>(mapper: (value: T) => U) =>
    <V>(step: (a: unknown, c: unknown) => unknown) =>
      (a: unknown, c: T) => step(a, mapper(c))

const arrayConcat = <T>(a: T[], c: T): T[] => a.concat([c])

console.log(
  [1, 2, 3].reduce(map((x: number) => x * x)(arrayConcat), [])
)

/*

const map = (mapper) => (step) =>
  (a, c) => step(a, mapper(c))

const arrayConcat = (a, c) => return a.concat([c]);

console.log(
  [1, 2, 3].reduce(map(x => x * x)(arrayConcat), [])
)

*/
