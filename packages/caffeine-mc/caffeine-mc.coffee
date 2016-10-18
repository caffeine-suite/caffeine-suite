colors = require "colors"
glob = require "glob"
fsp = require 'fs-promise'
path = require 'path'

# Preload pre-compiled art-foundation for dramatically faster load-times...
require 'art-foundation'

{version} = require './package.json'
commander = require "commander"
.version version
.usage('[options] <input files and directories>')
.option '-o, --output <directory>', "where to write output files"
.on "--help", ->
  console.log """
    An output directory is required if more than one input file is specified.
    """
.parse process.argv

{output} = commander
if !output and commander.args.length == 1
  [filename] = commander.args
  unless fsp.statSync(filename).isDirectory()
    output = path.dirname filename

if commander.args.length > 0 && output
  {log, Promise} = require 'art-foundation'
  log input: commander.args, output: output
  CaffeineMc = require 'caffeine-mc'
  log "caffeine-mc loaded"
  serializer = new Promise.Serializer

  readCount = 0
  writeCount = 0
  for file in commander.args
    do (file) ->
      serializer.then ->
        fsp.exists file
        .then (exists) ->
          if exists
            fsp.readFile file
          else
            throw new Error "file not found: #{file}"
        .then (contents) ->
          contents = contents.toString()
          # log compiling: contents.green
          out = CaffeineMc.compile contents
          readCount++
          promises = for extension, text of out.compiled
            basename = path.basename file, path.extname file
            log write: outputFilename = path.join output, "#{basename}.#{extension}"
            writeCount++
            fsp.writeFile outputFilename, text
          Promise.all promises
        .catch (e) ->
          log.error "error compiling: #{file}"
          throw e

  serializer.then ->
    log success:
      filesRead: readCount
      filesWritten: writeCount
  serializer.catch (e) ->
    log "#{"error".red}: #{e.stack}"
else
  commander.outputHelp()
