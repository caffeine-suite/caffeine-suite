// Generated by CoffeeScript 1.12.7
(function() {
  var CafRepl, CaffeineMc, CompileCache, Promise, args, cache, colors, commander, compile, compileDirectory, compileFile, compiler, dashCase, displayError, each, escapeRegExp, fileCounts, fileToRun, files, formattedInspect, fs, glob, isString, log, nocache, obj, output, path, present, prettier, realRequire, ref, ref1, ref2, reset, serializer, transpile, verbose, version, versions,
    slice = [].slice;

  global.ArtStandardLibMultipleContextTypeSupport = true;

  colors = require("colors");

  glob = require("glob-promise");

  fs = require('fs-extra');

  path = require('path');

  realRequire = eval('require');

  ref = CaffeineMc = eval('require')('./index'), version = ref.version, displayError = ref.displayError, CafRepl = ref.CafRepl, CompileCache = ref.CompileCache;

  ref1 = require("art-standard-lib"), log = ref1.log, dashCase = ref1.dashCase, escapeRegExp = ref1.escapeRegExp, present = ref1.present, isString = ref1.isString, Promise = ref1.Promise, formattedInspect = ref1.formattedInspect, each = ref1.each, escapeRegExp = ref1.escapeRegExp;

  commander = require("commander").version(version).usage('[options] <input files and directories>').option('-o, --output <directory>', "where to write output files").option('-c, --compile', 'compile files').option('--nocache', 'disable compile cache').option('-p, --prettier', 'apply "prettier" to any js output').option('-t, --transpile [presets...]', 'transpile with babel').option('-d, --debug', 'show debug info').option('-v, --verbose', 'show more output').option('-r, --reset', 'reset cache').option('-m, --map', 'generate source map and save as .js.map files').option('-M, --inline-map', 'generate source map and include it directly in output').option('--versions [compiler-npm-name]', "show caffeine-mc's version OR the specified caffeine-mc-compatible compiler's version").on("--help", function() {
    return console.log("An output directory is required if more than one input file is specified.\n\nDefault action, if a file is provided, is to execute it.");
  }).parse(process.argv);

  displayError = function(e) {
    return CaffeineMc.displayError(e, commander);
  };

  reset = commander.reset, output = commander.output, compile = commander.compile, prettier = commander.prettier, transpile = commander.transpile, verbose = commander.verbose, versions = commander.versions, cache = commander.cache, nocache = commander.nocache;

  CaffeineMc.cacheEnabled = cache = !nocache;

  fileCounts = {
    read: 0,
    written: 0,
    compiled: 0,
    fromCache: 0
  };

  compileFile = function(filename, outputDirectory) {
    return CaffeineMc.compileFile(filename, {
      outputDirectory: outputDirectory || output || path.dirname(filename),
      prettier: prettier,
      transpile: transpile,
      cache: cache,
      sourceMap: commander.map,
      inlineMap: commander.inlineMap || commander["inline-map"]
    }).then(function(arg) {
      var output, readCount, writeCount;
      readCount = arg.readCount, writeCount = arg.writeCount, output = arg.output;
      if (output.fromCache) {
        fileCounts.fromCache += readCount;
      } else {
        fileCounts.compiled += readCount;
      }
      if (verbose) {
        if (output.fromCache) {
          log("cached: " + filename.grey);
        } else {
          log("compiled: " + filename.green);
        }
      }
      fileCounts.read += readCount;
      return fileCounts.written += writeCount;
    });
  };

  compileDirectory = function(dirname) {
    return glob(path.join(dirname, "**", "*.caf")).then(function(list) {
      var serializer;
      serializer = new Promise.Serializer;
      each(list, function(filename) {
        var outputDirectory, relative;
        relative = path.relative(dirname, filename);
        if (output) {
          outputDirectory = path.join(output, path.dirname(relative));
        }
        return serializer.then(function() {
          return Promise.then(function() {
            return outputDirectory && fs.ensureDir(outputDirectory);
          }).then(function() {
            return compileFile(filename, outputDirectory);
          });
        });
      });
      return serializer;
    });
  };

  if (reset) {
    CompileCache.reset();
  }

  if (compile) {
    files = commander.args;
    if (files.length > 0) {
      verbose && log({
        compile: {
          inputs: files.length === 1 ? files[0] : files,
          output: output
        }
      });
      if (verbose) {
        log("caffeine-mc loaded");
      }
      if (verbose && (transpile || prettier)) {
        log({
          prettier: prettier,
          transpile: transpile
        });
      }
      serializer = new Promise.Serializer;
      each(files, function(filename) {
        return serializer.then(function() {
          if (fs.statSync(filename).isDirectory()) {
            return compileDirectory(filename);
          } else {
            return compileFile(filename);
          }
        });
      });
      serializer.then(function() {
        if (commander.debug) {
          log({
            DEBUG: {
              loadedModules: Object.keys(realRequire('module')._cache),
              registeredLoaders: Object.keys(realRequire.extensions)
            }
          });
        }
        return log({
          success: {
            fileCounts: fileCounts
          }
        });
      });
      serializer["catch"](displayError);
    } else {
      commander.outputHelp();
    }
  } else if (commander.args.length >= 1) {
    ref2 = commander.args, fileToRun = ref2[0], args = 2 <= ref2.length ? slice.call(ref2, 1) : [];
    CaffeineMc.register();
    CaffeineMc.runFile(fileToRun, {
      color: true,
      cache: cache,
      verbose: verbose,
      args: args
    });
  } else if (versions) {
    if (isString(versions)) {
      compiler = realRequire(dashCase(versions));
      log((
        obj = {},
        obj["" + versions] = compiler.version || compiler.VERSION,
        obj
      ));
    }
    log({
      Neptune: Neptune.getVersions()
    });
  } else {
    CafRepl.start();
  }

}).call(this);

//# sourceMappingURL=caf-command.js.map
