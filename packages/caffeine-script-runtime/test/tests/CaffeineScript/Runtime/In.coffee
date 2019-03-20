{each, formattedInspect} = require 'art-standard-lib'
Caf = Neptune.CaffeinScript.Runtime

module.exports = suite: ->
  test '1 in 1 2 3', ->
    assert.true Caf.in 1, [1,2,3]

  test '5 in 1 2 3', ->
    assert.false Caf.in 5, [1,2,3]

  test '"foo" in "this is a foo"', ->
    assert.true Caf.in "foo", "this is a foo"

  test '"Foo" in "this is a foo"', ->
    assert.false Caf.in "Foo", "this is a foo"
