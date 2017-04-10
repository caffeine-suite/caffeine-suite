{log, escapeRegExp, defineModule} = require 'art-standard-lib'
path = require 'path'
vm = require 'vm'

defineModule module, class Tools

  @runInContext: (js, context, filename) ->
    if context == global
      vm.runInThisContext js, filename
    else
      vm.runInContext js, context, filename

  @evalInContext: (js, context) ->
    (-> eval js).call context

  @displayError: (e, options = {}) ->
    return unless e
    {verbose} = options
    if verbose
      log.error e
    else if e.location? || e.sourceFile? || e.message.match /parse|expect/i
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
