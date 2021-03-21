"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["evalCafSuite"],
    [global, require("./StandardImport")],
    (evalCafSuite) => {
      return evalCafSuite("5\n3 + .", 8);
    }
  );
});
