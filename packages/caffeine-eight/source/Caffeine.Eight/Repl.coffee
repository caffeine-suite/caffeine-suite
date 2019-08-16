{defineModule, formattedInspect, isClass, log} = require 'art-standard-lib'

defineModule module, class Repl
  @caffeineEightRepl: (parser) ->
    parser = new parser if isClass parser
    try require 'colors'
    require('repl').start
      prompt: "#{parser.getClassName()}> ".grey
      eval: (command, context, filename, callback) ->
        try
          result = parsed = parser.parse command.trim()
          try
            log if undefined == result = parsed.evaluate?() then parsed else result
            callback()
          catch e
            callback e
        catch e
          log parser.getParseFailureInfo(color: true).replace "<HERE>", "<HERE>".red
          callback()
