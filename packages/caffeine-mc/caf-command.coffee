# enable multi-context type-support (slower, but other wise the same)
global.ArtStandardLibMultipleContextTypeSupport = true

colors = require "colors"
glob = require "glob-promise"
fs = require 'fs-extra'
path = require 'path'

require 'coffee-script/register'

# webpack hack
realRequire = eval 'require'

{version, displayError, CafRepl, CompileCache} = CaffeineMc = eval('require') './index'
{log, dashCase, escapeRegExp, present, isString,
Promise, formattedInspect, each, escapeRegExp
} = Neptune.Art.StandardLib

# Preload pre-compiled art-foundation for dramatically faster load-times...

commander = require "commander"
.version version
.usage('[options] <input files and directories>')
.option '-o, --output <directory>', "where to write output files"
.option '-c, --compile', 'compile files'
.option '-C, --cache', 'DEPRICATED - cache is on by default'
.option '--nocache', 'disable compile cache'
.option '-p, --prettier', 'apply "prettier" to any js output'
.option '-t, --transpile [presets...]', 'transpile with babel'
.option '-d, --debug', 'show debug info'
.option '-v, --verbose', 'show more output'
.option '-r, --reset', 'reset cache'
# .option '-m, --map',        'generate source map and save as .js.map files'
.option '-M, --inlineMap', 'generate source map and include it directly in output'
.option '--versions [compiler-npm-name]', "show caffeine-mc's version OR the specified caffeine-mc-compatible compiler's version"
.on "--help", ->
  console.log """
    An output directory is required if more than one input file is specified.

    Default action, if a file is provided, is to execute it.
    """
.parse process.argv

displayError = (e) ->
  CaffeineMc.displayError e, commander

{reset, output, compile, prettier, transpile, verbose, versions, cache, nocache} = commander

cache = !nocache

fileCounts =
  read: 0
  written: 0
  compiled: 0
  fromCache: 0

compileFile = (filename, outputDirectory) ->
  CaffeineMc.compileFile(filename, {
    outputDirectory: outputDirectory || output || path.dirname filename
    prettier
    transpile
    cache
    inlineMap: commander.inlineMap
  })
  .then ({readCount, writeCount, output}) ->

    if output.fromCache
      fileCounts.fromCache += readCount
    else
      fileCounts.compiled += readCount

    if verbose
      if output.fromCache
        log "cached: #{filename.grey}"
      else
        log "compiled: #{filename.green}"

    fileCounts.read += readCount
    fileCounts.written += writeCount

compileDirectory = (dirname) ->
  glob path.join dirname, "**", "*.caf"
  .then (list) ->
    serializer = new Promise.Serializer
    each list, (filename) ->
      relative = path.relative dirname, filename
      if output
        outputDirectory = path.join output, path.dirname relative

      serializer
      .then ->
        Promise.then -> outputDirectory && fs.ensureDir outputDirectory
        .then -> compileFile filename, outputDirectory

    serializer

if reset
  CompileCache.reset()

# process.argv = [] 'caf' # [fs.realpathSync 'caf']

#################
# COMPILE FILES
#################
if compile
  files = commander.args

  # if !output and files.length == 1
  #   [filename] = files
  #   unless fs.statSync(filename).isDirectory()
  #     output = path.dirname filename

  if files.length > 0 #&& output
    verbose && log compile:
      inputs: if files.length == 1 then files[0] else files
      output: output
    log "caffeine-mc loaded" if verbose
    log {prettier, transpile} if verbose && (transpile || prettier)
    serializer = new Promise.Serializer


    each files, (filename) ->
      serializer.then ->
        if fs.statSync(filename).isDirectory()
          compileDirectory filename
        else
          compileFile filename

    serializer.then ->
      if commander.debug
        log DEBUG:
          loadedModules: Object.keys realRequire('module')._cache
          registeredLoaders: Object.keys realRequire.extensions

      log success: {fileCounts}
    serializer.catch displayError
  else
    commander.outputHelp()

#################
# RUN FILE
#################
else if commander.args.length >= 1
  [fileToRun, args...] = commander.args

  CaffeineMc.register()
  CaffeineMc.runFile fileToRun, {color: true, cache, verbose, args}

else if versions
  if isString versions
    compiler = realRequire dashCase versions
    log
      "#{versions}": compiler.version || compiler.VERSION
  log
    Neptune: Neptune.getVersions()

#################
# START REPL
#################
else
  CafRepl.start()
  # commander.outputHelp()

