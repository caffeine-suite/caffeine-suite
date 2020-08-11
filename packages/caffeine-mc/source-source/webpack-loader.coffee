CaffeineMc = require './index'
CaffeineEight = require 'caffeine-eight'
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
  @cacheable?()
  # CaffeineMc manages its own cachability, but I'm unclear what disabling webpack's caching
  # does... Does it cache across runs? What triggers a re-load if cacheable is false?
  # Not sure if I set this to false it'll solve smart-require module resolving changes anyway...
  # Webpack dependencies seem to be on file-contents, which implies file locations, but
  # we don't actually care about contents, just the existance of files...
  # But, @addDependency may be the true solution: https://webpack.js.org/api/loaders/#this-adddependency
  # Even with addDependency, it wouldn't catch a file being added which alters module-resolution.

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
    if e instanceof CaffeineEight.CaffeineEightCompileError
      out = new Error e.toString()
      out.stack = ""
      throw out
    else
      log.error "CaffeineMc webpack-loader error": e
    throw e

module.exports.separable = true