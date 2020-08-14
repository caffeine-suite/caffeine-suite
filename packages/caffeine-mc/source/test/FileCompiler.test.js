"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "describe",
      "beforeEach",
      "CaffeineMcTestHelper",
      "test",
      "path",
      "compileFile",
      "assert",
      "CompileCache",
    ],
    [
      global,
      require("./StandardImport"),
      {
        path: require("path"),
        CaffeineMcTestHelper: require("./CaffeineMcTestHelper"),
      },
    ],
    (
      describe,
      beforeEach,
      CaffeineMcTestHelper,
      test,
      path,
      compileFile,
      assert,
      CompileCache
    ) => {
      return describe({
        basic: function () {
          beforeEach(() => CaffeineMcTestHelper.reset());
          return Caf.each2(CaffeineMcTestHelper.testFiles, (file) =>
            test(`compileFile ${Caf.toString(path.basename(file))}`, () =>
              compileFile(file).then((out) => {
                let filename;
                filename = path.basename(file);
                return assert.eq(CaffeineMcTestHelper.testLog, [
                  "caffeine-mc.config.caf loaded",
                  "caffeine-mc.config.caf custom compiler used on: caffeine-mc.config.caf, mySpecialConfig: undefined",
                  "caffeine-mc.config.caf ran",
                  `caffeine-mc.config.caf custom compiler used on: ${Caf.toString(
                    filename
                  )}, mySpecialConfig: :worked!`,
                ]);
              }))
          );
        },
        withCache: function () {
          beforeEach(() => {
            CaffeineMcTestHelper.reset();
            return CompileCache.reset();
          });
          return Caf.each2(CaffeineMcTestHelper.testFiles, (file) =>
            test(`compileFile ${Caf.toString(path.basename(file))}`, () => {
              let firstCompileOutput;
              firstCompileOutput = null;
              return compileFile(file, { cache: true })
                .then((out) => {
                  firstCompileOutput = out;
                  return assert.ok(!out.fromCache);
                })
                .then(() => {
                  CaffeineMcTestHelper.reset();
                  return compileFile(file, { cache: true });
                })
                .then((secondCompileOutput) => {
                  assert.eq(CaffeineMcTestHelper.testLog, [
                    "caffeine-mc.config.caf loaded",
                    "caffeine-mc.config.caf custom compiler used on: caffeine-mc.config.caf, mySpecialConfig: undefined",
                    "caffeine-mc.config.caf ran",
                  ]);
                  assert.ok(secondCompileOutput.output.fromCache);
                  return assert.eq(
                    secondCompileOutput.output.compiled,
                    firstCompileOutput.output.compiled
                  );
                });
            })
          );
        },
      });
    }
  );
});
