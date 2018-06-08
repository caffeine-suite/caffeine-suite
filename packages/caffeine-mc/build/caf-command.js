module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = require('path' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = require('coffee-script/register' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = require('commander' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

var CafRepl, CaffeineMc, CompileCache, Promise, cache, colors, commander, compile, compileDirectory, compileFile, compiler, dashCase, displayError, each, escapeRegExp, fileCounts, fileToRun, files, formattedInspect, fs, glob, isString, log, obj, output, path, present, prettier, realRequire, ref, ref1, reset, serializer, verbose, version, versions;

global.ArtStandardLibMultipleContextTypeSupport = true;

colors = __webpack_require__(6);

glob = __webpack_require__(8);

fs = __webpack_require__(3);

path = __webpack_require__(1);

__webpack_require__(22);

realRequire = eval('require');

ref = CaffeineMc = eval('require')('./index'), version = ref.version, displayError = ref.displayError, CafRepl = ref.CafRepl, CompileCache = ref.CompileCache;

ref1 = Neptune.Art.StandardLib, log = ref1.log, dashCase = ref1.dashCase, escapeRegExp = ref1.escapeRegExp, present = ref1.present, isString = ref1.isString, Promise = ref1.Promise, formattedInspect = ref1.formattedInspect, each = ref1.each, escapeRegExp = ref1.escapeRegExp;

commander = __webpack_require__(23).version(version).usage('[options] <input files and directories>').option('-o, --output <directory>', "where to write output files").option('-c, --compile', 'compile files').option('-C, --cache', 'cache compiled files').option('-p, --prettier', 'apply "prettier" to any js output').option('-d, --debug', 'show debug info').option('-v, --verbose', 'show more output').option('-r, --reset', 'reset cache').option('-M, --inlineMap', 'generate source map and include it directly in output').option('--versions [compiler-npm-name]', "show caffeine-mc's version OR the specified caffeine-mc-compatible compiler's version").on("--help", function() {
  return console.log("An output directory is required if more than one input file is specified.\n\nDefault action, if a file is provided, is to execute it.");
}).parse(process.argv);

displayError = function(e) {
  return CaffeineMc.displayError(e, commander);
};

reset = commander.reset, output = commander.output, compile = commander.compile, prettier = commander.prettier, verbose = commander.verbose, versions = commander.versions, cache = commander.cache;

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
    cache: cache,
    inlineMap: commander.inlineMap
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

process.argv = 'caf';

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
    if (verbose && prettier) {
      log("using prettier");
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
} else if (commander.args.length === 1) {
  fileToRun = commander.args[0];
  CaffeineMc.register();
  CaffeineMc.runFile(fileToRun, {
    color: true,
    cache: cache
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


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require('fs-extra' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require('colors' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require('glob-promise' /* ABC - not inlining fellow NPM */);

/***/ })

/******/ });