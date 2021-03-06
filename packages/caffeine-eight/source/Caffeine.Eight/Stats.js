// Generated by CoffeeScript 1.12.7
(function() {
  var Stats,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  module.exports = Stats = (function(superClass) {
    extend(Stats, superClass);

    function Stats() {
      return Stats.__super__.constructor.apply(this, arguments);
    }

    Stats._stats = {};

    Stats.reset = function() {
      return this._stats = {};
    };

    Stats.add = function(statName, amount) {
      if (amount == null) {
        amount = 1;
      }
      return this._stats[statName] = (this._stats[statName] || 0) + amount;
    };

    Stats.get = function() {
      return this._stats;
    };

    return Stats;

  })(require("art-class-system").BaseClass);

}).call(this);
