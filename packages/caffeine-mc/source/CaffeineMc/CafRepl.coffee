# Some code FROM: https://github.com/jashkenas/coffeescript/blob/master/src/repl.coffee

{currentSecond, merge, objectKeyCount, isArray, isArrayUniversal, isPlainObjectUniversal, formattedInspect, defineModule, log, compactFlatten} = require 'art-standard-lib'
{getCaffeineInit} = require './SourceRoots'
{runInContext, displayError} = CaffeineMc = require './namespace'

Register = require './Register'

repl = require 'repl'
path = require 'path'
fs = require 'fs'

historyFile = path.join process.env.HOME, '.caffeine-mc-history' if process.env.HOME
historyMaxInputSize = 10240
maxOutputLines = 30
maxOutputCharacters = maxOutputLines * 200

{highlight} = require './Highlight'

defineModule module, class CafRepl
  logReplInfo = (categoryName, info) ->
    out = categoryName.gray
    out += info.green if info?
    log out

  @start: (parser) ->
    getCaffeineInit()
    .then (init) =>
      showSource = false
      evaluateMode = true
      verbose = false
      lastOutput = null
      toggleVerbose = ->
        Register.verbose = verbose = !verbose

      {@compiler, config} = init

      logReplInfo "Welcome to the CaffeineMC console."
      logReplInfo "For help: ", ".help"
      @_showCurrentCompiler()

      @cafRepl = repl.start
        prompt: @getPrompt()

        completer: (command)=>
          trimmedCommand = command.trim()
          commandToEval = if result = trimmedCommand.match regex = /\.([$\w\u007f-\uffff]*)$/
            [__, last] = result
            trimmedCommand.split(regex)[0]
          else if trimmedCommand.match /^[$\w\u007f-\uffff]*$/
            last = trimmedCommand
            "global"
          else
            trimmedCommand

          out = try
            result = @_replEval commandToEval

            keys = for k of result when !last || k.match(last)?.index == 0
              k

            @cafRepl.outputStream.write "\n" + (formattedInspect
              "tab-completion": merge
                object: commandToEval
                prefix: last ? "(none)"
                found: if keys.length <= 3 then keys.join ', ' else
                  (keys.slice(0,3).join ', ') + "..."
              {color: true}
            ) + if keys.length > 3
              "  press tab again to show all #{keys.length}\n".gray
            else ""

            if last || /\.$/.test command
              [keys, last]
            else
              [
                ".#{key}" for key in keys
                ""
              ]
          catch error
            @cafRepl.outputStream.write "\ntab-completion could not evaluate: #{commandToEval.red}\n"
            [[], trimmedCommand]

          if out[0].length == 0
            @cafRepl.displayPrompt true
          out

        eval: (command, context, filename, callback) =>
          try
            startTime = currentSecond()
            if command.trim() == ''
              return callback()

            if showSource || !evaluateMode
              @cafRepl.outputStream.write "Source:\n".grey
              @cafRepl.outputStream.write highlight @compileCommand command, filename
              @cafRepl.outputStream.write "\n\n"


            result = if evaluateMode
              @cafRepl.outputStream.write "Evaluate...\n".grey if showSource
              @replEval command, context, filename
            else
              "evaluation off (.evaluate to turn back on)".grey
              undefined

            (@replEval "global", context, filename).$last = result

            midTime = currentSecond()
            log.resolvePromiseWrapper result, (toLog, label, wasResolved, wasRejected) =>
              finalTime = currentSecond()
              lastOutput = out = formattedInspect(
                if label then {"#{label}": toLog} else toLog
                color: true
              )

              @cafRepl.outputStream.write "\nOut:\n".grey if showSource && evaluateMode

              finalOut = ((lines = out.split("\n")).slice 0, maxOutputLines).join "\n"
              finalOut = finalOut.slice 0, maxOutputCharacters if finalOut.length > maxOutputCharacters

              log "" if wasResolved || wasRejected
              log finalOut
              if finalOut != out
                logReplInfo "output truncated"
                if isArray toLog
                  logReplInfo "  array: length: #{toLog.length}"
                else if isPlainObjectUniversal toLog
                  logReplInfo "  object: keys: #{objectKeyCount toLog}"
                if lines.length > maxOutputLines
                  logReplInfo "  showing: #{maxOutputLines}/#{lines.length} lines"
                else
                  logReplInfo "  showing: #{finalOut.length}/#{lastOutput.length} characters"
                logReplInfo "  show all:                      ", ".last"
                logReplInfo "  result available at:           ", "$last"

              if wasResolved || wasRejected
                logReplInfo "  promise wall-time:             ", "#{(finalTime - midTime) * 1000 | 0}ms"
                logReplInfo "  total wall-time:               ", "#{(finalTime - startTime) * 1000 | 0}ms"

                if !wasRejected
                  logReplInfo "  resolved value available at:   ", "$lastResolved"
                  (@replEval "global", context, filename).$lastResolved = toLog

                else
                  logReplInfo "  rejected value available at:   ", "$lastRejected"
                  (@replEval "global", context, filename).$lastRejected = toLog

                (@replEval "global", context, filename).$lastPromise = result
                logReplInfo "  promise available at:          ", "$lastPromise"
                @cafRepl.displayPrompt()
            if midTime - startTime > .1
              logReplInfo "wall-time: ", "#{(midTime-startTime)*1000 | 0}ms"

            callback()
          catch e
            callback e

      @setupHistory()
      @addCommand
        name: 'compiler'
        help: 'CaffeineMC: Show the current compiler'
        action: =>
          @cafRepl.outputStream.write formattedInspect @compiler.current
          @cafRepl.outputStream.write "\n"
          @cafRepl.displayPrompt()

      @addCommand
        name: "last"
        help: "CaffeineMC: Show the last output value in its entirety. $last contains the value of the last output."
        action: =>
          @cafRepl.outputStream.write "#{lastOutput}"
          @cafRepl.outputStream.write "\n"
          @cafRepl.displayPrompt()

      @addCommand
        name: "evaluate"
        help: "toggle evaluate command"
        action: =>
          evaluateMode = !evaluateMode
          @cafRepl.outputStream.write "Evaluate Mode is #{if evaluateMode then 'On' else 'Off'}\n"
          @cafRepl.displayPrompt()

      @addCommand
        name: "verbose"
        help: "toggle verbose logging"
        action: =>
          toggleVerbose()
          @cafRepl.outputStream.write "Verbose logging is #{if verbose then 'On' else 'Off'}\n"
          @cafRepl.displayPrompt()

      @addCommand
        name: "source"
        help: "toggle show-source"
        action: =>
          showSource = !showSource
          @cafRepl.outputStream.write "Show-Source Mode is #{if showSource then 'On' else 'Off'}\n"
          @cafRepl.displayPrompt()

      runInContext "Neptune.CaffeineMc.register()", @cafRepl.context

    .catch (error) ->
      log.error replError: error

  ##################
  # PRIVATE
  ##################
  @getPrompt: -> "caf-mc:#{@compiler.compilerName}> ".gray

  @compileCommand: (command, filename) ->
    command = command.trim()
    {compiled:{js}} = @compiler.compile command, bare: true, sourceFile: filename, cache: filename != "repl"
    try
      require("prettier").format js, parser: 'babel'
    catch e
      displayError e

  @_showCurrentCompiler: ->
    logReplInfo "Your current compiler is: ", @compiler.compilerName

  @_replEval: (command, context = @cafRepl.context, filename = 'repl') ->
    js = @compileCommand command, filename
    if command.match /^\|/
      @compiler.lastMetacompilerResult
    else
      runInContext js, context

  lastCompiler = null
  @replEval: (command, context = @cafRepl.context, filename = 'repl') ->
    result = error = null
    try
      js = @compileCommand command, filename

      try
        result = if command.match /^\|/
          @compiler.lastMetacompilerResult
        else
          runInContext js, context

        if lastCompiler != @compiler
          @_showCurrentCompiler()
          lastCompiler = @compiler

        @cafRepl.setPrompt @getPrompt()

      catch e
        error = e

    catch e
      displayError e
      result = null

    throw error if error

    result


  ###
  Code BELOW was adapted FROM CoffeeScript's REPL:
    https://github.com/jashkenas/coffeescript/blob/master/src/repl.coffee
  ###

  # Store and load command history from a file
  @setupHistory: (filename = historyFile, maxSize = historyMaxInputSize) ->

    @addHistoryListener filename, maxSize

    # Add a command to show the history stack
    @addCommand
      name: 'history'
      help: 'Show command history'
      action: =>
        @cafRepl.outputStream.write "#{@cafRepl.history[..].reverse().join '\n'}\n"
        @cafRepl.displayPrompt()

  @loadHistory: (filename, maxSize) ->
    lastLine = null
    try
      # Get file info and at most maxSize of command history
      stat = fs.statSync filename
      size = Math.min maxSize, stat.size

      # Read last `size` bytes from the file
      readFd = fs.openSync filename, 'r'
      buffer = Buffer.alloc size
      fs.readSync readFd, buffer, 0, size, stat.size - size
      fs.closeSync readFd

      # Set the history on the interpreter
      @cafRepl.history = buffer.toString().split('\n').reverse()

      # If the history file was truncated we should pop off a potential partial line
      @cafRepl.history.pop() if stat.size > maxSize

      # Shift off the final blank newline
      @cafRepl.history.shift() if @cafRepl.history[0] is ''
      @cafRepl.historyIndex = -1
      lastLine = @cafRepl.history[0]

    lastLine

  @addHistoryListener: (filename, maxSize) ->
    fd = fs.openSync filename, 'a'

    lastLine = @loadHistory filename, maxSize

    @cafRepl.addListener 'line', (code) ->
      if code and code.length and code isnt '.history' and code isnt '.exit' and lastLine isnt code
        # Save the latest command in the file
        fs.writeSync fd, "#{code}\n"
        lastLine = code

    @cafRepl.on 'exit', -> fs.closeSync fd

  @addCommand: ({name, help, action}) ->
    @cafRepl.commands[name] = {help, action}
