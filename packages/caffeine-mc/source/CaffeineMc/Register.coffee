{defineModule, log} = require 'art-standard-lib'
realRequire = eval 'require'
CaffeineMc = require './namespace'

defineModule module, class Register
  # Register compiler with NODEjs for all CaffeineMc.fileExtensions
  # OUT: CaffeineMc
  @register: ->
    throw new Error "please update NODE.js" unless realRequire.extensions # old NODE
    for ext in CaffeineMc.fileExtensions
      realRequire.extensions[".#{ext}"] ||= (module, filename) ->
        try
          answer = CaffeineMc.compileFileSync filename, inlineMap: true
          module._compile answer.compiled.js, filename
        catch error
          CaffeineMc.displayError error
          process.exit 1

    CaffeineMc
