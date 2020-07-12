var compose = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (x) {
        return fns.reduceRight(function (y, f) { return f(y); }, x);
    };
};
var compose2 = function (f, g) { return function (x) { return f(g(x)); }; };
var map = function (mapper) {
    return function (step) {
        return function (a, c) { return step(a, mapper(c)); };
    };
};
var filter = function (predicate) {
    return function (step) {
        return function (a, c) { return predicate(c) ? step(a, c) : a; };
    };
};
var arrayConcat = function (a, c) { return a.concat([c]); };
console.log([1, 2, 3].reduce(map(function (x) { return x * x; })(arrayConcat), []));
var doubleEvens = compose(filter(function (n) { return n % 2 === 0; }), map(function (n) { return n * 2; }));
var xform = doubleEvens(arrayConcat);
console.log([1, 2, 3, 4, 5, 6].reduce(xform, []));
/*

const map = (mapper) => (step) =>
  (a, c) => step(a, mapper(c))

const arrayConcat = (a, c) => return a.concat([c]);

console.log(
  [1, 2, 3].reduce(map(x => x * x)(arrayConcat), [])
)

*/
