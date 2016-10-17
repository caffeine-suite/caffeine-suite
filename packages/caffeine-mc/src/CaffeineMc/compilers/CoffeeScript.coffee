Foundation = require 'art-foundation'

# _require causes webpack to overlook this - meaning node will handle this require
_require = eval "require"
CoffeeScript = _require 'coffee-script'
{isString} = Foundation

module.exports = class CoffeeScriptWrapper

  @compile: (sourceCode, options) ->
    out = CoffeeScript.compile sourceCode, options
    if isString out
      compiled: js: out
    else
      compiled: out
