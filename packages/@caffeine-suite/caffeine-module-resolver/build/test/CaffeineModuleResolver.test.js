"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "assert"], [global, require('art-testbench')], (test, assert) => {return test("stub", function() {return assert.true(true);});});});
//# sourceMappingURL=CaffeineModuleResolver.test.js.map
