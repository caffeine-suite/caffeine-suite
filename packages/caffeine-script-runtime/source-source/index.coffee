require './Global'

merge = (list) ->
  out = {}
  for l in list
    out[k] = v for k, v of l
  out

module.exports = global.CaffeineScriptRuntime ?= merge [
 require './ArrayCompactFlatten'
 require './Iteration'
 require './Iteration2'
 require './Lib'
 require './Import'
]