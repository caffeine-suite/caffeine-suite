Foundation = require 'art-foundation'
ScopeStnMixin = require './ScopeStnMixin'

{peek, log, formattedInspect, a, w, m, defineModule, compactFlatten, present, escapeJavascriptString, BaseObject} = Foundation

SemanticTree = require './namespace'


defineModule module, class ComprehensionStn extends ScopeStnMixin require './BaseStn'

  # updateScope: (@scope) ->
  #   if @lValue.type == "Reference"
  #     @scope.addIdentifierAssigned @lValue.toJs()
  #   super

  ###
  TODO
  capture-loop-variables (CLV):
    Some circumstances require capturing the loop variables:

    - when-block assigns to any of the loop variables
      (and the with-block reads the one or more of those assigned variables)
      (or there is no with-block and the when-block assigns to the value-loop-variable)
      Basically, I think the first pass is: when-block-assigns-to-any-loop-variable.

    - there is already a same-named variable in the enclosing scope as one of the loop variables

    If we detect we should capture-loop-variables, we need to:

    - declare that we assign to the loop variables. This will create the correct lets, taking into
      account if any of the loop variables matches an enclosing-scope-variable.

    - capture all loop variables in the when-block, if present, otherwise in the with-block.
      If the when-block is present, then the with-block's arguments become empty - it just uses
      the captured values.

      - generate an unused variable name for each loop variable, perferrably similar to each, then:
      - (_value, _key, _into, _whenResult) => {value = _value; key = _key; into = _into; whenResult = _whenResult}
      - but only for the loop-variables declared.

    - Explicitly create the default with-block if only the when-block is present so that it can
      use the captured value-variable rather than the one passed to it by the iteration function.
      This covers the special case of the when-block assigning to the value-variable.

  TODO explicit iterationTypes:
    ExampleA: object v from array a
    ExampleB: object v from object a
    ExampleC: object v from iter a

    I really need to test if that has any practical performance gain.

    It would dramatically increase the size of the iteration library
    to take into account all those sub-options.

    Not sure it's worth it.

    My intention is to provide the standard javascript 'while' loop for performance - and
    for the ability to use returns and breaks. The only change is while returns a value,
      probably the value returned from the last execution of the body or undefined.

    If we do explicit iterationTypes, my intention is the lib names be:

    oFromA
    oFromO
    oFromI

    and so on for o, a, f, r, e >> 3x the functions

  ###


  transform: ->
    @children = @transformChildren()
    @initLabeledChildren()
    {
      outputType
      variableDefinition
      body
      iterable
      whenClause
      into
    } = @labeledChildren

    outputType = outputType?.props.token
    iterationFunction = outputType.slice 0,1

    {
      FunctionDefinitionStn
      IdentifierStn
      FunctionInvocationStn
      FunctionDefinitionArgsStn
      FunctionDefinitionArgStn
      SimpleLiteralStn
      AssignmentStn
      ValueStn
      ObjectStn
      ArrayStn
      AccessorStn
      ControlOperatorStn
      StatementsStn
    } = SemanticTree
    # variableDefinition ||= FunctionDefinitionArgsStn FunctionDefinitionArgStn IdentifierStn identifier: "v"


    ###
    EXAMPLES:
      # IN
      find v from o with v > 10

      # PSEUDO-OUT
      Caf.ee o, null, (v, k, out, brk) ->
        brk v if v > 10

      # IN
      object o

      # OUT
      Caf.e(o, {}, function(v, k, into) {
        return into[k] = v;
      });
    ###

    # These should actually be
    #  a) extracted from variableDefinition...
    #  b) and if not present, unused var-names generated
    valueIdentifer = "v"
    keyIdentifer = "k"
    intoIdentifer = "into"
    brkIdentifer = "brk"

    useExtendedEach = switch outputType
      when "find" then true
      else false

    variableDefinition = FunctionDefinitionArgsStn null,
      valueVarDef = variableDefinition?.children[0] || FunctionDefinitionArgStn IdentifierStn identifier: valueIdentifer
      keyVarDef   = variableDefinition?.children[1] || FunctionDefinitionArgStn IdentifierStn identifier: keyIdentifer
      intoVarDef  = variableDefinition?.children[2] || FunctionDefinitionArgStn IdentifierStn identifier: intoIdentifer
      useExtendedEach && FunctionDefinitionArgStn IdentifierStn identifier: brkIdentifer


    if outputType == "object" || outputType == "array"
      if body
        if body.className == "StatementsStn"
          [bodyStatementsExceptLast..., lastBodyStatement] = body.children
        else
          lastBodyStatement = body
      else
        bodyStatementsExceptLast = null
        lastBodyStatement = ValueStn valueVarDef
    else
      bodyWithDefault = body || ValueStn valueVarDef


    whenClauseWrapper = if whenClause
      (actionStn) ->
        ControlOperatorStn
          operator: "if"
          whenClause
          actionStn

    else
      (actionStn) -> actionStn

    FunctionInvocationStn null,
      IdentifierStn identifier: "Caf.#{if useExtendedEach then 'ee' else 'e'}"
      iterable
      into || switch outputType
        when "object" then ObjectStn()
        when "array" then ArrayStn()
        when "each" then SimpleLiteralStn value: "undefined"
        when "find" then SimpleLiteralStn value: "null"
        when "reduce" then
        else throw new Error "not supported yet: #{outputType}"

      FunctionDefinitionStn
        bound: true
        variableDefinition

        switch outputType
          when "object"
            whenClauseWrapper StatementsStn compactFlatten [bodyStatementsExceptLast, AssignmentStn null,
              AccessorStn null,
                IdentifierStn identifier: intoIdentifer
                ValueStn keyVarDef
              lastBodyStatement
            ]

          when "array"
            whenClauseWrapper StatementsStn compactFlatten [bodyStatementsExceptLast, FunctionInvocationStn null,
              AccessorStn null,
                IdentifierStn identifier: intoIdentifer
                IdentifierStn identifier: "push"
              lastBodyStatement
            ]

          when "each"
            whenClauseWrapper bodyWithDefault

          when "find"
            if whenClause
              if body
                ControlOperatorStn
                  operator: "if"
                  whenClause

                  FunctionInvocationStn null,
                    IdentifierStn identifier: brkIdentifer
                    body
              else
                ControlOperatorStn
                  operator: "if"
                  whenClause

                  FunctionInvocationStn null,
                    IdentifierStn identifier: brkIdentifer
                    valueVarDef
            else
              if body
                ControlOperatorStn
                  operator: "if"
                  AssignmentStn null,
                    IdentifierStn identifier: "todoRealTemp"
                    body

                  FunctionInvocationStn null,
                    IdentifierStn identifier: brkIdentifer
                    IdentifierStn identifier: "todoRealTemp"

              else
                ControlOperatorStn
                  operator: "if"
                  valueVarDef

                  FunctionInvocationStn null,
                    IdentifierStn identifier: brkIdentifer
                    valueVarDef
