"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "Parser", "assert"],
    [
      global,
      require("art-standard-lib"),
      require("../../Caffeine.Eight"),
      require("art-testbench"),
    ],
    (test, Parser, assert) => {
      test("one node with custom node class", function () {
        let MyParser, mainNode;
        MyParser = Caf.defClass(
          class MyParser extends Parser {},
          function (MyParser, classSuper, instanceSuper) {
            this.rule({
              root: {
                pattern: /boo/,
                myMember: function () {
                  return 123;
                },
              },
            });
          }
        );
        mainNode = MyParser.parse("boo");
        return assert.eq(mainNode.myMember(), 123);
      });
      test("multi-pattern type 1", function () {
        let MyParser, mainNode;
        MyParser = Caf.defClass(
          class MyParser extends Parser {},
          function (MyParser, classSuper, instanceSuper) {
            this.rule({
              root: [
                /boo/,
                /bad/,
                {
                  myMember: function () {
                    return 123;
                  },
                },
              ],
            });
          }
        );
        mainNode = MyParser.parse("boo");
        assert.eq(mainNode.myMember(), 123);
        mainNode = MyParser.parse("bad");
        return assert.eq(mainNode.myMember(), 123);
      });
      test("multi-pattern type 2", function () {
        let MyParser, mainNode;
        MyParser = Caf.defClass(
          class MyParser extends Parser {},
          function (MyParser, classSuper, instanceSuper) {
            this.rule({
              root: [
                /boo/,
                /bad/,
                {
                  myMember: function () {
                    return 123;
                  },
                },
              ],
            });
          }
        );
        mainNode = MyParser.parse("boo");
        assert.eq(mainNode.myMember(), 123);
        mainNode = MyParser.parse("bad");
        return assert.eq(mainNode.myMember(), 123);
      });
      return test("simple math", function () {
        let MyParser, mainNode;
        MyParser = Caf.defClass(
          class MyParser extends Parser {},
          function (MyParser, classSuper, instanceSuper) {
            this.rule({
              root: {
                pattern: "expression",
                compute: function () {
                  return this.expression.compute();
                },
              },
            });
            this.rule({
              expression: {
                pattern: "n:number '+' expression",
                compute: function () {
                  return this.n.compute() + this.expression.compute();
                },
              },
            });
            this.rule({
              expression: {
                pattern: "number",
                compute: function () {
                  return this.number.compute();
                },
              },
            });
            this.rule({
              number: {
                pattern: /[0-9]+/,
                compute: function () {
                  return this.text | 0;
                },
              },
            });
          }
        );
        mainNode = MyParser.parse("123+321+111");
        return assert.eq(mainNode.compute(), 555);
      });
    }
  );
});
