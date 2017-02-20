Foundation = require 'art-foundation'
{escapeUnescaped, escapeNewLines} = require '../Lib'

{log, a, w, m, defineModule, compactFlatten, present, escapeJavascriptString, BaseObject} = Foundation

defineModule module, class StatementsStn extends require './BaseStn'

  toJs: ->
    @getChildrenStatementsJsArray().join "; "

  toFunctionBodyJs: (returnAction = true)->
    @toFunctionBodyJsArray(returnAction).join "; "

  toFunctionBodyJsArray: (returnAction = true)->
    @getChildrenStatementsJsArray true, returnAction

  getChildrenStatementsJsArray: (returnLastValue = false, returnAction = "return", generateStatements = true)->
    if returnAction == true
      returnAction = "return"

    for c, i in lines = @children
      if returnLastValue && i == lines.length - 1
        if returnAction && !c.jsExpressionUsesReturn
          "#{returnAction} #{c.toJsExpression()}"
        else c.toJsExpression()
      else
        if generateStatements
          statement = c.toJsStatement()
          if statement.match /^function/
            @applyRequiredParens statement
          else
            statement
        else
          c.toJsExpression true


  toJsParenExpression: ->
    if @children.length == 1
      @children[0].toJsParenExpression()
    else
      @applyRequiredParens (@getChildrenStatementsJsArray(true, false, false)).join(", ")

