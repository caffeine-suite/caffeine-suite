{each, formattedInspect} = require 'art-standard-lib'
Caf = Neptune.CaffeinScript.Runtime

module.exports = suite: ->
  test '1 in 1 2 3', ->
    assert.eq true, Caf.in 1, [1,2,3]

  test '5 in 1 2 3', ->
    assert.eq false, Caf.in 5, [1,2,3]

  test '5 in null',       -> assert.eq false, Caf.in 5, null
  test '5 in undefined',  -> assert.eq false, Caf.in 5, undefined

  test '"foo" in "this is a foo"', ->
    assert.eq true, Caf.in "foo", "this is a foo"

  test '"Foo" in "this is a foo"', ->
    assert.eq false, Caf.in "Foo", "this is a foo"
