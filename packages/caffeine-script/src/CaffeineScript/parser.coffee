Foundation = require 'art-foundation'
BabelBridge = require 'babel-bridge'

{log, a, w, m, defineModule, compactFlatten, present} = Foundation
{Parser, Nodes, Extensions} = BabelBridge
{RuleNode} = Nodes

Rules = require './Rules'

defineModule module, ->

  class CaffeineScriptParser extends Parser
    @nodeBaseClass: class CafScriptNode extends Nodes.Node

      isImplicitArray: ->
        for match in @matches when match.isImplicitArray
          return match.isImplicitArray()
        false

      toJs: (returnJsStatement)->
        for match in @matches when match.toJs
          return match.toJs returnJsStatement

        @toString()

    @rule mod for modName, mod of Rules.modules

    @rule
      root:
        pattern: 'statementOrBlankLine*'
        node:
          getStatements: -> s for s in @statementOrBlankLines when s.statement

          toJs: -> (js for s in @statementOrBlankLines when present js = s.toJs()).join("; ") + ";"
          toJsList: -> (js for s in @statementOrBlankLines when present js = s.toJs()).join ", "
          toFunctionBodyJs: ->
            (for s, i in lines = @statementOrBlankLines when present js = s.toJs notLastLine = i < lines.length - 1
              if notLastLine
                js
              else
                "return #{js}"
            ).join(";\n") + ";"
          toImplicitArrayOrValueJs: ->
            statements = @getStatements()
            if statements.length == 1
              statements[0].toJs()
            else
              "[#{(s.toJs() for s in statements).join ', '}]"

      statementOrBlankLine: a "statement", /\n/

      statement: a
        pattern: 'complexExpression end'
        toJs: (returnJsStatement = true) -> @complexExpression.toJs returnJsStatement
        m
          pattern: 'complexExpression / +(if|while|until|unless) +/ complexExpression end',
          toJs: (returnJsStatement = true) ->
            isNot = false
            switch control = @matches[1].toString().trim()
              when "until" then isNot = true; control = "while";
              when "unless" then isNot = true; control = "if";

            test = @complexExpressions[1].toJs()
            test = "!(#{test})" if isNot

            if returnJsStatement
              "#{control} (#{test}) {#{@complexExpressions[0].toJs returnJsStatement}}"
            else
              "#{test} ? #{@complexExpressions[0].toJs returnJsStatement} : null"

      blocks: 'block+'
      block: Extensions.IndentBlocks.ruleProps

      complexExpression: a
        pattern: "implicitArray"
        isImplicitArray: -> true

        m
          pattern: "expression"
          isImplicitArray: -> false

      expression: w "binOpExpression expressionWithoutBinOps"

      expressionWithoutBinOps: w "
        assign
        controlStatement
        structuredLiteral
        invocation
        value
        functionDefinition
        "

      assign: a
        pattern: "assignable / *= */ complexExpression", toJs: -> "#{@assignable.toJs()} = #{@complexExpression.toJs()}"
        m pattern: "assignable / *= */ block", toJs: -> "#{@assignable.toJs()} = #{@block.toImplicitArrayOrValueJs()}"

      invocation: a
        pattern: "value _ arguments", toJs: -> "#{@value.toJs()}(#{@arguments.toJs()})"
        m pattern: "value openParen_ arguments? _closeParen", toJs: -> "#{@value.toJs()}(#{@arguments?.toJs()|| ""})"

      arguments:
        pattern: "expression _commaExpression*"
        toJs: ->
          args = for arg in a = compactFlatten [@expression, @_commaExpressions]
            arg.toJs()

          args.join ', '

      _commaExpression:
        pattern: "_comma_ expression"
        toJs: -> @expression.toJs()

      value: w "existanceTest literal assignable"

      functionDefinition: a
        pattern: "argDefinition? _arrow_ complexExpression"
        toJs: -> "(function(#{@argDefinition?.toJs() || ""}) {return #{@complexExpression.toJs()};})"
        m
          pattern: "argDefinition? _arrow_ block"
          toJs: -> "(function() {#{@block.toFunctionBodyJs()}})"

      argDefinition:
        pattern: "openParen_ argList? _closeParen"
        toJs: -> @argList.toString()

      argList: a
        pattern: "identifier _comma_ argList", toJs: -> "#{@identifier.toJs()}, #{@argList.toJs()}"
        m pattern: "identifier _ argList", toJs: -> "#{@identifier.toJs()}, #{@argList.toJs()}"
        m pattern: "identifier", toJs: -> @identifier.toJs()

      assignable:
        pattern: "simpleAssignable accessor*"
        toJs: -> "#{@simpleAssignable.toJs()}#{(a.toJs() for a in @accessors || []).join ''}"

      simpleAssignable: "!reservedWord identifier"

      accessor: a
        pattern: "'.' simpleAssignable",                  toJs: -> ".#{@simpleAssignable.toJs()}"
        m pattern: "openBracket_ expression _closeBracket", toJs: -> "[#{@expression.toJs()}]"
