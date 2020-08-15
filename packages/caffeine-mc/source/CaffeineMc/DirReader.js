"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["cacheable", "fs", "path"],
    [global, require("./StandardImport"), require("./WorkingCache")],
    (cacheable, fs, path) => {
      return {
        isDir: cacheable("isDir", function (p) {
          return fs.statSync(p).isDirectory();
        }),
        read: cacheable("read", fs.readdirSync),
        resolve: cacheable("resolve", path.resolve),
      };
    }
  );
});
