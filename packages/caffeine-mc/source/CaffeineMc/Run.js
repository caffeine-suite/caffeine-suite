"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseClass",
      "fs",
      "merge",
      "Error",
      "formattedInspect",
      "Object",
      "process",
      "compactFlattenAll",
      "path",
    ],
    [global, require("./StandardImport")],
    (
      BaseClass,
      fs,
      merge,
      Error,
      formattedInspect,
      Object,
      process,
      compactFlattenAll,
      path
    ) => {
      let CaffeineMc, fileExists, Run;
      CaffeineMc = require("./namespace");
      fileExists = function (filename) {
        return fs.existsSync(filename) && filename;
      };
      return (Run = Caf.defClass(class Run extends BaseClass {}, function (
        Run,
        classSuper,
        instanceSuper
      ) {
        let rewriteArgv;
        this._resolveSourceFile = function (options) {
          let sourceFile, color, found, e;
          ({ sourceFile, color } = options);
          return merge(options, {
            sourceFile: fs.existsSync(sourceFile)
              ? sourceFile
              : (found = Caf.find(require.extensions, (v, k) =>
                  fileExists(`${Caf.toString(sourceFile)}${Caf.toString(k)}`)
                ))
              ? found
              : ((e = new Error(
                  `No matching file found: ${Caf.toString(
                    formattedInspect({
                      sourceFile,
                      extensions: Object.keys(require.extensions).join(" "),
                    })
                  )}`
                )),
                (e.stack = color ? e.message.red : e.message),
                (() => {
                  throw e;
                })()),
          });
        };
        rewriteArgv = function (sourceFile, args) {
          process.argvRaw = process.argv;
          return (process.argv = compactFlattenAll("caf", sourceFile, args));
        };
        this.runFile = (sourceFile, options) => {
          let globalCompilerOptions, error;
          ({ globalCompilerOptions } = CaffeineMc);
          return (() => {
            try {
              CaffeineMc.globalCompilerOptions = options;
              this.setupNodeForRun(
                this._resolveSourceFile(
                  (options = merge(options, { sourceFile }))
                )
              );
              return require(require.main.filename);
            } catch (error1) {
              error = error1;
              require("./Tools").displayError(error);
              return process.exit(1);
            } finally {
              CaffeineMc.globalCompilerOptions = globalCompilerOptions;
            }
          })();
        };
        this.runJs = (js, options = {}) => {
          let main;
          this.setupNodeForRun(options);
          ({ main } = require);
          return main._compile(js, main.filename);
        };
        this.setupNodeForRun = function (options) {
          let sourceFile, main;
          ({ sourceFile } = options);
          ({ main } = require);
          main.filename = sourceFile = sourceFile
            ? fs.realpathSync(sourceFile)
            : "<anonymous>";
          rewriteArgv(sourceFile, options.args);
          main.moduleCache && (main.moduleCache = {});
          return (main.paths = require("module")._nodeModulePaths(
            fs.realpathSync(path.dirname(sourceFile || "./anonymous"))
          ));
        };
      }));
    }
  );
});
