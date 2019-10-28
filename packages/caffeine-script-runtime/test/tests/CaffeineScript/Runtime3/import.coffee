{Caf} = require "./StandardImport"

module.exports = suite: ->
  test "importInvoke basic", ->
    assert.eq Caf.autoImport(["foo"], [foo:123], (foo) -> {foo}), foo: 123

  test "imports only requested", ->
    assert.eq Caf.autoImport(["foo"], [foo:123, bar: 456], (foo) -> {foo}), foo: 123

  test "importInvoke two", ->
    assert.eq Caf.autoImport(["foo", "bar"], [foo:123, bar: 456], (foo, bar) -> {foo, bar}), foo: 123, bar: 456

  test "importInvoke miss", ->
    assert.rejects -> Caf.autoImport ["foo", "bar"], [foo:123]

  test "importInvoke last has priority", ->
    assert.eq Caf.autoImport(["foo"], [{foo:123}, {foo:456}], (foo) -> {foo}), foo: 456

  test "importInvoke - global has last has priority", ->
    assert.eq Caf.autoImport(["Math"], [{Math:123}], (Math) -> {Math}), Math: 123
