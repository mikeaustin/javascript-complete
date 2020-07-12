# javascript-complete

This library is an exploration into adding missing functions such as take(), zip(), range(), groupBy(), and splitAt(). All functions support currying and assignment to object prototypes. It does’t replace lodash, Ramda, or RxJS — it's meant to be a lightweight library to fill in the gaps.

All functions return an iterable that can be iterated over multiple times, unlike an iterator. I'm also looking into transducers, where values are pipedlined through each function.

## Examples

Three ways of using functions:

    map((x: number) => x * x, [1, 2, 3]);

    const double = map((x: number) => x * x);
    double([1, 2, 3]);

    Array.prototype.map = map;
    [1, 2, 3].map(x => x * x);

Using range, zip, groupBy and map: 

    [range(1, 5), range('a', 'z')]
      .zip(([n, char]) => [n * n, char])
      .groupBy(([n, char]) => even(n) ? 'even' : 'odd')
      .map(([n, char]) => [n, char.toString()])

Mapping over a Map:

    new Map([['one', 1], ['two', 2]])
      .map(([key, value]) => `${key}: ${value}`)

## Reference

### identity()

Creates a function that simply returns its paramets.

    identity<T>(                                  identity(10)
      value: T
    ): T

### range(from, to)

Creates an iterable that generates Orderable values from 'from' to 'to'.

    range<T extends Enumerabe<T>(                 range(1, 10), range('a', 'z')
      from: number,
      to: number
    ): Iterable<T>

### repeat(function)

Creates an iterable that returns the result of calling function, infinitely.

    repeat<T>                                     repeat(Math.random).take(5)
      function: number => T
    ): T

### collect(collector, iterable = this)

Map over an iterable, but only collecting truthy values.

    collect<T, R>(                                collect(x => x > 0 && x, range(-3, 3))
      collector: (value: T) => R,
      iterable = this
    ): Iterable<R> | ((iterator: Iterable<T>) => GenericIterable<R>)

### splitAt(index, iterable = this)

Split the iterable into 2 arrays, using index to determine the boundary.

    splitAt(                                      'abcd'.splitAt(2).join(', ')
      index: number,
      iterable: Iterable<T>
    )

### splitEvery(count, iterable = this)

Split the iterable into multiple arrays, using count to determinte the repeated boundary.

    splitEvery(                                   'abcd'.splitEvery(2)
      count: number,
      iterable: Iterable<T>
    )

### groupBy(grouper, iterable = this)

Groups values of the iterable into keys and values, using the grouper function to determine the key.

    groupBy(                                      groupBy(x => n ? 'valid' : 'invalid')
      grouper: (value: T) => string,
      iterable: Iterable<T>
    )

### zip(zipper = identity, iterables = this)

Iterates over multiple iterables in parallel and returns an array combining each value.

    zip(                                          zip(([x, y]) => x + y, [a, b])
      zipper: ([...values]: any[] => any),
      iterables: Iterable<any>[]
    )
