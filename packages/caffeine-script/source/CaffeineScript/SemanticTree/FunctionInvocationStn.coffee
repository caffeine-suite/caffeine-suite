Foundation = require 'art-foundation'

{log, a, w, m, defineModule, compactFlatten, present, escapeJavascriptString, BaseObject} = Foundation
SemanticTree = require './namespace'

defineModule module, class FunctionInvocationStn extends require './ValueBaseCaptureStn'

  constructor: (props, children) ->
    super
    [functionValue, argStns...] = children
    @argStns = argStns
    @functionValue = functionValue

    # collapse implicit arrays into parents
    if @argStns.length == 1 && @argStns[0].props.implicitArray
      @argStns = @argStns[0].children

    @props.conditional ||= true if @parseTreeNode?.conditional

  needsParens: false

  @getter
    conditional: -> @props.conditional

  transform: ->
    {BinaryOperatorStn, AccessorStn, IdentifierStn, SimpleLiteralStn, SemanticTokenStn} = SemanticTree

    if @conditional
      {value1, value2} = @getValueWithBaseCapture @functionValue
      BinaryOperatorStn
        operator: "&&"
        SemanticTree.FunctionInvocationStn null,
          AccessorStn null,
            IdentifierStn identifier: "Caf"
            IdentifierStn identifier: "isF"
          value1

        SemanticTree.FunctionInvocationStn value2, @argStns

    else
      super

  toJs: ->
    throw new Error "can't be conditional here" if @conditional
    "#{valueJs = @functionValue.toJsExpression()}#{@applyRequiredParens (a.toJsExpression() for a in @argStns).join ', '}"

