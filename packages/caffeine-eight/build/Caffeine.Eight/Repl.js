"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["isClass", "log"], [global, require('art-standard-lib')], (isClass, log) => {let Repl; return Repl = Caf.defClass(class Repl extends Object {}, function(Repl, classSuper, instanceSuper) {this.caffeineEightRepl = function(parser, options) {let realRequire; if (isClass(parser)) {parser = new parser;}; realRequire = eval("require"); try {realRequire("colors");} catch (error) {}; if (Caf.exists(options) && options.load) {log(`TODO: load, parse and evaluate these files: ${Caf.toString(options.load.join(", "))}`);}; return realRequire("repl").start({prompt: `${Caf.toString(parser.getClassName())}> `.grey, eval: (command, context, filename, callback) => {let result, parsed, e; return (() => {try {result = parsed = parser.parse(command.trim()); return (() => {try {log((undefined === (result = Caf.isF(parsed.evaluate) && parsed.evaluate())) ? parsed : result); return callback();} catch (error1) {e = error1; return callback(e);};})();} catch (error2) {e = error2; log(parser.getParseFailureInfo({color: true, verbose: Caf.exists(options) && options.verbose}).replace("<HERE>", ("<HERE>").red)); return callback();};})();}});};});});});
//# sourceMappingURL=Repl.js.map