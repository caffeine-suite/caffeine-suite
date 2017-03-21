{defineModule, log} = require 'art-standard-lib'
{getCaffeineInit} = require './SourceRoots'
{evalInContext, displayError} = CaffeineMc = require './namespace'

repl = require 'repl'

defineModule module, class CafRepl
  @start: (parser) ->
    getCaffeineInit()
    .then (init) ->
      {compiler, config} = init

      getPrompt = -> "caf:#{compiler.compilerName}> "

      cafRepl = repl.start
        prompt: getPrompt()
        eval: (command, context, filename, callback) ->
          try
            {compiled:{js}} = compiler.compile command
            try
              result = evalInContext js, context
              cafRepl.setPrompt getPrompt()
              callback null, result

            catch e
              callback e
          catch e
            displayError e
            callback()

    .catch (error) ->
      log.error replError: error