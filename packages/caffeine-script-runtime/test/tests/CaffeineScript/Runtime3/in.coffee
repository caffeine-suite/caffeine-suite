{Caf} = require './StandardImport'

module.exports = suite: ->
  test '1 in 1 2 3', ->
    assert.eq true, Caf.isIn 1, [1,2,3]

  test '5 in 1 2 3', ->
    assert.eq false, Caf.isIn 5, [1,2,3]

  test '5 in null',       -> assert.eq false, Caf.isIn 5, null
  test '5 in undefined',  -> assert.eq false, Caf.isIn 5, undefined

  test '"foo" in "this is a foo"', ->
    assert.eq true, Caf.isIn "foo", "this is a foo"

  test '"Foo" in "this is a foo"', ->
    assert.eq false, Caf.isIn "Foo", "this is a foo"
