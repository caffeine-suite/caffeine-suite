// Generated by CoffeeScript 1.12.7
(function() {
  var EmptyOptionalNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  module.exports = EmptyOptionalNode = (function(superClass) {
    extend(EmptyOptionalNode, superClass);

    function EmptyOptionalNode() {
      return EmptyOptionalNode.__super__.constructor.apply(this, arguments);
    }

    EmptyOptionalNode.getter({
      present: function() {
        return false;
      }
    });

    return EmptyOptionalNode;

  })(require('./EmptyNode'));

}).call(this);
