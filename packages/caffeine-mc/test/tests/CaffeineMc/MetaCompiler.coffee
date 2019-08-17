CaffeineMc = require 'caffeine-mc'
{log} = require "art-standard-lib"

module.exports = suite:
  default: ->
    test "default to compiling with CoffeeScript", ->

      assert.match CaffeineMc.compile("1+2").compiled.js, "Caf.defMod"

  coffeeScript: ->
    test "|CoffeeScript", ->
      assert.eq CaffeineMc.compile("""
        |CoffeeScript
        1+2
      """), compiled: {js: "(function() {\n  1 + 2;\n\n}).call(this);\n"}

    test "|coffee-script", ->
      out = CaffeineMc.compile """
        |coffee-script
        global._temp = -> 123
        """
      eval out.compiled.js
      assert.eq 123, global._temp()

  caffeineScript: ->
    test ":wordString", ->
      assert.eq
        compiled: js: """
          "use strict"
          let Caf = require('caffeine-script-runtime');
          Caf.defMod(module, () => {return "wordString";});
          """
        CaffeineMc.compile ":wordString"

  testCompiler: ->
    test "|CaffeineMc/Test/TestCompiler", ->
      assert.eq CaffeineMc.compile("""
        |CaffeineMc/Test/TestCompiler
        alpha+beta
      """), compiled: js: "AlphaBeta"

    test "|Test/TestCompiler", ->
      assert.eq CaffeineMc.compile(
        """
        |Test/TestCompiler
        alpha+beta
        """
        sourceDir: __dirname
      ), compiled: js: "AlphaBeta"


    test "|TestCompiler", ->
      assert.eq CaffeineMc.compile(
        """
        |TestCompiler
        alpha+beta
        """
        sourceDir: __dirname
      ), compiled: js: "AlphaBeta"

  basic: ->
    test "single-line metaCompiler block", ->
      out = CaffeineMc.compile """
        |JavaScript
        1+2
        """
      assert.eq out, compiled: {js: "1+2"}

    test "two single-line metaCompiler blocks", ->
      self.__metaCompilerTest = 123
      out = CaffeineMc.compile """
        | self.__metaCompilerTest = 999
        | @compiler = :JavaScript
        1+2
        """
      assert.eq out, compiled:  js: "1+2"
      assert.eq self.__metaCompilerTest, 999

    test "multi-line metaCompiler block A", ->
      self.__metaCompilerTest = 123
      out = CaffeineMc.compile """
        |
          self.__metaCompilerTest = 456
          @compiler = :JavaScript
        1+2
        """
      assert.eq out, compiled:  js: "1+2"
      assert.eq self.__metaCompilerTest, 456

    test "multi-line metaCompiler block B", ->
      self.__metaCompilerTest = 123
      out = CaffeineMc.compile """
        |
          self.__metaCompilerTest = 456
          @compiler = :JavaScript
        1+2
        """
      assert.eq out, compiled:  js: "1+2"
      assert.eq self.__metaCompilerTest, 456

    test "custom compiler", ->
      out = CaffeineMc.compile """
        | @compiler = compile: (source) => compiled: js: "" source: \#{source}
        1+2
        """
      assert.eq out, compiled: js: "source: 1+2"

  options: ->
    test "prettier: true", ->
      ooo = CaffeineMc.compile ":wordString", prettier: true

      assert.eq
        compiled:
          js:
            """
              "use strict";
              let Caf = require("caffeine-script-runtime");
              Caf.defMod(module, () => {
                return "wordString";
              });\n
            """

        prettier: true

        ooo

    # test "transpile: true", ->
    #   assert.eq
    #     compiled:
    #       js:
    #         """
    #           "use strict";

    #           function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    #           function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    #           function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    #           var Caf = require('caffeine-script-runtime');
    #           Caf.defMod(module, function () {
    #             var Foo = void 0;return Foo = Caf.defClass(function (_Object) {
    #               _inherits(Foo, _Object);

    #               function Foo() {
    #                 _classCallCheck(this, Foo);

    #                 return _possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).apply(this, arguments));
    #               }

    #               return Foo;
    #             }(Object));
    #           });
    #         """

    #     transpiled: true
    #     CaffeineMc.compile "class Foo", transpile: true
