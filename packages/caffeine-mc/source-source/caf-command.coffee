# enable multi-context type-support (slower, but other wise the same)
global.ArtStandardLibMultipleContextTypeSupport = true

colors = require "colors"
glob = require "glob-promise"
fs = require 'fs-extra'
path = require 'path'

# webpack hack
realRequire = eval 'require'

{version, displayError, CafRepl, CompileCache} = CaffeineMc = eval('require') './index'
{log, dashCase, escapeRegExp, present, isString,
Promise, formattedInspect, each, escapeRegExp
} = require("art-standard-lib")

# Preload pre-compiled art-foundation for dramatically faster load-times...

commander = require "commander"
.version version
.usage('[options] <input files and directories>')
.option '-o, --output <directory>', "where to write output files"
.option '-c, --compile', 'compile files'
.option '--nocache', 'disable compile cache'
.option '-p, --prettier', 'apply "prettier" to any js output'
.option '-t, --transpile [presets...]', 'transpile with babel'
.option '-d, --debug', 'show debug info'
.option '-v, --verbose', 'show more output'
.option '-r, --reset', 'reset cache'
.option '--require <packages...>', 'require one or more packages on load (e.g. --require coffee-script/register)'
.option '-m, --map',        'generate source map and save as .js.map files'
.option '-M, --inline-map',  'generate source map and include it directly in output'
.option '--versions [compiler-npm-name]', "show caffeine-mc's version OR the specified caffeine-mc-compatible compiler's version"
.on "--help", ->
  console.log """
    An output directory is required if more than one input file is specified.

    Default action, if a file is provided, is to execute it.
    """
.parse process.argv

displayError = (e) ->
  CaffeineMc.displayError e, commander

{reset, output, compile, prettier, transpile, verbose, versions, cache, nocache, require: toRequire} = commander

log {toRequire}
CaffeineMc.cacheEnabled = cache = !nocache

fileCounts =
  read: 0
  cached: 0
  compiled: 0
  unchanged: 0
  written: 0

compileFile = (filename, outputDirectory) ->
  CaffeineMc.compileFile(filename, {
    outputDirectory: outputDirectory || output || path.dirname filename
    prettier
    transpile
    cache
    sourceMap: commander.map
    inlineMap: commander.inlineMap || commander["inline-map"]
  })
  .then ({readCount, writeCount, unchangedCount, output}) ->

    if output.cached
      fileCounts.cached += readCount
    else
      fileCounts.compiled += readCount

    if verbose
      if output.cached
        log "cached: #{filename.grey}"
      else
        log "compiled: #{filename.green}"

    fileCounts.read += readCount
    fileCounts.written += writeCount
    fileCounts.unchanged += unchangedCount

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

#################
# COMPILE FILES
#################
if compile
  files = commander.args

  if files.length > 0 #&& output
    verbose && log compile:
      inputs: if files.length == 1 then files[0] else files
      output: output
    log "caffeine-mc loaded" if verbose
    log {prettier, transpile} if verbose && (transpile || prettier)
    serializer = new Promise.Serializer


    each files, (filename) ->
      serializer.then ->
        if fs.existsSync(filename)
          if fs.statSync(filename).isDirectory()
            compileDirectory filename
          else
            compileFile filename
        else throw new Error "sourceFile not found: #{filename}"

    serializer.then ->
      if commander.debug
        log DEBUG:
          loadedModules: Object.keys realRequire('module')._cache
          registeredLoaders: Object.keys realRequire.extensions

      log success: {fileCounts}
    serializer.catch (error) ->
      displayError error
      process.exit 1
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
