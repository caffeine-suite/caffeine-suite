"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["version", "process", "CaffeineMc", "compactFlatten", "CompileCache", "log", "Promise", "isString", "dashCase", "Neptune", "CafRepl", "console", "path", "glob", "fs", "Error", "Object"], [global, require('art-standard-lib'), require('./CaffeineMc'), require('glob'), {CaffeineMc: require('./CaffeineMc'), path: require('path'), fs: require('fs-extra'), colors: require('colors')}], (version, process, CaffeineMc, compactFlatten, CompileCache, log, Promise, isString, dashCase, Neptune, CafRepl, console, path, glob, fs, Error, Object) => {let realRequire, commander, displayError, reset, output, compile, prettier, verbose, versions, cache, nocache, toRequire, fileCounts, compileFile, compileDirectory, files, serializer, fileToRun, args, compiler; global.ArtStandardLibMultipleContextTypeSupport = true; realRequire = eval("require"); (commander = new (require("commander").Command)()).version(version).usage("[options] <input files and directories>").option("-o, --output <directory>", "where to write output files").option("-c, --compile", "compile files").option("--nocache", "disable compile cache").option("-p, --prettier", 'apply "prettier" to any js output').option("-d, --debug", "show debug info").option("-v, --verbose", "show more output").option("-r, --reset", "reset cache").option("-R, --require <package...>", "require one or more packages on load (e.g. --require coffee-script/register)").option("-m, --map", "generate source map and save as .js.map files").option("-M, --inline-map", "generate source map and include it directly in output").option("--versions [compiler-npm-name]", "show caffeine-mc's version OR the specified caffeine-mc-compatible compiler's version").on("--help", function() {return console.log("An output directory is required if more than one input file is specified.\n\nDefault action, if a file is provided, is to execute it.");}).parse(process.argv); displayError = function(e) {return CaffeineMc.displayError(e, commander);}; reset = commander.reset; output = commander.output; compile = commander.compile; prettier = commander.prettier; verbose = commander.verbose; versions = commander.versions; cache = commander.cache; nocache = commander.nocache; toRequire = commander.require; CaffeineMc.cacheEnabled = cache = !nocache; fileCounts = {read: 0, cached: 0, compiled: 0, unchanged: 0, written: 0}; compileFile = function(filename, outputDirectory) {return CaffeineMc.compileFile(filename, {outputDirectory: outputDirectory || output || path.dirname(filename), prettier, cache, sourceMap: commander.map, inlineMap: commander.inlineMap || commander["inline-map"]}).then(({readCount, writeCount, unchangedCount, output}) => {if (output.cached) {fileCounts.cached += readCount;} else {fileCounts.compiled += readCount;}; if (verbose) {if (output.cached) {log(`cached: ${Caf.toString(filename.grey)}`);} else {log(`compiled: ${Caf.toString(filename.green)}`);};}; fileCounts.read += readCount; fileCounts.written += writeCount; return fileCounts.unchanged += unchangedCount;});}; compileDirectory = function(dirname) {return glob(path.join(dirname, "**", "*.caf")).then((list) => {serializer = new (Promise.Serializer); Caf.each2(list, (filename) => {let relative, outputDirectory; relative = path.relative(dirname, filename); if (output) {outputDirectory = path.join(output, path.dirname(relative));}; return serializer.then(() => Promise.then(() => outputDirectory && fs.ensureDir(outputDirectory)).then(() => compileFile(filename, outputDirectory)));}); return serializer;});}; Caf.each2(compactFlatten([toRequire]), (requirePath) => {log(`requiring: ${Caf.toString(requirePath)}`); return realRequire(requirePath);}); if (reset) {CompileCache.reset();}; return (() => {switch (false) {case !compile: files = commander.args; return ([files.length > 0, "#&&", output]) ? (verbose && log({compile: {inputs: (files.length === 1) ? files[0] : files, output}}), verbose ? log("caffeine-mc loaded") : undefined, (verbose && prettier) ? log({prettier}) : undefined, serializer = new (Promise.Serializer), Caf.each2(files, (filename) => serializer.then(function() {return fs.existsSync(filename) ? fs.statSync(filename).isDirectory() ? compileDirectory(filename) : compileFile(filename) : (() => {throw new Error(`sourceFile not found: ${Caf.toString(filename)}`);})();})), serializer.then(function() {if (commander.debug) {log({DEBUG: {loadedModules: Object.keys(realRequire("module")._cache), registeredLoaders: Object.keys(realRequire.extensions)}});}; return log({success: {fileCounts}});}), serializer.catch(function(error) {displayError(error); return process.exit(1);})) : commander.outputHelp(); case !(commander.args.length >= 1): ([fileToRun, ...args] = commander.args); CaffeineMc.register(); return CaffeineMc.runFile(fileToRun, {color: [true, cache, verbose, args]}); case !versions: if (isString(versions)) {compiler = realRequire(dashCase(versions)); log({[`${Caf.toString(versions)}`]: compiler.version || compiler.VERSION});}; return log({Neptune: Neptune.getVersions()}); default: return CafRepl.start();};})();});});
//# sourceMappingURL=caf-command.js.map
