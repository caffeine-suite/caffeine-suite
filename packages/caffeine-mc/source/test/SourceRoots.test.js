"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "SourceRoots",
      "beforeEach",
      "CaffeineMcTestHelper",
      "WorkingCache",
      "test",
      "path",
      "assert",
      "process",
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
      SourceRoots,
      beforeEach,
      CaffeineMcTestHelper,
      WorkingCache,
      test,
      path,
      assert,
      process
    ) => {
      let getCaffeineInit, findSourceRoot, _resetSourceRoots;
      getCaffeineInit = SourceRoots.getCaffeineInit;
      findSourceRoot = SourceRoots.findSourceRoot;
      _resetSourceRoots = SourceRoots._resetSourceRoots;
      beforeEach(function () {
        WorkingCache.resetWorkingCache();
        return CaffeineMcTestHelper.reset();
      });
      Caf.each2(CaffeineMcTestHelper.testFiles, (file) =>
        test(`findSourceRoot ${Caf.toString(
          path.basename(file)
        )}`, function () {
          return findSourceRoot(file).then((out) =>
            assert.eq(
              path.relative(process.cwd(), out),
              "test/files/SourceRoots/DotCaffeineRoot"
            )
          );
        })
      );
      return Caf.each2(CaffeineMcTestHelper.testFiles, (file) =>
        test(`getCaffeineInit ${Caf.toString(
          path.basename(file)
        )}`, function () {
          return findSourceRoot(file)
            .then((sourceRoot) => getCaffeineInit(sourceRoot))
            .then((caffeineInit) => {
              assert.eq(CaffeineMcTestHelper.testLog, [
                "caffeine-mc.config.caf loaded",
                "caffeine-mc.config.caf custom compiler used on: caffeine-mc.config.caf, mySpecialConfig: undefined",
                "caffeine-mc.config.caf ran",
              ]);
              assert.eq(caffeineInit.config, { mySpecialConfig: "worked!" });
              return assert.isFunction(caffeineInit.compiler.compile);
            });
        })
      );
    }
  );
});
