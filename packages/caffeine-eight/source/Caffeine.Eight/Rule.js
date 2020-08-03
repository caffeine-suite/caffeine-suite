// Generated by CoffeeScript 1.12.7
(function() {
  var Rule, RuleVariant, Stats, compactFlattenAll, log, merge, objectName, ref, toInspectedObjects, upperCamelCase,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  RuleVariant = require('./RuleVariant');

  Stats = require('./Stats');

  ref = require('art-standard-lib'), toInspectedObjects = ref.toInspectedObjects, merge = ref.merge, upperCamelCase = ref.upperCamelCase, objectName = ref.objectName, log = ref.log, compactFlattenAll = ref.compactFlattenAll;

  module.exports = Rule = (function(superClass) {
    extend(Rule, superClass);

    function Rule(_name, _definedInClass, _variants) {
      this._name = _name;
      this._definedInClass = _definedInClass;
      this._variants = _variants != null ? _variants : [];
    }

    Rule.getter("nodeClassName name variantNodeClasses definedInClass", {
      numVariants: function() {
        return this._variants.length;
      }
    });

    Rule.prototype.addVariant = function(options, addPriorityVariant) {
      var v;
      v = new RuleVariant(merge(options, {
        variantNumber: this._variants.length + 1,
        rule: this,
        parserClass: this._definedInClass
      }));
      if (addPriorityVariant) {
        this._variants = compactFlattenAll(v, this._variants);
      } else {
        this._variants.push(v);
      }
      return v;
    };

    Rule.getter({
      inspectedObjects: function() {
        return toInspectedObjects(this._variants);
      }
    });

    Rule.prototype.clone = function() {
      return new Rule(this._name, this._definedInClass, this._variants.slice());
    };


    /*
    IN:
      parentNode: node instance
        This provides critical info:
          parentNode.source:      the source string
          parentNode.nextOffset:  the index in the source where parsing starts
          parentNode.parser:      access to the parser object
    
    EFFECT: If returning a new Node, it is expected that node's parent is already set to parentNode
    OUT: Node instance if parsing was successful
     */

    Rule.prototype.parse = function(parentNode) {
      var cached, i, len, match, nextOffset, parser, ref1, v;
      Stats.add("parseRule");
      parser = parentNode.parser, nextOffset = parentNode.nextOffset;
      if (cached = parser._cached(this.name, nextOffset)) {
        if (cached === "no_match") {
          Stats.add("cacheHitNoMatch");
          return null;
        } else {
          Stats.add("cacheHit");
          return cached;
        }
      }
      ref1 = this._variants;
      for (i = 0, len = ref1.length; i < len; i++) {
        v = ref1[i];
        if (match = v.parse(parentNode)) {
          return parser._cacheMatch(this.name, match);
        }
      }
      return parser._cacheNoMatch(this.name, nextOffset);
    };

    return Rule;

  })(require("art-class-system").BaseClass);

}).call(this);
