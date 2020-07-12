const compose = (...fns: ((x: any) => any)[]) =>
  (x: any) =>
    fns.reduceRight((y, f) => f(y), x);

const compose2 = (f: any, g: any) => (x: any) => f(g(x));

const map =
  <T, U>(mapper: (value: T) => U) =>
    (step: (a: unknown, c: unknown) => unknown) =>
      (a: unknown, c: T) => step(a, mapper(c))

const filter =
  <T>(predicate: (value: T) => boolean) =>
    (step: (a: unknown, c: unknown) => unknown) =>
      (a: unknown, c: T) => predicate(c) ? step(a, c) : a;

const arrayConcat = <T>(a: T[], c: T): T[] => a.concat([c])

console.log(
  [1, 2, 3].reduce(map((x: number) => x * x)(arrayConcat), [])
)


const doubleEvens = compose(
  filter((n: number) => n % 2 === 0),
  map((n: number) => n * 2),
)

const xform = doubleEvens(arrayConcat);

console.log(
  [1, 2, 3, 4, 5, 6].reduce(xform, [])
)

/*

const map = (mapper) => (step) =>
  (a, c) => step(a, mapper(c))

const arrayConcat = (a, c) => return a.concat([c]);

console.log(
  [1, 2, 3].reduce(map(x => x * x)(arrayConcat), [])
)

*/
