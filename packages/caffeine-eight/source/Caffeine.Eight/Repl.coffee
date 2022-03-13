{defineModule, formattedInspect, isClass, log} = require 'art-standard-lib'

# In order to use CaffeineEight in the browser, webpack looks at all files for require statements
# We just need webpack to ignore these requires as they won't be used.
realRequire = eval("require")

defineModule module, class Repl
  @caffeineEightRepl: (parser, options) ->
    parser = new parser if isClass parser

    try realRequire 'colors'

    if options?.load
      log "TODO: load, parse and evaluate these files: #{options.load.join ', '}"

    realRequire('repl').start
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
          log parser.getParseFailureInfo(color: true, verbose: options.verbose).replace "<HERE>", "<HERE>".red
          callback()
