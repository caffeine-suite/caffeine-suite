CaffeineMc = require './index'
loaderUtils = require 'loader-utils'

###
TODO:

- source maps
- doesn't load caffeine-mc.config.caf
###

module.exports = (source) ->
  @cacheable?()

  coffeeRequest = loaderUtils.getRemainingRequest this
  jsRequest = loaderUtils.getCurrentRequest @
  query = loaderUtils.parseQuery @query
  try
    result = CaffeineMc.compile source,
      literate: query.literate
      sourceFile: coffeeRequest
      debug: @debug
  catch e
    log.error "CaffeineMc error": e
    throw e

  sourceMap = null

  @callback null, result.compiled.js, sourceMap

module.exports.seperable = true
