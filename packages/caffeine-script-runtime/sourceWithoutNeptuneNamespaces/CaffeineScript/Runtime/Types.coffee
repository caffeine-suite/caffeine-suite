isNonNegativeInt = (x) -> ((x | 0) == x) && x >= 0

module.exports =
  ###
    https://jsperf.com/array-isarray-vs-instanceof-array/42
    as-of 2019-6-14
    Array.isArray vs o.constructor == Array
    Virtualy the same: Chrome, Safari, FireFox
    Edge18: constructor-test 6x faster
  ###
  isPlainArray: (o) -> o? && o.constructor == Array
  isFunction:   isFunction = (a) -> typeof a is "function"
  isArrayIterable: (source) ->
    source? &&
    isNonNegativeInt(source.length) &&
    isFunction(source.indexOf) &&
    source.constructor != Object
