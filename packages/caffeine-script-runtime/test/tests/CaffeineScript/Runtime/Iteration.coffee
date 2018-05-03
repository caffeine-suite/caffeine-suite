{defineModule, log} = require "art-standard-lib"
Caf = Neptune.CaffeinScript.Runtime

array123 = [1,2,3]

defineModule module, suite: ->
  test "each", ->
    assert.eq [2,4,6], Caf.each array123, [], (cafV, cafK, cafInto) ->
      cafInto.push cafV * 2

  test "each", ->
    assert.same array123, Caf.each array123, null, ->

  test "extendedEach is ee", ->
    assert.eq Caf.extendedEach, Caf.ee

  test "extendedEach", ->
    b = [1,2,3]
    out = Caf.extendedEach b, null, (a, k, into, brk) =>
      brk()
      "shouldReturnThis"

    assert.eq out, "shouldReturnThis"

  test "caffeine: find a from b when a > 10", ->
    b = [1, 50, 2, 60]
    found = Caf.extendedEach b, null, (a, k, into, brk) =>
      if a > 10
        brk()
        a

    assert.eq found, 50
