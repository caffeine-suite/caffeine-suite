# Some code FROM: https://github.com/jashkenas/coffeescript/blob/master/src/repl.coffee

{merge, objectKeyCount, isArray, isArrayUniversal, isPlainObjectUniversal, formattedInspect, defineModule, log, compactFlatten} = require 'art-standard-lib'
{getCaffeineInit} = require './SourceRoots'
{runInContext, displayError} = CaffeineMc = require './namespace'

repl = require 'repl'
path = require 'path'
fs = require 'fs'

historyFile = path.join process.env.HOME, '.caffeine-mc-history' if process.env.HOME
historyMaxInputSize = 10240
maxOutputLines = 20
maxOutputCharacters = maxOutputLines * 80

{highlight} = require './Highlight'

defineModule module, class CafRepl
  @start: (parser) ->
    getCaffeineInit()
    .then (init) =>
      showSource = false
      evaluateMode = true
      lastOutput = null
      {@compiler, config} = init

      log "Welcome to the CaffeineMC console.".gray
      log "For help: ".gray + ".help"
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

            log.resolvePromiseWrapper result, (toLog, label, wasResolved, wasRejected) =>
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
                log "output truncated".gray
                if isArray toLog
                  log "  array: length: #{toLog.length}".gray
                else if isPlainObjectUniversal toLog
                  log "  object: keys: #{objectKeyCount toLog}".gray
                if lines.length > maxOutputLines
                  log "  showing: #{maxOutputLines}/#{lines.length} lines".gray
                else
                  log "  showing: #{finalOut.length}/#{lastOutput.length} characters".gray
                log "  show all:                      .last".gray
                log "  result available at:           $last".gray

              if wasResolved || wasRejected
                if !wasRejected
                  log "  resolved value available at:   $lastResolved"
                  (@replEval "global", context, filename).$lastResolved = toLog

                else
                  log "  rejected value available at:   $lastRejected"
                  (@replEval "global", context, filename).$lastRejected = toLog

                (@replEval "global", context, filename).$lastPromise = result
                log "  promise available at:          $lastPromise"
                @cafRepl.displayPrompt()


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
    {compiled:{js}} = @compiler.compile command, bare: true, sourceFile: filename
    try
      require("prettier").format js
    catch e
      displayError e

  @_showCurrentCompiler: ->
    log "Your current compiler is: ".gray + @compiler.compilerName.green

  @_replEval: (command, context = @cafRepl.context, filename) ->
    js = @compileCommand command, filename
    if command.match /^\|/
      @compiler.lastMetacompilerResult
    else
      runInContext js, context

  lastCompiler = null
  @replEval: (command, context = @cafRepl.context, filename) ->
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
        @cafRepl.outputStream.write "#{@cafRepl.rli.history[..].reverse().join '\n'}\n"
        @cafRepl.displayPrompt()

  @loadHistory: (filename, maxSize) ->
    lastLine = null
    try
      # Get file info and at most maxSize of command history
      stat = fs.statSync filename
      size = Math.min maxSize, stat.size

      # Read last `size` bytes from the file
      readFd = fs.openSync filename, 'r'
      buffer = new Buffer(size)
      fs.readSync readFd, buffer, 0, size, stat.size - size
      fs.closeSync readFd

      # Set the history on the interpreter
      @cafRepl.rli.history = buffer.toString().split('\n').reverse()

      # If the history file was truncated we should pop off a potential partial line
      @cafRepl.rli.history.pop() if stat.size > maxSize

      # Shift off the final blank newline
      @cafRepl.rli.history.shift() if @cafRepl.rli.history[0] is ''
      @cafRepl.rli.historyIndex = -1
      lastLine = @cafRepl.rli.history[0]

    lastLine

  @addHistoryListener: (filename, maxSize) ->
    fd = fs.openSync filename, 'a'

    lastLine = @loadHistory filename, maxSize

    @cafRepl.rli.addListener 'line', (code) ->
      if code and code.length and code isnt '.history' and code isnt '.exit' and lastLine isnt code
        # Save the latest command in the file
        fs.writeSync fd, "#{code}\n"
        lastLine = code

    @cafRepl.on 'exit', -> fs.closeSync fd

  @addCommand: ({name, help, action}) ->
    @cafRepl.commands[name] = {help, action}
