Foundation = require 'art-foundation'

{log, a, w, m, defineModule, compactFlatten, present, escapeJavascriptString, BaseObject} = Foundation

ArrayStn = require './ArrayStn'

defineModule module, class AssignmentStn extends require './BaseStn'
  constructor: (props, [@lValue, @rValue]) ->
    super

  updateScope: (@scope) ->
    if @lValue.type == "Identifer"
      @scope.addIdentifierAssigned @lValue.props.identifier
    super

  toJs: ->
    "#{@lValue.toJs()} = #{@rValue.toJsExpression()}"