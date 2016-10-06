{a, m, w, compactFlatten, log} = require "art-foundation"
{Parser, Nodes, Extensions} = require 'babel-bridge'
{BinaryOperatorStn, ControlOperatorStn, DodAccessorStn} = require '../SemanticTree'

module.exports =

  statement: "statementWithoutEnd newLineBinOp* end"

  tailControlOperator: / +(if|while|until|unless) +/
  tailControlOperatorComplexExpression: "tailControlOperator complexExpression"

  statementWithoutEnd: a
    pattern: '/ *\n/* lineCommentEnd* complexExpression !tailControlOperator'
    m
      pattern: 'complexExpression tailControlOperatorComplexExpression+',
      getStn: ->
        stn = @complexExpression.getStn()
        for tco in @tailControlOperatorComplexExpressions
          stn = ControlOperatorStn
            operand: tco.tailControlOperator.toString().trim()
            tco.complexExpression.getStn()
            stn
        stn

  newLineStart:
    pattern: /( *\n)+/
    getPresent: -> false

  newLineBinOp: a
    pattern: "newLineStart &binaryOperator binaryOperatorExtension+"
    m pattern: "newLineStart &dot_ valueExtension+ binaryOperatorExtension*"

  binaryOperatorExtension:
    pattern: "_? binaryOperator _? complexExpression"
    stnProps: -> operand: @binaryOperator.toString()
    stnFactory: "BinaryOperatorStn"
    stnExtension: true

  # newLineBinOpStart: w "dot_ binaryOperator"
