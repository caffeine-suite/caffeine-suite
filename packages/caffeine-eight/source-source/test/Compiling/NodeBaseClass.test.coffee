{log, wordsArray} = require "art-standard-lib"
{Parser, Nodes:{Node}} = require "../../"
{assert} = require "art-testbench"

test "with class", ->
  class MyParser extends Parser
    @nodeBaseClass: class IndentBlocksNode extends Node
      toJs: -> @toString() + "!"

    @rule
      root: /boo/

  mainNode = MyParser.parse "boo"
  assert.eq mainNode.toJs(), "boo!"

test "with plainObject", ->
  class MyParser extends Parser
    @nodeBaseClass:
      toJs: -> @toString() + "!"

    @rule
      root: /boo/

  mainNode = MyParser.parse "boo"
  assert.eq mainNode.toJs(), "boo!"
