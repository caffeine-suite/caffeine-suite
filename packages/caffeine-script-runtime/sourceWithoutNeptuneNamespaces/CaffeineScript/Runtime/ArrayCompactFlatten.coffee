arraySlice = Array.prototype.slice

isArguments = (o) ->
  o &&
  (typeof o.callee is "function") &&
  (typeof o.length is "number")

# https://jsperf.com/is-array-sbd
# correct: Array.isArray
# 3x-8x faster: (o) => o.constructor == Array
isPlainArray = (o) => o? && o.constructor == Array

isArrayOrArguments = (o) ->
  o && (isPlainArray(o) || isArguments o)

doFlattenInternal = (array, keepTester, output) ->
  output ||= []
  for a in array
    if isArrayOrArguments a
      flattenIfNeeded a, keepTester, output
    else if keepTester a
      output.push a
  output

needsFlatteningOrCompacting = (array, keepTester) ->
  for a in array when isArrayOrArguments(a) || !keepTester a
    return true
  false

flattenIfNeeded = (array, keepTester, output)->
  if needsFlatteningOrCompacting array, keepTester
    doFlattenInternal array, keepTester, output
  else if output
    output.push v for v in array
    output
  else if array.constructor != Array
    arraySlice.call array
  else
    array

keepAll = -> true
keepUnlessNullOrUndefined = (a) -> a != null && a != undefined

module.exports = class ArrayCompactFlatten
  # cross-iFrame friendly
  # https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
  #   valid in IE9+, so I think we can safely use it.
  # PERF: https://jsperf.com/is-plain-object
  #   iFrame-friendly test: null == Object.getPrototypeOf Object.getPrototypeOf v
  #   10-70x faster: v.constructor == Object
  # @isPlainObject: isPlainObject = (v) -> v? && v.constructor == Object

  @isPlainArray: isPlainArray

  @compact: (array, keepTester = keepUnlessNullOrUndefined) ->
    for a in array
      unless keepTester a
        # needs compacting
        return (a for a in array when keepTester a)

    # already compact
    array

  @flatten: (firstArg)->
    flattenIfNeeded if arguments.length == 1
        if isArrayOrArguments firstArg
          firstArg
        else
          [firstArg]
      else
        arguments
    , keepAll

  @compactFlatten: (array, keepTester = keepUnlessNullOrUndefined) ->
    flattenIfNeeded array, keepTester
