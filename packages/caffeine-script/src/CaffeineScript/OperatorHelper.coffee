{a, m, w, compactFlatten, log, min, arrayWithout} = require "art-foundation"

module.exports = class OperatorHelper
  @CoffeeScriptGlobal: CoffeeScriptGlobal = "Caf"

  @operatorMap:
    "**": (a, b) -> "#{CoffeeScriptGlobal}.pow(#{a}, #{b})"
    "//": (a, b) -> "#{CoffeeScriptGlobal}.div(#{a}, #{b})"
    "%%": (a, b) -> "#{CoffeeScriptGlobal}.mod(#{a}, #{b})"
    in:   (a, b) -> "#{CoffeeScriptGlobal}.in(#{a}, #{b})"
    "?":  (a, b) -> "#{CoffeeScriptGlobal}.existsOr(#{a}, ()=>{return #{b}})"

  @infix: infix = (a, b, op) -> "#{a} #{op} #{b}"
  @precidence: [
    w "left  ?"
    w "right **"
    w "left  * / % // %%"
    w "left  + -"
    w "left  << >> >>>"
    w "left  < <= > >= instanceof in"
    w "left  === !=="
    w "left  &"
    w "left  ^"
    w "left  |"
    w "left  &&"
    w "left  ||"
  ]

  @binaryOperatorToJs: (operand, a, b) ->
    f = OperatorHelper.operatorMap[operand] || infix
    f a, b, operand

  @opsToPrecidence: {}

  @getOpPrecidence: (op) =>
    unless (p = @opsToPrecidence[op])?
      throw new Error "OperatorHelper: operator '#{op}' not defined"
    p

  @direction = for [direction, ops...], i in @precidence
    @opsToPrecidence[op] = i for op in ops
    direction

  @resolveOperatorPrecidence: (ops, operands, combinerOverride) =>
    throw new Error unless operands.length == ops.length + 1
    while ops.length > 0

      lowestPrecidence = @getOpPrecidence ops[0]
      firstOccurance = lastOccurance = 0
      for op, i in ops
        if lowestPrecidence > p = @getOpPrecidence op
          firstOccurance = lastOccurance = i
          lowestPrecidence = p
        else if lowestPrecidence == p
          lastOccurance = i

      opIndexToResolve = if @direction[lowestPrecidence] == "left" then firstOccurance else lastOccurance

      opsBefore = ops
      operandsBefore = operands

      op = ops[opIndexToResolve]
      operandA = operands[opIndexToResolve]
      operandB = operands[opIndexToResolve + 1]
      ops = arrayWithout ops, opIndexToResolve

      operands = arrayWithout operands, opIndexToResolve
      combiner = combinerOverride || @operatorMap[op] || infix
      operands[opIndexToResolve] = combiner operandA, operandB, op

    throw new Error unless operands.length == 1
    operands[0]
