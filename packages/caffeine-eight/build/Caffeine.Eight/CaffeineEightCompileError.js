"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["ErrorWithInfo"], [global, require('art-standard-lib')], (ErrorWithInfo) => {let CaffeineEightCompileError; return CaffeineEightCompileError = Caf.defClass(class CaffeineEightCompileError extends ErrorWithInfo {constructor(message, info) {super(message, info, "CaffeineEightCompileError");};});});});
//# sourceMappingURL=CaffeineEightCompileError.js.map
