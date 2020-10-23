"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "Error",
      "path",
      "findSourceRootSync",
      "fs",
      "merge",
      "getCaffeineInitSync",
      "findSourceRoot",
      "getCaffeineInit",
      "Promise",
      "present",
      "log",
    ],
    [global, require("./StandardImport"), require("./SourceRoots")],
    (
      Error,
      path,
      findSourceRootSync,
      fs,
      merge,
      getCaffeineInitSync,
      findSourceRoot,
      getCaffeineInit,
      Promise,
      present,
      log
    ) => {
      let CaffeineMc, FileCompiler;
      CaffeineMc = require("./namespace");
      return (FileCompiler = Caf.defClass(
        class FileCompiler extends Object {},
        function (FileCompiler, classSuper, instanceSuper) {
          this.compileFileSync = function (sourceFile, options = {}) {
            let source, sourceRoot;
            if (options.outputDirectory) {
              throw new Error("outputDirectory unsupported");
            }
            source = options.source;
            sourceRoot = options.sourceRoot;
            sourceRoot = sourceRoot
              ? path.resolve(sourceRoot)
              : findSourceRootSync(sourceFile);
            return CaffeineMc.compile(
              source != null ? source : fs.readFileSync(sourceFile).toString(),
              merge(options, { sourceFile, sourceRoot }),
              getCaffeineInitSync(sourceRoot)
            );
          };
          this.compileFile = function (sourceFile, options = {}) {
            let outputDirectory, source;
            outputDirectory = options.outputDirectory;
            source = options.source;
            return findSourceRoot(sourceFile).then((sourceRoot) => {
              let result;
              result = {
                readCount: 0,
                writeCount: 0,
                outputFiles: [],
                output: null,
              };
              return fs
                .exists(sourceFile)
                .then((exists) => {
                  if (!exists) {
                    throw new Error(
                      `sourceFile not found: ${Caf.toString(sourceFile)}`
                    );
                  }
                  return getCaffeineInit(sourceRoot);
                })
                .then(({ compiler, config }) =>
                  Promise.then(() =>
                    source != null
                      ? source
                      : fs
                          .readFile(sourceFile)
                          .then((source) => source.toString())
                  ).then((source) => {
                    result.output = compiler.compile(
                      source,
                      merge(config, options, { sourceFile, sourceRoot })
                    );
                    result.readCount++;
                    return Promise.all(
                      Caf.array(
                        result.output.compiled,
                        (text, extension) => {
                          let basename, outputFilename;
                          basename = path.basename(
                            sourceFile,
                            path.extname(sourceFile)
                          );
                          result.outputFiles.push(outputFilename);
                          return outputDirectory
                            ? (result.writeCount++,
                              (outputFilename = path.join(
                                outputDirectory,
                                `${Caf.toString(basename)}.${Caf.toString(
                                  extension
                                )}`
                              )),
                              fs.writeFile(outputFilename, text))
                            : Promise.resolve(text);
                        },
                        (text, extension) => present(text)
                      )
                    );
                  })
                )
                .then(() => result)
                .catch((e) => {
                  log.error(`error compiling: ${Caf.toString(sourceFile)}`);
                  return (() => {
                    throw e;
                  })();
                });
            });
          };
        }
      ));
    }
  );
});
