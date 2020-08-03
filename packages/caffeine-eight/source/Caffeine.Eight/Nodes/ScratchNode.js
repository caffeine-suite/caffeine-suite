// Generated by CoffeeScript 1.12.7
(function() {
  var BaseClass, ScratchNode, defineModule, log, merge, ref, toInspectedObjects,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = require('art-standard-lib'), log = ref.log, defineModule = ref.defineModule, toInspectedObjects = ref.toInspectedObjects, merge = ref.merge;

  BaseClass = require("art-class-system").BaseClass;

  defineModule(module, ScratchNode = (function(superClass) {
    extend(ScratchNode, superClass);

    ScratchNode.resetAll = function() {
      this._scatchNodes = [];
      return this._scatchNodesInUse = 0;
    };

    ScratchNode.resetAll();

    ScratchNode.checkout = function(parentNode, ruleVariant) {
      if (this._scatchNodesInUse >= this._scatchNodes.length) {
        return this._scatchNodes[this._scatchNodesInUse++] = new ScratchNode(parentNode, ruleVariant);
      } else {
        return this._scatchNodes[this._scatchNodesInUse++].reset(parentNode, ruleVariant);
      }
    };

    ScratchNode.checkin = function(scratchNode) {
      if (scratchNode !== this._scatchNodes[--this._scatchNodesInUse]) {
        throw new Error("WTF");
      }
    };

    function ScratchNode(parent, ruleVariant) {
      this.matches = [];
      this.matchPatterns = [];
      this.reset(parent, ruleVariant);
    }

    ScratchNode.prototype.reset = function(parent1, ruleVariant1) {
      this.parent = parent1;
      this.ruleVariant = ruleVariant1;
      this._parser = this.parent._parser;
      this.offset = this.parent.getNextOffset() | 0;
      this.matchesLength = this.matchPatternsLength = this.matchLength = 0;
      this.variantNode = null;
      return this;
    };

    ScratchNode.getter("parser", {
      source: function() {
        return this._parser.source;
      },
      nextOffset: function() {
        return this.offset + this.matchLength;
      },
      inspectedObjects: function() {
        return {
          offset: this.offset,
          matchLength: this.matchLength,
          matches: toInspectedObjects(this.matches),
          matchPatterns: toInspectedObjects(this.matchPatterns)
        };
      }
    });

    ScratchNode.prototype.getNextText = function(length) {
      var nextOffset;
      nextOffset = this.getNextOffset();
      return this.source.slice(nextOffset, nextOffset + length);
    };

    ScratchNode.getter({
      firstPartialMatchParent: function() {
        return this.realNode.firstPartialMatchParent;
      },
      realNode: function() {
        return this.variantNode || (this.variantNode = new this.ruleVariant.VariantNodeClass(this.parent.realNode || this._parser, {
          ruleVariant: this.ruleVariant,
          matchLength: this.matchLength,
          matches: this.matchesLength > 0 && this.matches.slice(0, this.matchesLength),
          matchPatterns: this.matchPatternsLength > 0 && this.matchPatterns.slice(0, this.matchPatternsLength)
        }));
      }
    });

    ScratchNode.prototype.checkin = function() {
      return ScratchNode.checkin(this);
    };

    ScratchNode.prototype.subparse = function(subSource, options) {
      return this._parser.subparse(subSource, merge(options, {
        parentNode: this
      }));
    };

    ScratchNode.prototype.addMatch = function(pattern, match) {
      var ref1;
      if (!match) {
        return false;
      }
      if ((ref1 = this.variantNode) != null) {
        ref1.addMatch(pattern, match);
      }
      this.matches[this.matchesLength++] = match;
      this.matchPatterns[this.matchPatternsLength++] = pattern;
      this.matchLength = match.nextOffset - this.offset;
      return true;
    };

    ScratchNode.prototype._addToParentAsNonMatch = function() {
      return this.realNode._addToParentAsNonMatch();
    };

    return ScratchNode;

  })(BaseClass));

}).call(this);
