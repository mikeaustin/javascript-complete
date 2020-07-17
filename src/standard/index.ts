function identity<T>(value: T): T {
  return value;
}

const even = (n: number) => n % 2 === 0;

export {
  identity,
  even,
};
