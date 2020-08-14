"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["describe", "test", "assert", "CaffeineMc", "self"],
    [global, require("./StandardImport")],
    (describe, test, assert, CaffeineMc, self) => {
      return describe({
        default: function () {
          return test("default to compiling with CoffeeScript", () =>
            assert.match(CaffeineMc.compile("1+2").compiled.js, "Caf.defMod"));
        },
        coffeeScript: function () {
          test("|CoffeeScript", () =>
            assert.eq(CaffeineMc.compile("|CoffeeScript\n1+2"), {
              compiled: { js: "(function() {\n  1 + 2;\n\n}).call(this);\n" },
            }));
          return test("|coffee-script", () => {
            let out;
            out = CaffeineMc.compile("|coffee-script\nglobal._temp = -> 123");
            eval(out.compiled.js);
            return assert.eq(123, global._temp());
          });
        },
        caffeineScript: function () {
          return test(":wordString", () =>
            assert.eq(
              {
                compiled: {
                  js:
                    '"use strict"\nlet Caf = require(\'caffeine-script-runtime\');\nCaf.defMod(module, () => {return "wordString";});',
                },
              },
              CaffeineMc.compile(":wordString")
            ));
        },
        testCompiler: function () {
          test("|CaffeineMc/SourceSource/Test/TestCompiler", () =>
            assert.eq(
              CaffeineMc.compile(
                "|CaffeineMc/SourceSource/Test/TestCompiler\nalpha+beta"
              ),
              { compiled: { js: "AlphaBeta" } }
            ));
          test("|Test/TestCompiler", () =>
            assert.eq(
              CaffeineMc.compile("|Test/TestCompiler\nalpha+beta", {
                sourceDir: __dirname,
              }),
              { compiled: { js: "AlphaBeta" } }
            ));
          return test("|TestCompiler", () =>
            assert.eq(
              CaffeineMc.compile("|TestCompiler\nalpha+beta", {
                sourceDir: __dirname,
              }),
              { compiled: { js: "AlphaBeta" } }
            ));
        },
        basic: function () {
          test("single-line metaCompiler block", () => {
            let out;
            out = CaffeineMc.compile("|JavaScript\n1+2");
            return assert.eq(out, { compiled: { js: "1+2" } });
          });
          test("two single-line metaCompiler blocks", () => {
            let out;
            self.__metaCompilerTest = 123;
            out = CaffeineMc.compile(
              "| self.__metaCompilerTest = 999\n| @compiler = :JavaScript\n1+2"
            );
            assert.eq(out, { compiled: { js: "1+2" } });
            return assert.eq(self.__metaCompilerTest, 999);
          });
          test("multi-line metaCompiler block A", () => {
            let out;
            self.__metaCompilerTest = 123;
            out = CaffeineMc.compile(
              "|\n  self.__metaCompilerTest = 456\n  @compiler = :JavaScript\n1+2"
            );
            assert.eq(out, { compiled: { js: "1+2" } });
            return assert.eq(self.__metaCompilerTest, 456);
          });
          test("multi-line metaCompiler block B", () => {
            let out;
            self.__metaCompilerTest = 123;
            out = CaffeineMc.compile(
              "|\n  self.__metaCompilerTest = 456\n  @compiler = :JavaScript\n1+2"
            );
            assert.eq(out, { compiled: { js: "1+2" } });
            return assert.eq(self.__metaCompilerTest, 456);
          });
          return test("custom compiler", () => {
            let out;
            out = CaffeineMc.compile(
              '| @compiler = compile: (source) => compiled: js: "" source: #{source}\n1+2'
            );
            return assert.eq(out, { compiled: { js: "source: 1+2" } });
          });
        },
        options: function () {
          return test("prettier: true", () => {
            let ooo;
            ooo = CaffeineMc.compile(":wordString", { prettier: true });
            return assert.eq(
              {
                compiled: {
                  js:
                    '"use strict";\nlet Caf = require("caffeine-script-runtime");\nCaf.defMod(module, () => {\n  return "wordString";\n});\n',
                },
                prettier: true,
              },
              ooo
            );
          });
        },
      });
    }
  );
});
