// Generated by CoffeeScript 1.12.7
(function() {
  var EmptyNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  module.exports = EmptyNode = (function(superClass) {
    extend(EmptyNode, superClass);

    function EmptyNode() {
      return EmptyNode.__super__.constructor.apply(this, arguments);
    }

    EmptyNode.getter({
      present: function() {
        return false;
      }
    });

    return EmptyNode;

  })(require('./Node'));

}).call(this);
