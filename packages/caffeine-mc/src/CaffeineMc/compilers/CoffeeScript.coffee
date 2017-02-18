Foundation = require 'art-foundation'

# _require causes webpack to overlook this - meaning node will handle this require
# TODO: we can tell webpack to do the same thing in its config
_require = eval "require"
CoffeeScript = _require 'coffee-script'
{isString} = Foundation

module.exports = class CoffeeScriptWrapper

  @compile: (sourceCode, options) ->
    CoffeeScript.compile sourceCode, options