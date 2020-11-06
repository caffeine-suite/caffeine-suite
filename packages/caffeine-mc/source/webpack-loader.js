"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["getEnv", "getRemainingRequest", "getCurrentRequest", "FileCompiler", "JSON", "CaffeineEightCompileError", "Error", "log"], [global, require('art-standard-lib'), require('./CaffeineMc'), require('caffeine-eight'), require('loader-utils')], (getEnv, getRemainingRequest, getCurrentRequest, FileCompiler, JSON, CaffeineEightCompileError, Error, log) => {let cafSourceMaps; cafSourceMaps = getEnv().cafSourceMaps; return function(source) {let sourceFile, outputFile, result, sourceMap, js, e, out; Caf.isF(this.cacheable) && this.cacheable(); sourceFile = getRemainingRequest(this); outputFile = getCurrentRequest(this); return (() => {try {result = FileCompiler.compileFileSync(sourceFile, {source, debug: this.debug, sourceRoot: "", cache: true, sourceMap: !!cafSourceMaps, prettier: !cafSourceMaps}); if (sourceMap = result.compiled["js.map"]) {sourceMap = JSON.parse(sourceMap); sourceMap.sourcesContent = [source]; sourceMap.file = outputFile; sourceMap.sourceRoot = ""; sourceMap.sources = [sourceFile]; js = js.replace(/\/\/# sourceMappingURL=.*(\n|\s)+$/, "");}; return this.callback(null, js, sourceMap);} catch (error) {e = error; if (e instanceof CaffeineEightCompileError) {out = new Error(e.toString()); out.stack = ""; throw out;} else {log.error({"CaffeineMc webpack-loader error": e});}; return (() => {throw e;})();};})();};});});
//# sourceMappingURL=webpack-loader.js.map
