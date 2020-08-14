"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["CaffeineEight"],
    [
      global,
      require("art-standard-lib"),
      { CaffeineEight: require("caffeine-eight") },
    ],
    (CaffeineEight) => {
      let CaffeineMcParser;
      return (CaffeineMcParser = Caf.defClass(
        class CaffeineMcParser extends CaffeineEight.Parser {},
        function (CaffeineMcParser, classSuper, instanceSuper) {
          this.rule({
            root: [
              "!oneLinerWithoutColon meta? toEof",
              {
                getter: {
                  compilerName: function () {
                    let base, base1;
                    return (
                      Caf.exists((base = this.meta)) &&
                      Caf.exists((base1 = base.compilerName)) &&
                      base1.text
                    );
                  },
                  metaCode: function () {
                    let base, base1;
                    return (
                      Caf.exists((base = this.meta)) &&
                      Caf.exists((base1 = base.metaCode)) &&
                      base1.text
                    );
                  },
                  code: function () {
                    let base;
                    return (Caf.exists((base = this.toEof)) && base.text) || "";
                  },
                },
              },
            ],
          });
          this.rule({
            meta: [
              "'|' compilerName /: */ metaCode:toEol end",
              "'|' / +/ metaCode:toEol end",
              "'|' compilerName /: */? metaCode:block end",
              "'|' metaCode:block end",
              "'|' compilerName end",
              "'|'",
            ],
            oneLinerWithoutColon: "'|' compilerName / *[^:\n]/",
            compilerName: /[^:\s]+/i,
            toEof: /(.|\n)*$/,
            toEol: /\S[^\n]*/,
            end: /\n|$/,
            block: CaffeineEight.Extensions.IndentBlocks.getPropsToSubparseBlock(
              { rule: "toEof" }
            ),
          });
        }
      ));
    }
  );
});
