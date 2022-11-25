# NOTE: Until we fully convert to CaffeineScript, we need this.
# WHY?
# NodeSubClasses need to inherit from this Node, and CoffeeScript 1.x
# classes can't inherit from JavaScript/CaffeineScript 'real' classes.

{Node} = require("../../Caffeine.Eight").Nodes
{log} = require('art-standard-lib')

module.exports = class IndentBlocksNode extends Node

  toJs: ->
    for match in @matches when match.toJs
      return match.toJs()
    log "no matches have toJs": self: @, class: @class, matches: @matches, parseTreePath: @parseTreePath
    throw new Error "no matches have toJs"
