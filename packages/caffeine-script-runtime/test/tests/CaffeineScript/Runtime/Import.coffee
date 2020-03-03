{defineModule, log} = require "art-standard-lib"
Caf = Neptune.CaffeinScript.Runtime

defineModule module, suite: ->
  test "importInvoke basic", ->
    assert.eq Caf.importInvoke(["foo"], [foo:123], (foo) -> {foo}), foo: 123

  test "imports only requested", ->
    assert.eq Caf.importInvoke(["foo"], [foo:123, bar: 456], (foo) -> {foo}), foo: 123

  test "importInvoke two", ->
    assert.eq Caf.importInvoke(["foo", "bar"], [foo:123, bar: 456], (foo, bar) -> {foo, bar}), foo: 123, bar: 456

  test "importInvoke miss", ->
    assert.rejects -> Caf.importInvoke ["foo", "bar"], [foo:123]

  test "importInvoke last has priority", ->
    assert.eq Caf.importInvoke(["foo"], [{foo:123}, {foo:456}], (foo) -> {foo}), foo: 456

  test "importInvoke - global has last has priority", ->
    assert.eq Caf.importInvoke(["Math"], [{Math:123}], (Math) -> {Math}), Math: 123
