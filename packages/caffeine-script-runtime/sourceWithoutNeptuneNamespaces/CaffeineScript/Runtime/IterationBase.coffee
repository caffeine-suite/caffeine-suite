isNonNegativeInt = (x) -> ((x | 0) == x) && x >= 0

module.exports =
  isArrayIterable: (source) -> source && isNonNegativeInt(source.length) && source.constructor != Object
