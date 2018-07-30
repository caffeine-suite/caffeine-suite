CaffeineMc = require './index'
loaderUtils = require 'loader-utils'
{log, getEnv} = require 'art-standard-lib'

###
TODO: Fix SOURCEMAPS (SBD 2018-07-30 notes)
'cafSourceMaps' is a temporary hack for testing.

This current code actually works with webpack4/webpack-dev-server3 && Safari,
but it DOESNT work in Chrome. Chrome seems to actually get the sourcemap correctly,
but it won't show the original source.
SO - cafSourceMaps is off by default, but you can turn it on if you want:

  > cafSourceMaps=true webpack-dev-server

###
{cafSourceMaps} = getEnv

module.exports = (source) ->
  @cacheable? false # CaffeineMc manages its own cachability.

  sourceFile = loaderUtils.getRemainingRequest @
  try
    {compiled:{js, sourceMap}} = CaffeineMc.FileCompiler.compileFileSync sourceFile, {
      source
      @debug
      sourceRoot: ""                # make sourceMaps references relative to webpack's start directory
      cache:      true              # CaffeineMc's external-reference-smart caching
      inlineMap:  !!cafSourceMaps   # experimental - works in Safari, not Chrome
      prettier:   !cafSourceMaps    # prettier is incompatible with sourceMaps
    }
    @callback null, js, sourceMap

  catch e
    log.error "CaffeineMc webpack-loader error": e
    throw e

module.exports.separable = true