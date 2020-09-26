"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "getEnv",
      "getRemainingRequest",
      "FileCompiler",
      "CaffeineEightCompileError",
      "Error",
      "log",
    ],
    [
      global,
      require("art-standard-lib"),
      require("./CaffeineMc"),
      require("caffeine-eight"),
      require("loader-utils"),
    ],
    (
      getEnv,
      getRemainingRequest,
      FileCompiler,
      CaffeineEightCompileError,
      Error,
      log
    ) => {
      let cafSourceMaps;
      cafSourceMaps = getEnv().cafSourceMaps;
      return function (source) {
        let sourceFile, js, sourceMap, e, out;
        Caf.isF(this.cacheable) && this.cacheable();
        sourceFile = getRemainingRequest(this);
        return (() => {
          try {
            ({
              compiled: { js, sourceMap },
            } = FileCompiler.compileFileSync(sourceFile, {
              source,
              debug: this.debug,
              sourceRoot: "",
              cache: true,
              inlineMap: !!cafSourceMaps,
              prettier: !cafSourceMaps,
            }));
            return this.callback(null, js, sourceMap);
          } catch (error) {
            e = error;
            if (e instanceof CaffeineEightCompileError) {
              out = new Error(e.toString());
              out.stack = "";
              throw out;
            } else {
              log.error({ "CaffeineMc webpack-loader error": e });
            }
            return (() => {
              throw e;
            })();
          }
        })();
      };
    }
  );
});
