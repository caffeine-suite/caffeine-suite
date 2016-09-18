colors = require "colors"
glob = require "glob"
fsp = require "fs-promise"
fs = require 'fs'
NomNom = require "nomnom"
Foundation = require 'art-foundation'
CaffeineMc = require 'caffeine-mc'

{version} = require './package.json'
{log, Promise} = Foundation

opts = NomNom
.option 'compile',
  abbr: 'c'
  flag: true
  help: 'compile and write all output files'
.help """
  caffeine-mc version: #{version}
  """
.nocolors()
.parse()

if opts.compile
  serializer = new Promise.Serializer
  for file in opts._
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
          log compiling: contents.green
          out = CaffeineMc.compile contents
          log output: out
  serializer.catch (e) ->
    log "#{"error".red}: #{e.toString()}"
else
  log "See --help for options."
