const isNonNegativeInt = (x) => ((x | 0) === x) && x >= 0
const isFunction = (a) => typeof a === "function"

module.exports = {
  isFunction,
    // https://jsperf.com/array-isarray-vs-instanceof-array/44
    // as-of 2019-10-26
    // Array.isArray vs o.constructor == Array
    // Virtualy the same: Chrome, Safari, FireFox
    // Edge18: constructor-test 10x faster
    // Edge18 is somewhat faster if we use: a != null && typeof a == "object" && a.constructor == Array
    //  but chrome is slower.
  isPlainArray: (o) => o != null && o.constructor === Array,
  isArrayIterable: (source) =>
    source != null &&
    isNonNegativeInt(source.length) &&
    isFunction(source.indexOf) &&
    source.constructor != Object // not a plain object
}