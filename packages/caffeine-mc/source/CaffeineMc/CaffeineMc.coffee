realRequire = eval 'require'
CaffeineMc = require './namespace'

module.exports = [
  require './Metacompiler'
  require './FileCompiler'
  require './ModuleResolver'
  require './Tools'

  # Register compiler with NODEjs for all CaffeineMc.fileExtensions
  # OUT: CaffeineMc
  register: ->
    if realRequire.extensions
      for ext in CaffeineMc.fileExtensions
        realRequire.extensions[".#{ext}"] = (module, filename) ->
          answer = CaffeineMc.compileFileSync filename
          module._compile answer.compiled.js, filename
    CaffeineMc
]