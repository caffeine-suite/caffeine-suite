{defineModule, log} = require 'art-standard-lib'
realRequire = eval 'require'
CaffeineMc = require './namespace'

defineModule module, class Register
  # Register compiler with NODEjs for all CaffeineMc.fileExtensions
  # OUT: CaffeineMc
  @register: ->
    if realRequire.extensions
      for ext in CaffeineMc.fileExtensions
        realRequire.extensions[".#{ext}"] ||= (module, filename) ->
          try
            answer = CaffeineMc.compileFileSync filename
            module._compile answer.compiled.js, filename
          catch error
            CaffeineMc.displayError error
            process.exit 1

    CaffeineMc
