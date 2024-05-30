"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["cacheable", "fs", "path", "getCwd"], [global, require('./StandardImport'), require('./WorkingCache'), require('../MockableCwd')], (cacheable, fs, path, getCwd) => {return {isDir: cacheable("isDir", function(p) {return fs.statSync(p).isDirectory();}), read: cacheable("read", fs.readdirSync), resolve: cacheable("resolve", function(...args) {return (args[0] && path.isAbsolute(args[0])) ? path.resolve(...args) : path.resolve(getCwd(), ...args);})};});});
//# sourceMappingURL=DirReader.js.map
