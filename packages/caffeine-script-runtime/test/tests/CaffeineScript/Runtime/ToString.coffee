{defineModule, log, inspect} = require "art-standard-lib"
Caf = Neptune.CaffeinScript.Runtime

testToString = (input, out) ->
  test "toString #{inspect input} >> #{inspect out}", ->
    assert.eq out, Caf.toString input

testMap = (map) ->
  for k, v of map
    testToString v, k

defineModule module, suite: ->
  testMap
    1: 1
    hi: 'hi'
    '': []
    '123': [1,2,3]
    '[object Object]': {}

  testMap '': undefined
  testMap '': null
  testMap '': [null]
  testMap '1123aha': [[1], 123, {toString: -> 'aha'}]
  testMap '12': [null, 1, undefined, 2]
