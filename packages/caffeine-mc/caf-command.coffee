colors = require "colors"
glob = require "glob"
fsp = require 'fs-promise'
path = require 'path'

# webpack hack
realRequire = eval 'require'

CaffeineMc = require './source/CaffeineMc'
{log, dashCase, escapeRegExp, present, isString,
Promise, formattedInspect, each, escapeRegExp
} = Neptune.Art.StandardLib

# Preload pre-compiled art-foundation for dramatically faster load-times...

{version} = CaffeineMc
commander = require "commander"
.version version
.usage('[options] <input files and directories>')
.option '-o, --output <directory>', "where to write output files"
.option '-c, --compile', 'compile files'
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

{output, compile, prettier, verbose, versions} = commander

displayError = (e) ->
  if verbose
    log.error e
  else if e.message.match /parse|expect/i
    log e.message.replace /<HERE>/, "<HERE>".red if e
  else
    log.error(
      e.stack
      .split  "\n"
      .slice  0, 30
      .join   "\n"
      .replace new RegExp(escapeRegExp(process.cwd() + "/"), "g"), './'
      .replace new RegExp(escapeRegExp(path.dirname(process.cwd()) + "/"), "g"), '../'
    )


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

    filesRead = 0
    filesWritten = 0
    each files, (file) ->
      serializer.then ->
        CaffeineMc.compileFile file, outputDirectory: output, prettier: prettier
        .then ({readCount, writeCount}) ->
          log "compiled: #{file.green}" if verbose
          filesRead += readCount
          filesWritten += writeCount

    serializer.then ->
      if commander.debug
        log DEBUG:
          loadedModules: Object.keys realRequire('module')._cache
          registeredLoaders: Object.keys realRequire.extensions

      log success: {filesRead, filesWritten}
    serializer.catch displayError
  else
    commander.outputHelp()
else if commander.args.length == 1
  [fileToRun] = commander.args
  require './register.coffee'
  file = path.resolve if fileToRun.match /^(\/|\.)/
    fileToRun
  else
    "./#{fileToRun}"

  try
    realRequire file
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
  commander.outputHelp()

