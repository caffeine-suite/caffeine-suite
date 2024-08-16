"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return [require('art-standard-lib'), require('art-class-system'), require('../MockableCwd'), require('../MockableTempDir'), {path: require('path'), fs: require('fs-extra'), glob: require('glob').glob}];});
//# sourceMappingURL=StandardImport.js.map
