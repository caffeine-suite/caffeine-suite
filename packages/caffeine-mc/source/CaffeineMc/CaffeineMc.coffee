{log, escapeRegExp} = require 'art-standard-lib'
path = require 'path'

module.exports = [
  require './Metacompiler'
  require './FileCompiler'
  require './ModuleResolver'

  package: _package = require "caffeine-mc/package.json"
  version: _package.version
  displayError: (e, options = {}) ->
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

  evalInContext: (js, context) ->
    # Return the results of the in-line anonymous function we .call with the passed context
    (-> eval js).call context


]