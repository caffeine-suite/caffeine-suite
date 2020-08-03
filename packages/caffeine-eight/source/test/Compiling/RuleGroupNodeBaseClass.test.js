// Generated by CoffeeScript 1.12.7
(function() {
  var MyParser, Node, Parser, a, assert, log, lowerCamelCase, m, ref, ref1, ref2, upperCamelCase, w,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = require("art-standard-lib"), log = ref.log, a = ref.a, w = ref.w, m = ref.m, upperCamelCase = ref.upperCamelCase, lowerCamelCase = ref.lowerCamelCase;

  ref1 = require("../../"), Parser = ref1.Parser, (ref2 = ref1.Nodes, Node = ref2.Node);

  assert = require("art-testbench").assert;

  MyParser = null;

  beforeEach(function() {
    return MyParser = (function(superClass) {
      var MyNode;

      extend(MyParser, superClass);

      function MyParser() {
        return MyParser.__super__.constructor.apply(this, arguments);
      }

      MyParser.nodeBaseClass = MyNode = (function(superClass1) {
        extend(MyNode, superClass1);

        function MyNode() {
          return MyNode.__super__.constructor.apply(this, arguments);
        }

        MyNode.prototype.compile = function() {
          return ((function() {
            var i, len, ref3, results;
            ref3 = this.matches;
            results = [];
            for (i = 0, len = ref3.length; i < len; i++) {
              a = ref3[i];
              if (a.compile) {
                results.push(a.compile());
              }
            }
            return results;
          }).call(this)).join('');
        };

        return MyNode;

      })(Node);

      MyParser.rule({
        root: "noun _ verb _ noun",
        _: {
          pattern: / +/,
          compile: function() {
            return " ";
          }
        },
        noun: w("bugs butterflies")
      });

      MyParser.rule({
        bugs: /bugs|ladybugs|beetles/i,
        butterflies: /butterflies|skippers|swallowtails/i
      }, {
        compile: function() {
          return upperCamelCase(this.toString());
        }
      });

      MyParser.rule({
        verb: {
          pattern: /eat|shun/i,
          compile: function() {
            return lowerCamelCase(this.toString());
          }
        }
      });

      return MyParser;

    })(Parser);
  });

  test("one rule multiple patters shares a nodeBaseClass", function() {
    var mainNode;
    mainNode = MyParser.parse("ladybugs eat beetles");
    return assert.eq(mainNode.compile(), "Ladybugs eat Beetles");
  });

  test("case insensitive", function() {
    var mainNode;
    mainNode = MyParser.parse("ladybugs EAT beetles");
    return assert.eq(mainNode.compile(), "Ladybugs eat Beetles");
  });

}).call(this);
