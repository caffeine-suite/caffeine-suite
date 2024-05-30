"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["process"], [global, require('art-standard-lib')], (process) => {let mockedCwdFunction; mockedCwdFunction = null; return {mockCwdFunction: function(newCwd) {return mockedCwdFunction = newCwd;}, unmockCwdFunction: function() {return mockedCwdFunction = null;}, getCwd: function() {return mockedCwdFunction ? Caf.isF(mockedCwdFunction) && mockedCwdFunction() : process.cwd();}};});});
//# sourceMappingURL=MockableCwd.js.map
