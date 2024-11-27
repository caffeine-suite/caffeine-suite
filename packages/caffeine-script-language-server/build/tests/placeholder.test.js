"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["describe", "test"], [global, require('art-testbench')], (describe, test) => {return describe({test: function() {return test("foo", () => "bar");}});});});
//# sourceMappingURL=placeholder.test.js.map
