Foundation = require 'art-foundation'

{log, a, w, m, defineModule, compactFlatten, present, isFunction, BaseObject} = Foundation

defineModule module, class BinaryOperatorStn extends require './BaseStn'

  constructor: (props, [@left, @right]) ->
    super

  toJs: -> @toJsExpression()

  toJsExpression: (options = {})->
    {skipParens} = options
    contents = "#{@left.toJsExpression()} #{@props.operand} #{@right.toJsExpression()}"
    if skipParens
      contents
    else
      "(#{contents})"
