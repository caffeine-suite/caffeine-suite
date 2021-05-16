"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "Parser", "assert", "w"],
    [
      global,
      require("art-standard-lib"),
      require("../../Caffeine.Eight"),
      require("art-testbench"),
    ],
    (test, Parser, assert, w) => {
      return test("cache and node mutations - or lack thereof soon", function () {
        let MyParser, mainNode;
        MyParser = Caf.defClass(
          class MyParser extends Parser {},
          function (MyParser, classSuper, instanceSuper) {
            this.rule({
              root: w("doesntMatch1 doesntMatch2 doesMatch"),
              doesntMatch1: "label ':('",
              doesntMatch2: "bad:identifier ':('",
              doesMatch: "label ')'",
              label: "good:identifier ':'",
              identifier: /[_a-z0-9]+/i,
            });
          }
        );
        mainNode = MyParser.parse("boo:)");
        return assert.eq(
          "good",
          mainNode.matches[0].matches[0].matches[0].label
        );
      });
    }
  );
});
