{isFunction} = require './Lib'

isNonNegativeInt = (x) -> ((x | 0) == x) && x >= 0

###
  NOTE:

  isArrayIterable returns false for 'arguments' object...

  But, arguments is DEPRICATED (effectively) with ES6... so that's probably OK.
###
module.exports =
  isArrayIterable: (source) ->
    source? &&
    isNonNegativeInt(source.length) &&
    isFunction(source.indexOf) &&
    source.constructor != Object
