# webpack hack
realRequire = eval 'require'

CaffeineMc    = realRequire './'
Fs            = realRequire "fs"

{log} = require 'art-standard-lib'

# Load and run a CoffeeScript file for Node, stripping any `BOM`s.
loadFile = (module, filename) ->
  answer = CaffeineMc.compileFileSync filename
  {js} = answer.compiled
  module._compile js, filename

# If the installed version of Node supports `realRequire.extensions`, register
# CoffeeScript as an extension.
if realRequire.extensions
  for ext in CaffeineMc.fileExtensions
    realRequire.extensions[".#{ext}"] = loadFile

module.exports = CaffeineMc