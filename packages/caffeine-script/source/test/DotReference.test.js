"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["describe", "test", "assert"], [global, require('art-standard-lib'), require('art-testbench')], (describe, test, assert) => {require('../CaffeineScript'); return describe({basics: function() {return test("big error", () => assert.eq(1, 2));}});});});
//# sourceMappingURL=DotReference.test.js.map
