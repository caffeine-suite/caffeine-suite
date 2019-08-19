{clone, array, compactFlattenAll, ErrorWithInfo, find, Promise, merge, formattedInspect, log, defineModule, isString, upperCamelCase, randomBase62Character} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

fs = require 'fs-extra'
path = require 'path'

CaffeineMc = require './namespace'

# webpack hack
realRequire = eval 'require'

fileExists = (filename) ->
  fs.existsSync(filename) && filename

defineModule module, class Run extends BaseClass

  @_resolveSourceFile: (options) ->
    {sourceFile, color} = options
    merge options, sourceFile: if fs.existsSync sourceFile
      sourceFile
    else if (found = find realRequire.extensions, (v, k) -> fileExists "#{sourceFile}#{k}")
      found
    else
      e = new Error "No matching file found: #{formattedInspect {sourceFile, extensions: Object.keys(realRequire.extensions).join ' '}}"
      e.stack = if color then e.message.red else e.message
      throw e

  rewriteArgv = (sourceFile, args) ->
    process.argvRaw = process.argv
    process.argv = compactFlattenAll sourceFile, args

  @runFile: (sourceFile, options) =>
    {globalCompilerOptions} = Neptune.CaffeineMc
    try
      Neptune.CaffeineMc.globalCompilerOptions = options
      @setupNodeForRun @_resolveSourceFile options = merge options, {sourceFile}

      realRequire realRequire.main.filename
    finally
      Neptune.CaffeineMc.globalCompilerOptions = globalCompilerOptions


    # CaffeineMc.compileFile sourceFile, options
    # .then ({output}) =>
    #   # @runJs output.compiled.js, merge options, {sourceFile}
    # .catch (e) -> CaffeineMc.displayError e, options

  ###
  Do all the things NODE needs to make it look like
  we ran the file like "> node souceFile"
  ###
  @runJs: (js, options = {}) =>
    @setupNodeForRun options
    {main} = realRequire

    # interesting -
    # run it this way and it shows the source-line if there an error
    # setTimeout (-> main._compile js, main.filename), 0

    # run it this way, and it doesn't:
    main._compile js, main.filename

  @setupNodeForRun: (options) ->
    {sourceFile} = options
    {main} = realRequire

    main.filename =
      sourceFile = if sourceFile then fs.realpathSync(sourceFile) else '<anonymous>'
    rewriteArgv sourceFile, options.args

    # Clear the module cache.
    main.moduleCache &&= {}

    # Get the correct node_module paths for sourceFile or the current directory
    main.paths = realRequire('module')._nodeModulePaths fs.realpathSync path.dirname sourceFile || "./anonymous"
