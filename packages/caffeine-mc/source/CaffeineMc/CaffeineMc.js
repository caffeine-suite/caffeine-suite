"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  require("source-map-support/register");
  return [
    require("./Metacompiler"),
    require("./FileCompiler"),
    require("./ModuleResolver"),
    require("./Tools"),
    require("./Run"),
    require("./Register"),
  ];
});
