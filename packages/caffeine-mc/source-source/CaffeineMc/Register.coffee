{defineModule, log} = require 'art-standard-lib'
realRequire = eval 'require'
CaffeineMc = require './namespace'

defineModule module, class Register
  # Register compiler with NODEjs for all CaffeineMc.fileExtensions
  # OUT: CaffeineMc
  @verbose: false
  @register: ->
    throw new Error "please update NODE.js" unless realRequire.extensions # old NODE
    for ext in CaffeineMc.fileExtensions
      realRequire.extensions[".#{ext}"] ||= (module, filename) ->
        try
          if Register.verbose
            log loading: filename

          answer = CaffeineMc.compileFileSync filename, inlineMap: true, sourceRoot: "", cache: true
        catch error
          CaffeineMc.displayError error
          # process.exit 1
          module._compile "throw new Error('CaffeineMc: error compiling #{filename}');", filename if Register.verbose

        if answer?
          try
            module._compile answer.compiled.js, filename
          catch error
            CaffeineMc.displayError error
            # process.exit 1
            if Register.verbose
              log "caffeine-mc-compile": {filename,  answer}
              module._compile "\nthrow new Error('CaffeineMc: error evaluating: #{filename}');\n", filename

    CaffeineMc
