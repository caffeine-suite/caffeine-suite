CaffeineMc = require './index'
loaderUtils = require 'loader-utils'
{log} = require 'art-standard-lib'

# TODO: - source maps

module.exports = (source) ->
  @cacheable?()

  sourceFile = loaderUtils.getRemainingRequest @
  fullRequest = loaderUtils.getCurrentRequest @
  query = loaderUtils.parseQuery @query
  try
    result = CaffeineMc.FileCompiler.compileFileSync sourceFile, {source, @debug}

  catch e
    log.error "CaffeineMc error": e
    throw e

  sourceMap = null

  @callback null, result.compiled.js, sourceMap

module.exports.seperable = true
