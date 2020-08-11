{log, escapeRegExp, defineModule} = require 'art-standard-lib'
path = require 'path'
vm = require 'vm'

defineModule module, class Tools
  @fileExtensions: ["caf", "caffeine"]
  @fileIsCaffeine: (filename) -> /\.(caf|caffeine)$/.test filename

  @runInContext: (js, context, filename) ->
    if context == global
      vm.runInThisContext js, filename
    else
      vm.runInContext js, context, filename

  @evalInContext: (js, context) ->
    try
      (-> eval js).call context
    catch e
      console.error "<---> evalInContext: error: js:"
      console.error js
      console.error "<--->"
      throw e

  @displayError: (e, options = {}) ->
    require 'colors'
    return unless e
    {verbose} = options
    if verbose
      log.error e
    else if e.location? || e.sourceFile? # || e.message.match /parse|expect/i
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
