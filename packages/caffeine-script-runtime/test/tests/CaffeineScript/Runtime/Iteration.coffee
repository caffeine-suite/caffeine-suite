{defineModule, log} = require "art-foundation"
Caf = Neptune.CaffeinScript.Runtime

defineModule module, suite: ->
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
