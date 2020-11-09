"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["SourceRootFinder", "BaseClass", "log", "fs", "path", "process", "Promise", "Error"], [global, require('./StandardImport'), require("@art-suite/source-root-finder")], (SourceRootFinder, BaseClass, log, fs, path, process, Promise, Error) => {let caffeineInitFileName, caffeineProjectSourceRootFinder, SourceRoots; caffeineInitFileName = "caffeine-mc.config.caf"; caffeineProjectSourceRootFinder = new SourceRootFinder({indicatorFiles: ["package.json", ".git", caffeineInitFileName]}); return SourceRoots = Caf.defClass(class SourceRoots extends BaseClass {}, function(SourceRoots, classSuper, instanceSuper) {let _Metacompiler, newMetacompiler, evalCapturingModuleExports; this.classGetter("caffeineInits", "caffeineInitsSync", {sourceRootIndicatorFiles: function() {return caffeineProjectSourceRootFinder.indicatorFiles;}, caffeineInitFileName: function() {return caffeineInitFileName;}}); _Metacompiler = null; newMetacompiler = function() {return new (_Metacompiler != null ? _Metacompiler : _Metacompiler = require('./Metacompiler'));}; evalCapturingModuleExports = function(source) {let e, exports; global.__caffeineMcModule = {}; try {eval(`(function(module){${Caf.toString(source)}})(__caffeineMcModule);`);} catch (error) {e = error; log.error({"ERROR evalCapturingModuleExports": {source, error: e}}); throw e;}; ({exports} = global.__caffeineMcModule || {}); global.__caffeineMcModule = null; return exports;}; this.getCaffeineInit = (sourceRoot = process.cwd()) => {let sourceFile, temp, base; return ((temp = (base = this.caffeineInits)[sourceRoot]) != null ? temp : base[sourceRoot] = fs.exists(sourceFile = path.join(sourceRoot, this.caffeineInitFileName)).then((exists) => (exists ? fs.readFile(sourceFile).then((contents) => contents.toString()) : Promise.resolve(false)).then((caffeineInitFileContents) => {let metacompiler, result; return this.caffeineInits[sourceRoot] = {compiler: metacompiler = newMetacompiler(), config: (result = caffeineInitFileContents && metacompiler.compile(caffeineInitFileContents, {sourceFile, sourceRoot})) ? evalCapturingModuleExports(result.compiled.js) : {}};})));}; this.getCaffeineInitSync = (sourceRoot) => {let sourceFile, caffeineInitFileContents, metacompiler, result, temp, base; if (!sourceRoot) {throw new Error("no sourceRoot");}; return ((temp = (base = this.caffeineInitsSync)[sourceRoot]) != null ? temp : base[sourceRoot] = fs.existsSync(sourceFile = path.join(sourceRoot, this.caffeineInitFileName)) ? (caffeineInitFileContents = fs.readFileSync(sourceFile).toString(), metacompiler = newMetacompiler(), result = metacompiler.compile(caffeineInitFileContents, {sourceFile, sourceRoot}), {compiler: metacompiler.compiler, config: evalCapturingModuleExports(result.compiled.js)}) : {compiler: newMetacompiler(), config: {}});}; this.findSourceRoot = function(directory) {return caffeineProjectSourceRootFinder.findSourceRoot(directory);}; this.findSourceRootSync = function(directory) {return caffeineProjectSourceRootFinder.findSourceRootSync(directory);}; this._caffeineInits = {}; this._caffeineInitsSync = {}; this._resetSourceRoots = () => {this._caffeineInits = {}; return this._caffeineInitsSync = {};};});});});
//# sourceMappingURL=SourceRoots.js.map
