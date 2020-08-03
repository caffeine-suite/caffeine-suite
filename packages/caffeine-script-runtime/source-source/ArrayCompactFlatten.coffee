{isPlainArray} = require './Types'

doFlattenInternal = (array, output) ->
  for el in array
    if isPlainArray el  then doFlattenInternal el, output
    else if el?         then output.push el

  output

needsFlatteningOrCompacting = (array) ->
  for el in array when !el? || isPlainArray el
    return true
  false

compactFlattenIfNeeded = (array)->
  if needsFlatteningOrCompacting array
    doFlattenInternal array, []

  else array

module.exports =

  compactFlatten: (array )->
    compactFlattenIfNeeded array
