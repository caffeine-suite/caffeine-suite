CaffeineMc    = require './CaffeineMc'
Fs            = require "fs"

{log} = require 'art-foundation'

# Load and run a CoffeeScript file for Node, stripping any `BOM`s.
loadFile = (module, filename) ->
  answer = CaffeineMc.compile Fs.readFileSync filename
  {js} = answer.compiled
  module._compile js, filename

# If the installed version of Node supports `require.extensions`, register
# CoffeeScript as an extension.
if require.extensions
  for ext in CaffeineMc.fileExtensions
    require.extensions[".#{ext}"] = loadFile
