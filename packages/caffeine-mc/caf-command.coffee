# enable multi-context type-support (slower, but other wise the same)
global.ArtStandardLibMultipleContextTypeSupport = true

colors = require "colors"
glob = require "glob"
fsp = require 'fs-promise'
path = require 'path'

require 'coffee-script/register'

# webpack hack
realRequire = eval 'require'

{version, displayError, CafRepl} = CaffeineMc = require './source/CaffeineMc'
{log, dashCase, escapeRegExp, present, isString,
Promise, formattedInspect, each, escapeRegExp
} = Neptune.Art.StandardLib

# Preload pre-compiled art-foundation for dramatically faster load-times...

commander = require "commander"
.version version
.usage('[options] <input files and directories>')
.option '-o, --output <directory>', "where to write output files"
.option '-c, --compile', 'compile files'
.option '-C, --cache', 'cache compiled files'
.option '-p, --prettier', 'apply "prettier" to any js output'
.option '-d, --debug', 'show debug info'
.option '-v, --verbose', 'show more output'
.option '--versions [compiler-npm-name]', "show caffeine-mc's version OR the specified caffeine-mc-compatible compiler's version"
.on "--help", ->
  console.log """
    An output directory is required if more than one input file is specified.

    Default action, if a file is provided, is to execute it.
    """
.parse process.argv

displayError = (e) ->
  CaffeineMc.displayError e, commander

{output, compile, prettier, verbose, versions, cache} = commander

if compile
  files = commander.args

  if !output and files.length == 1
    [filename] = files
    unless fsp.statSync(filename).isDirectory()
      output = path.dirname filename

  if files.length > 0 && output
    verbose && log compile:
      inputs: if files.length == 1 then files[0] else files
      output: output
    log "caffeine-mc loaded" if verbose
    log "using prettier" if verbose && prettier
    serializer = new Promise.Serializer

    fileCounts =
      read: 0
      written: 0
      compiled: 0
      fromCache: 0

    each files, (file) ->
      serializer.then ->
        CaffeineMc.compileFile file, {outputDirectory: output, prettier, cache}
        .then ({readCount, writeCount, output}) ->

          if output.fromCache
            fileCounts.fromCache += readCount
          else
            fileCounts.compiled += readCount

          if verbose
            if output.fromCache
              log "cached: #{file.grey}"
            else
              log "compiled: #{file.green}"

          fileCounts.read += readCount
          fileCounts.written += writeCount

    serializer.then ->
      if commander.debug
        log DEBUG:
          loadedModules: Object.keys realRequire('module')._cache
          registeredLoaders: Object.keys realRequire.extensions

      log success: {fileCounts}
    serializer.catch displayError
  else
    commander.outputHelp()
else if commander.args.length == 1
  [fileToRun] = commander.args
  require './register.coffee'
  console.log "REGISTER CAF"
  file = path.resolve if fileToRun.match /^(\/|\.)/
    fileToRun
  else
    "./#{fileToRun}"

  try
    CaffeineMc.compileFile file, {color: true, cache}
    .then ({output}) ->
      {js} = output.compiled
      eval js
    .catch (e) -> displayError e
  catch e
    displayError e
else if versions
  if isString versions
    compiler = realRequire dashCase versions
    log
      "#{versions}": compiler.version || compiler.VERSION
  log
    Neptune: Neptune.getVersions()
else
  CafRepl.start()
  # commander.outputHelp()

