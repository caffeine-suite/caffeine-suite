{defineModule, log} = require "art-standard-lib"
Caf = Neptune.CaffeinScript.Runtime

defineModule module, suite: ->
  test "basic", ->
    assert.eq Caf.importInvoke(["foo"], [foo:123], (foo) -> foo), 123

  test "two", ->
    assert.eq Caf.importInvoke(["foo", "bar"], [foo:123, bar: 2], (foo, bar) -> foo * bar), 246
