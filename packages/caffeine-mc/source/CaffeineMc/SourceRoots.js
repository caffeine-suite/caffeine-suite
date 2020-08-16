"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "SourceRootFinder",
      "BaseClass",
      "log",
      "Promise",
      "fs",
      "path",
      "process",
      "Error",
    ],
    [
      global,
      require("./StandardImport"),
      require("@art-suite/source-root-finder"),
    ],
    (SourceRootFinder, BaseClass, log, Promise, fs, path, process, Error) => {
      let caffeineInitFileName, caffeineProjectSourceRootFinder, SourceRoots;
      caffeineInitFileName = "caffeine-mc.config.caf";
      caffeineProjectSourceRootFinder = new SourceRootFinder({
        indicatorFiles: ["package.json", ".git", caffeineInitFileName],
      });
      return (SourceRoots = Caf.defClass(
        class SourceRoots extends BaseClass {},
        function (SourceRoots, classSuper, instanceSuper) {
          let _Metacompiler, newMetacompiler, evalCapturingModuleExports;
          this.classGetter("caffeineInits", {
            sourceRootIndicatorFiles: function () {
              return caffeineProjectSourceRootFinder.indicatorFiles;
            },
            caffeineInitFileName: function () {
              return caffeineInitFileName;
            },
          });
          _Metacompiler = null;
          newMetacompiler = function () {
            return new (_Metacompiler != null
              ? _Metacompiler
              : (_Metacompiler = require("./Metacompiler")))();
          };
          evalCapturingModuleExports = function (source) {
            let e, exports;
            global.__caffeineMcModule = {};
            try {
              eval(
                `(function(module){${Caf.toString(
                  source
                )}})(__caffeineMcModule);`
              );
            } catch (error) {
              e = error;
              log.error({
                "ERROR evalCapturingModuleExports": { source, error: e },
              });
              throw e;
            }
            ({ exports } = global.__caffeineMcModule || {});
            global.__caffeineMcModule = null;
            return exports;
          };
          this.getCaffeineInit = (sourceRoot = process.cwd()) => {
            let res, sourceFile;
            return (res = this.caffeineInits[sourceRoot]) != null
              ? Promise.resolve(res)
              : fs
                  .exists(
                    (sourceFile = path.join(
                      sourceRoot,
                      this.caffeineInitFileName
                    ))
                  )
                  .then((exists) => {
                    let contentsPromise;
                    contentsPromise = exists
                      ? fs
                          .readFile(sourceFile)
                          .then((contents) => (contents = contents.toString()))
                      : Promise.resolve(false);
                    return contentsPromise.then((contents) => {
                      let metacompiler, result;
                      metacompiler = newMetacompiler();
                      return (this.caffeineInits[sourceRoot] = {
                        compiler: metacompiler,
                        config: (result =
                          contents &&
                          metacompiler.compile(contents, {
                            sourceFile,
                            sourceRoot,
                          }))
                          ? evalCapturingModuleExports(result.compiled.js)
                          : {},
                      });
                    });
                  });
          };
          this.getCaffeineInitSync = (sourceRoot) => {
            let res, sourceFile, contents, metacompiler, result;
            if (!sourceRoot) {
              throw new Error("no sourceRoot");
            }
            return (res = this.caffeineInits[sourceRoot]) != null
              ? res
              : fs.existsSync(
                  (sourceFile = path.join(
                    sourceRoot,
                    this.caffeineInitFileName
                  ))
                )
              ? ((contents = fs.readFileSync(sourceFile).toString()),
                (metacompiler = newMetacompiler()),
                (result = metacompiler.compile(contents, {
                  sourceFile,
                  sourceRoot,
                })),
                (this.caffeineInits[sourceRoot] = {
                  compiler: metacompiler.compiler,
                  config: evalCapturingModuleExports(result.compiled.js),
                }))
              : false;
          };
          this.findSourceRoot = function (directory) {
            return caffeineProjectSourceRootFinder.findSourceRoot(directory);
          };
          this.findSourceRootSync = function (directory) {
            return caffeineProjectSourceRootFinder.findSourceRootSync(
              directory
            );
          };
          this._caffeineInits = {};
          this._resetSourceRoots = () => (this._caffeineInits = {});
        }
      ));
    }
  );
});
