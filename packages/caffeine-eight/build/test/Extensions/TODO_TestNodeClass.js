// Generated by CoffeeScript 1.12.7
(function() {
  var IndentBlocksNode, Node, log,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Node = require("../../Caffeine.Eight").Nodes.Node;

  log = require('art-standard-lib').log;

  module.exports = IndentBlocksNode = (function(superClass) {
    extend(IndentBlocksNode, superClass);

    function IndentBlocksNode() {
      return IndentBlocksNode.__super__.constructor.apply(this, arguments);
    }

    IndentBlocksNode.prototype.toJs = function() {
      var i, len, match, ref;
      ref = this.matches;
      for (i = 0, len = ref.length; i < len; i++) {
        match = ref[i];
        if (match.toJs) {
          return match.toJs();
        }
      }
      log({
        "no matches have toJs": {
          self: this,
          "class": this["class"],
          matches: this.matches,
          parseTreePath: this.parseTreePath
        }
      });
      throw new Error("no matches have toJs");
    };

    return IndentBlocksNode;

  })(Node);

}).call(this);

//# sourceMappingURL=TODO_TestNodeClass.js.map
