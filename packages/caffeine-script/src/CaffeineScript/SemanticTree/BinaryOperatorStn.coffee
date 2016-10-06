Foundation = require 'art-foundation'

{log, a, w, m, defineModule, compactFlatten, present, isFunction, BaseObject} = Foundation
{binaryOperatorToJs} = require '../OperatorHelper'

defineModule module, class BinaryOperatorStn extends require './BaseStn'

  constructor: ({@operator}, [@left, @right]) ->
    super

  toJs: -> @toJsExpression()

  toJsStatement: -> @toJsExpression skipParens: true

  toJsExpression: ->
    binaryOperatorToJs @operator,
      left = @applyParens @left.toJsExpression()
      right = @applyParens @right.toJsExpression()
