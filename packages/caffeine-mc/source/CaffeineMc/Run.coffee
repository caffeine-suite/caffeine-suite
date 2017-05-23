{array, log, ErrorWithInfo, find, Promise, merge, formattedInspect, log, defineModule, isString, upperCamelCase, randomBase62Character} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

fs = require 'fs-extra'
path = require 'path'

CaffeineMc = require './namespace'

# webpack hack
realRequire = eval 'require'

fileExists = (filename) ->
  fs.existsSync(filename) && filename

defineModule module, class Run extends BaseClass

  @findSourceFile: (sourceFile, options) ->
    if fs.existsSync sourceFile
      sourceFile
    else if (found = find realRequire.extensions, (v, k) -> fileExists "#{sourceFile}#{k}")
      found
    else
      e = new Error "No matching file found: #{formattedInspect {sourceFile, extensions: Object.keys(realRequire.extensions).join ' '}}"
      e.stack = if options?.color then e.message.red else e.message
      throw e

  @runFile: (sourceFile, options) =>
    sourceFile = @findSourceFile sourceFile, options
    CaffeineMc.compileFile sourceFile, options
    .then ({output}) => @runJs output.compiled.js, merge options, {sourceFile}
    .catch (e) -> CaffeineMc.displayError e, options

  ###
  Do all the things NODE needs to make it look like
  we ran the file like "> node souceFile"
  ###
  @runJs: (js, options = {}) ->
    {sourceFile} = options
    {main} = realRequire

    main.filename = process.argv[1] =
      if sourceFile then fs.realpathSync(sourceFile) else '<anonymous>'

    # Clear the module cache.
    main.moduleCache &&= {}

    # Get the correct node_module paths for sourceFile or the current directory
    main.paths = realRequire('module')._nodeModulePaths fs.realpathSync path.dirname sourceFile || "./anonymous"

    # interesting - run it this way and it shows the source-line if there an error
    # setTimeout (-> main._compile js, main.filename), 0
    main._compile js, main.filename
