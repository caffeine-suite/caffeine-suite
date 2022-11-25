# NOTE: Until we fully convert to CaffeineScript, we need this.
# WHY?
# NodeSubClasses need to inherit from this Node, and CoffeeScript 1.x
# classes can't inherit from JavaScript/CaffeineScript 'real' classes.
{Node} = require("../../Caffeine.Eight").Nodes
module.exports =
  NodeBaseClassTestNode: class IndentBlocksNode extends Node
    toJs: -> @toString() + "!"
  RuleGroupNodeBaseClassNode: class MyNode extends Node
      compile: -> (a.compile() for a in @matches when a.compile).join ''