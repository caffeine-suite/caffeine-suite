"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["merge"],
    [global, require("./StandardImport")],
    (merge) => {
      return merge(
        require("./Base64"),
        require("./SourceMapGenerator"),
        require("./SourceMapConsumer")
      );
    }
  );
});
