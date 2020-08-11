// Generated by CoffeeScript 1.12.7
(function() {
  var isFunction, isNonNegativeInt;

  isNonNegativeInt = function(x) {
    return ((x | 0) === x) && x >= 0;
  };

  module.exports = {

    /*
      https://jsperf.com/array-isarray-vs-instanceof-array/42
      as-of 2019-6-14
      Array.isArray vs o.constructor == Array
      Virtualy the same: Chrome, Safari, FireFox
      Edge18: constructor-test 6x faster
     */
    isPlainArray: function(o) {
      return (o != null) && o.constructor === Array;
    },
    isFunction: isFunction = function(a) {
      return typeof a === "function";
    },
    isArrayIterable: function(source) {
      return (source != null) && isNonNegativeInt(source.length) && isFunction(source.indexOf) && source.constructor !== Object;
    }
  };

}).call(this);