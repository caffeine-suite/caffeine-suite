"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["os"], [global, {os: require('os')}], (os) => {let tempDir; tempDir = null; return {mockTempDir: function(newTempDir) {return tempDir = newTempDir;}, getTempDir: function() {return tempDir != null ? tempDir : os.tmpdir();}};});});
//# sourceMappingURL=TempDir.js.map
