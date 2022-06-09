"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["describe", "knownFailingEvalCafSuite"], [global, require('art-standard-lib'), require('art-testbench'), require('./TestHelpers')], (describe, knownFailingEvalCafSuite) => {require('../CaffeineScript'); return describe({basics: function() {return knownFailingEvalCafSuite("5\n3 + .", 8);}});});});
//# sourceMappingURL=DotReference.test.js.map
