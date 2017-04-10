CaffeineMc = require './index'
loaderUtils = require 'loader-utils'
{log} = require 'art-standard-lib'

# TODO: - source maps

module.exports = (source) ->
  @cacheable?()

  sourceFile = loaderUtils.getRemainingRequest @
  try
    result = CaffeineMc.FileCompiler.compileFileSync sourceFile, {source, @debug, prettier: true}

  catch e
    log.error "CaffeineMc error": e
    throw e

  sourceMap = null

  @callback null, result.compiled.js, sourceMap

module.exports.seperable = true
