# Some code FROM: https://github.com/jashkenas/coffeescript/blob/master/src/repl.coffee

{formattedInspect, defineModule, log, compactFlatten} = require 'art-standard-lib'
{getCaffeineInit} = require './SourceRoots'
{runInContext, displayError} = CaffeineMc = require './namespace'

repl = require 'repl'
path = require 'path'
fs = require 'fs'

historyFile = path.join process.env.HOME, '.caffeine-mc-history' if process.env.HOME
historyMaxInputSize = 10240
maxOutputLines = 20
maxOutputCharacters = maxOutputLines * 80

defineModule module, class CafRepl
  @start: (parser) ->
    getCaffeineInit()
    .then (init) =>
      lastOutput = null
      {@compiler, config} = init

      @cafRepl = repl.start
        prompt: @getPrompt()

        completer: (command)=>
          try
            commandToReturn = command
            trimmedCommand = command.trim()
            commandToEval = if result = trimmedCommand.match regex = /\.([$\w\u007f-\uffff]*)$/
              [__, last] = result
              trimmedCommand.split(regex)[0]
            else
              trimmedCommand

            result = @replEval commandToEval

            keys = for k of result when !last || k.match(last)?.index == 0
              k

            [keys, last || ""]
          catch
            [[], command]

        eval: (command, context, filename, callback) =>
          try
            lastOutput = out = formattedInspect(
              @replEval command, context, filename
              color: true
            )
            finalOut = ((lines = out.split("\n")).slice 0, maxOutputLines).join "\n"
            finalOut = finalOut.slice 0, maxOutputCharacters if finalOut.length > maxOutputCharacters

            log finalOut
            if finalOut != out
              log "output truncated".gray
              if lines.length > maxOutputLines
                log "  showing: #{maxOutputLines}/#{lines.length} lines".gray
              else
                log "  showing: #{finalOut.length}/#{lastOutput.length} characters".gray
              log "  show all: .last".gray

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
        help: "CaffeineMC: Show the last output value in its entirety."
        action: =>
          @cafRepl.outputStream.write "#{lastOutput}"
          @cafRepl.outputStream.write "\n"
          @cafRepl.displayPrompt()


    .catch (error) ->
      log.error replError: error

  ##################
  # PRIVATE
  ##################
  @getPrompt: -> "caf-mc:#{@compiler.compilerName}> ".gray

  @replEval: (command, context = @cafRepl.context, filename) ->
    result = error = null
    try
      command = command.trim()

      {compiled:{js}} = @compiler.compile command, bare: true, sourceFile: filename

      try
        result = if command.match /^\|/
          @compiler.lastMetacompilerResult
        else
          runInContext js, context
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
