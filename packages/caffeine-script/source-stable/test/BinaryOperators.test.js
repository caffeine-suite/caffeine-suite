"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["evalCafSuite"], [global, require('./StandardImport')], (evalCafSuite) => {return evalCafSuite(["1 + 2", 3], ["1 - 2", -1], ["1 / 2", 1 / 2], ["2 * 3", 6]);});});
//# sourceMappingURL=BinaryOperators.test.js.map
