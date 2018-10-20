module.exports =
  highlight: (js) ->
    chalk = require 'chalk'
    cardinal = require 'cardinal'

    normalizeChalkColor = (clk) -> (str) -> clk str

    keywordColor = normalizeChalkColor chalk.yellow
    operatorColor = normalizeChalkColor chalk.magenta
    functionDeclarationColor = normalizeChalkColor chalk.blue
    itentifierColor = (str) -> str # normalizeChalkColor chalk.white.dim

    options =
      linenos: true
      theme:

        Identifier:
          'undefined':  keywordColor
          'null':       keywordColor
          _default    :  (s, info) ->
            prevToken = info.tokens[info.tokenIndex - 1];
            nextToken = info.tokens[info.tokenIndex + 1];

            if  nextToken?.type == 'Punctuator' &&
                nextToken?.value == '(' &&
                prevToken?.type == 'Keyword' &&
                prevToken?.value == 'function'
              functionDeclarationColor s
            else if nextToken?.value == ":"
              functionDeclarationColor s
            else
              itentifierColor s

        Line:       _default: normalizeChalkColor chalk.grey
        Block:      _default: normalizeChalkColor chalk.grey
        Boolean:    _default: keywordColor
        Null:       _default: keywordColor
        Numeric:    _default: normalizeChalkColor chalk.red
        String:     _default: normalizeChalkColor chalk.green
        Keyword:    _default: keywordColor
        Punctuator: _default: operatorColor

    cardinal.highlight js, options
