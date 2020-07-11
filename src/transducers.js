var map = function (mapper) {
    return function (step) {
        return function (a, c) { return step(a, mapper(c)); };
    };
};
var arrayConcat = function (a, c) { return a.concat([c]); };
console.log([1, 2, 3].reduce(map(function (x) { return x * x; })(arrayConcat), []));
