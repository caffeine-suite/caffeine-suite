"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["path"],
    [global, require("./StandardImport"), { path: require("path") }],
    (path) => {
      return {
        getSourceMapPath: function (sourceRoot, sourceFile) {
          return sourceRoot ? path.resolve(sourceRoot, sourceFile) : sourceFile;
        },
        getRelativeSourceMapPath: function (sourceRoot, sourceFile) {
          return sourceFile ? path.basename(sourceFile) : undefined;
        },
        getRelativePathToSourceRoot: function (sourceRoot, sourceFile) {
          return sourceFile && sourceRoot
            ? path.relative(path.dirname(sourceFile), sourceRoot)
            : "";
        },
        getRelativePathToSourceFile: function (sourceRoot, sourceFile) {
          return sourceFile && sourceRoot
            ? path.relative(sourceRoot, sourceFile)
            : sourceFile;
        },
        getOutputFileName: function (sourceFile, extension) {
          return (
            Caf.exists(sourceFile) && sourceFile.replace(/\.\w+$/, extension)
          );
        },
      };
    }
  );
});
