module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var CaffeineMc, Neptune,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Neptune = __webpack_require__(24);

module.exports = Neptune.CaffeineMc || Neptune.addNamespace('CaffeineMc', CaffeineMc = (function(superClass) {
  extend(CaffeineMc, superClass);

  function CaffeineMc() {
    return CaffeineMc.__super__.constructor.apply(this, arguments);
  }

  return CaffeineMc;

})(Neptune.Base));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs-promise");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var BaseClass, CaffeineMc, CaffeineMcParser, Compilers, Metacompiler, dashCase, evalInContext, formattedInspect, isFunction, isString, log, lowerCamelCase, merge, present, realRequire, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Compilers = __webpack_require__(8);

CaffeineMcParser = __webpack_require__(7);

CaffeineMc = __webpack_require__(1);

realRequire = eval('require');

ref = __webpack_require__(0), dashCase = ref.dashCase, formattedInspect = ref.formattedInspect, present = ref.present, isFunction = ref.isFunction, log = ref.log, isString = ref.isString, lowerCamelCase = ref.lowerCamelCase, upperCamelCase = ref.upperCamelCase, merge = ref.merge;

BaseClass = __webpack_require__(11).BaseClass;

evalInContext = function(js, context) {
  return (function() {
    return eval(js);
  }).call(context);
};

module.exports = Metacompiler = (function(superClass) {
  extend(Metacompiler, superClass);

  Metacompiler.fileExtensions = ["caf", "caffeine"];

  Metacompiler.compile = function(code, options, caffeineInitJsString) {
    if (options == null) {
      options = {};
    }
    return new Metacompiler().compile(code, options, caffeineInitJsString);
  };

  Metacompiler.getter("compiler");

  Metacompiler.setter({

    /*
    IN:
      string: configure to use one of the CaffeineCompiler classes
      function: compileFunction
      object:
        compiler: custom compiler instance. Must implement:
          compile: compileFunction
    
    compileFunction: (sourceCode, options) ->
      IN:
        sourceCode: string
        options: {}
      ERROR: throw errors
      OUT:
        evalable-js-string
        OR
        object with at least:
          compiled: js: evalable-js-string
     */
    compiler: function(arg, options) {
      return this._compiler = (function() {
        if (isString(arg)) {
          return this.getCompiler(arg, options);
        } else if (isFunction(arg.compile)) {
          return arg;
        } else if (isFunction(arg)) {
          return {
            compile: arg
          };
        } else {
          log.error({
            InavlidCompiler: arg
          });
          throw new Error("CaffeineMc: @compiler must be a function or be an object with a .compile method.");
        }
      }).call(this);
    }
  });

  function Metacompiler() {
    Metacompiler.__super__.constructor.apply(this, arguments);
    this._metaParser = new CaffeineMcParser;
    this._metaCompiler = this;
    this._compiler = Compilers.JavaScript;
    this.compilers = {};
  }

  Metacompiler.prototype.normalizeCompilerResult = function(result) {
    var ref1;
    if (isString(result)) {
      return {
        compiled: {
          js: result
        }
      };
    } else if (isString(result != null ? result.code : void 0)) {
      return {
        compiled: {
          js: result.code
        }
      };
    } else if (isString(result != null ? result.js : void 0)) {
      return {
        compiled: result
      };
    } else if (isString(result != null ? (ref1 = result.compiled) != null ? ref1.js : void 0 : void 0)) {
      return result;
    } else {
      log.error({
        normalizeCompilerResult: {
          result: result,
          compiler: this.compiler
        }
      });
      throw new Error("CaffeineMc: expected @compiler result to be: (string), {js: string}, or {compiled: {js: string}}. Was: " + (formattedInspect(result)));
    }
  };


  /*
  IN:
    code: string
    options:
      sourceMap: t/f
      inlineMap: t/f
      sourceFile:
      sourceDir:
  
  OUT: (an object)
    compiled: extension => output map
      extension: string, ex: "js"
      output: string, ex: "alert();"
  
      If writing to files, we might do:
      for extension, output of compiled
        write originalFileNameWith(extension), output
   */

  Metacompiler.prototype.compile = function(code, options, caffeineInit) {
    var compilerName, config, metaCode, ref1, result;
    if (options == null) {
      options = {};
    }
    if (caffeineInit) {
      this.compiler = caffeineInit.compiler, config = caffeineInit.config;
      options = merge(config, options);
    }
    ref1 = this._metaParser.parse(code.toString()), compilerName = ref1.compilerName, metaCode = ref1.metaCode, code = ref1.code;
    if (compilerName) {
      this.setCompiler(compilerName, options);
    }
    return this.normalizeCompilerResult(metaCode ? (result = this.normalizeCompilerResult(this.compiler.compile(metaCode)), evalInContext(result.compiled.js, this), this.compile(code, options)) : this.compiler.compile(code, options));
  };

  Metacompiler.prototype.getCompiler = function(compilerName, options) {
    var absolutePath, base, compiler, out;
    if (!present(compilerName)) {
      return this.compiler;
    }
    if (compiler = Compilers[upperCamelCase(compilerName)]) {
      return compiler;
    }
    absolutePath = CaffeineMc.findModuleSync(compilerName, options).absolutePath;
    out = (base = this.compilers)[absolutePath] || (base[absolutePath] = realRequire(absolutePath));
    if (!isFunction(out.compile)) {
      throw new Error("CaffeineMc: compiler not found for: " + compilerName + " (normalized: " + ucCompilerName + ")");
    }
    return out;
  };

  return Metacompiler;

})(BaseClass);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, FsPromise, Metacompiler, SourceRoots, array, defineModule, each, find, log, merge, path, present, ref, w,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(0), defineModule = ref.defineModule, array = ref.array, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w;

BaseClass = __webpack_require__(11).BaseClass;

FsPromise = __webpack_require__(2);

path = __webpack_require__(3);

Metacompiler = __webpack_require__(4);

defineModule(module, SourceRoots = (function(superClass) {
  var defaultSourceRootIndicatorFiles, evalCapturingModuleExports;

  extend(SourceRoots, superClass);

  function SourceRoots() {
    return SourceRoots.__super__.constructor.apply(this, arguments);
  }

  SourceRoots.classGetter("sourceRootIndicatorFiles knownSourceRoots caffeineInits", {
    caffeineInitFileName: function() {
      return "caffeine-mc.config.caf";
    }
  });

  evalCapturingModuleExports = function(source) {
    var e, exports;
    global.__caffeineMcModule = {};
    try {
      eval("(function(module){ " + source + " })(__caffeineMcModule);");
    } catch (error) {
      e = error;
      log.error({
        "ERROR evalCapturingModuleExports": {
          source: source,
          error: e
        }
      });
      throw e;
    }
    exports = (global.__caffeineMcModule || {}).exports;
    global.__caffeineMcModule = null;
    return exports;
  };

  SourceRoots.getCaffeineInit = function(sourceRoot) {
    var res, sourceFile;
    if ((res = SourceRoots.caffeineInits[sourceRoot]) != null) {
      return Promise.resolve(res);
    } else {
      return FsPromise.exists(sourceFile = path.join(sourceRoot, SourceRoots.caffeineInitFileName)).then(function(exists) {
        if (exists) {
          return FsPromise.readFile(sourceFile).then(function(contents) {
            var metacompiler, result;
            contents = contents.toString();
            metacompiler = new Metacompiler;
            result = metacompiler.compile(contents, {
              sourceFile: sourceFile,
              sourceRoot: sourceRoot
            });
            return SourceRoots.caffeineInits[sourceRoot] = {
              compiler: metacompiler.compiler,
              config: evalCapturingModuleExports(result.compiled.js)
            };
          });
        } else {
          return false;
        }
      });
    }
  };

  SourceRoots.getCaffeineInitSync = function(sourceRoot) {
    var contents, metacompiler, res, result, sourceFile;
    if (!sourceRoot) {
      throw new Error("no sourceRoot");
    }
    if ((res = SourceRoots.caffeineInits[sourceRoot]) != null) {
      return res;
    } else {
      if (FsPromise.existsSync(sourceFile = path.join(sourceRoot, SourceRoots.caffeineInitFileName))) {
        contents = FsPromise.readFileSync(sourceFile).toString();
        metacompiler = new Metacompiler;
        result = metacompiler.compile(contents, {
          sourceFile: sourceFile,
          sourceRoot: sourceRoot
        });
        return SourceRoots.caffeineInits[sourceRoot] = {
          compiler: metacompiler.compiler,
          config: evalCapturingModuleExports(result.compiled.js)
        };
      } else {
        return false;
      }
    }
  };

  SourceRoots.findSourceRoot = function(directory, rootFiles) {
    if (rootFiles == null) {
      rootFiles = SourceRoots._sourceRootIndicatorFiles;
    }
    return FsPromise.stat(directory).then(function(stat) {
      var ret;
      if (!stat.isDirectory()) {
        directory = path.dirname(directory);
      }
      if ((ret = SourceRoots.knownSourceRoots[directory]) != null) {
        return ret;
      } else {
        return SourceRoots._findRootR(directory, rootFiles).then(function(sourceRoot) {
          return SourceRoots.knownSourceRoots[directory] = sourceRoot || false;
        });
      }
    });
  };

  SourceRoots.findSourceRootSync = function(directory, rootFiles) {
    var ret, sourceRoot, stat;
    if (rootFiles == null) {
      rootFiles = SourceRoots._sourceRootIndicatorFiles;
    }
    stat = FsPromise.statSync(directory);
    if (!stat.isDirectory()) {
      directory = path.dirname(directory);
    }
    if ((ret = SourceRoots.knownSourceRoots[directory]) != null) {
      return ret;
    } else {
      sourceRoot = SourceRoots._findRootSyncR(directory, rootFiles);
      return SourceRoots.knownSourceRoots[directory] = sourceRoot || false;
    }
  };

  SourceRoots._caffeineInits = {};

  SourceRoots._knownSourceRoots = {};

  SourceRoots._sourceRootIndicatorFiles = defaultSourceRootIndicatorFiles = ["package.json", SourceRoots.caffeineInitFileName];

  SourceRoots._resetSourceRoots = function() {
    SourceRoots._caffeineInits = {};
    SourceRoots._knownSourceRoots = {};
    return SourceRoots._sourceRootIndicatorFiles = defaultSourceRootIndicatorFiles;
  };

  SourceRoots._findRootR = function(directory, rootFiles) {
    return Promise.all(array(rootFiles, function(file) {
      return FsPromise.exists(path.join(directory, file));
    })).then((function(_this) {
      return function(rootFileExistResults) {
        if (find(rootFileExistResults)) {
          return directory;
        } else if (directory !== "/" && present(directory)) {
          return _this._findRootR(path.dirname(directory), rootFiles);
        } else {
          return null;
        }
      };
    })(this));
  };

  SourceRoots._findRootSyncR = function(directory, rootFiles) {
    var rootFileExistResults;
    rootFileExistResults = array(rootFiles, function(file) {
      return FsPromise.existsSync(path.join(directory, file));
    });
    if (find(rootFileExistResults)) {
      return directory;
    } else if (directory !== "/" && present(directory)) {
      return this._findRootSyncR(path.dirname(directory), rootFiles);
    } else {
      return null;
    }
  };

  return SourceRoots;

})(BaseClass));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var BabelBridge, CaffeineMcParser, isFunction, isString, log, lowerCamelCase, merge, present, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(0), present = ref.present, isFunction = ref.isFunction, log = ref.log, isString = ref.isString, lowerCamelCase = ref.lowerCamelCase, upperCamelCase = ref.upperCamelCase, merge = ref.merge;

BabelBridge = __webpack_require__(19);

module.exports = CaffeineMcParser = (function(superClass) {
  extend(CaffeineMcParser, superClass);

  function CaffeineMcParser() {
    return CaffeineMcParser.__super__.constructor.apply(this, arguments);
  }

  CaffeineMcParser.rule({
    root: "!oneLinerWithoutColon meta? toEof"
  }, {
    getter: {
      compilerName: function() {
        var ref1, ref2;
        return (ref1 = this.meta) != null ? (ref2 = ref1.compilerName) != null ? ref2.text : void 0 : void 0;
      },
      metaCode: function() {
        var ref1, ref2;
        return (ref1 = this.meta) != null ? (ref2 = ref1.metaCode) != null ? ref2.text : void 0 : void 0;
      },
      code: function() {
        var ref1;
        return ((ref1 = this.toEof) != null ? ref1.text : void 0) || "";
      }
    }
  });

  CaffeineMcParser.rule({
    meta: ["'|' compilerName /\: */ metaCode:toEol end", "'|' / +/ metaCode:toEol end", "'|' compilerName /\: */? metaCode:block end", "'|' metaCode:block end", "'|' compilerName end", "'|'"],
    oneLinerWithoutColon: "'|' compilerName / *[^:\n]/",
    compilerName: /[^:\s]+/i,
    toEof: /(.|\n)*$/,
    toEol: /\S[^\n]*/,
    end: /\n|$/,
    block: BabelBridge.Extensions.IndentBlocks.getPropsToSubparseBlock({
      rule: "toEof"
    })
  });

  return CaffeineMcParser;

})(BabelBridge.Parser);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16).addModules({
  JavaScript: __webpack_require__(15)
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var CaffeineMc, FileCompiler, FsPromise, array, caffeineInitFileName, defineModule, each, find, findSourceRoot, findSourceRootSync, getCaffeineInit, getCaffeineInitSync, log, merge, path, present, ref, ref1, w;

ref = __webpack_require__(0), defineModule = ref.defineModule, array = ref.array, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w;

FsPromise = __webpack_require__(2);

path = __webpack_require__(3);

CaffeineMc = __webpack_require__(1);

ref1 = __webpack_require__(5), getCaffeineInit = ref1.getCaffeineInit, caffeineInitFileName = ref1.caffeineInitFileName, findSourceRoot = ref1.findSourceRoot, getCaffeineInitSync = ref1.getCaffeineInitSync, findSourceRootSync = ref1.findSourceRootSync;

defineModule(module, FileCompiler = (function() {
  function FileCompiler() {}

  FileCompiler.compileFileSync = function(sourceFile, options) {
    var caffeineInit, source, sourceRoot;
    if (options == null) {
      options = {};
    }
    if (options.outputDirectory) {
      throw new Error("outputDirectory unsupported");
    }
    caffeineInit = getCaffeineInitSync(sourceRoot = findSourceRootSync(sourceFile));
    source = (FsPromise.readFileSync(sourceFile)).toString();
    return CaffeineMc.compile(source, merge(options, {
      sourceFile: sourceFile,
      sourceRoot: sourceRoot
    }), caffeineInit);
  };

  FileCompiler.compileFile = function(sourceFile, options) {
    var outputDirectory, prettier;
    if (options == null) {
      options = {};
    }
    outputDirectory = options.outputDirectory, prettier = options.prettier;
    return findSourceRoot(sourceFile).then(function(sourceRoot) {
      var result;
      result = {
        readCount: 0,
        writeCount: 0,
        outputFiles: [],
        output: null
      };
      return FsPromise.exists(sourceFile).then(function(exists) {
        if (!exists) {
          throw new Error("sourceFile not found: " + sourceFile);
        }
        return getCaffeineInit(sourceRoot);
      }).then(function(caffeineInit) {
        return FsPromise.readFile(sourceFile).then(function(source) {
          source = source.toString();
          result.output = CaffeineMc.compile(source, merge(options, {
            sourceFile: sourceFile,
            sourceRoot: sourceRoot
          }), caffeineInit);
          result.readCount++;
          return Promise.all(array(result.output.compiled, function(text, extension) {
            var basename, e, outputFilename;
            basename = path.basename(sourceFile, path.extname(sourceFile));
            result.outputFiles.push(outputFilename);
            if (prettier && extension === "js") {
              try {
                text = __webpack_require__(25).format(text);
              } catch (error) {
                e = error;
                log(e.message);
                return Promise.reject();
              }
            }
            if (outputDirectory) {
              result.writeCount++;
              outputFilename = path.join(outputDirectory, basename + "." + extension);
              return FsPromise.writeFile(outputFilename, text);
            } else {
              return Promise.resolve();
            }
          }));
        });
      }).then(function() {
        return result;
      })["catch"](function(e) {
        log.error("error compiling: " + sourceFile);
        throw e;
      });
    });
  };

  return FileCompiler;

})());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var ErrorWithInfo, FsPromise, ModuleResolver, Path, Promise, dashCase, defineModule, each, find, findSourceRootSync, log, merge, present, realRequire, ref, upperCamelCase, w,
  slice = [].slice;

ref = __webpack_require__(0), defineModule = ref.defineModule, Promise = ref.Promise, dashCase = ref.dashCase, upperCamelCase = ref.upperCamelCase, ErrorWithInfo = ref.ErrorWithInfo, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w;

FsPromise = __webpack_require__(2);

Path = __webpack_require__(3);

realRequire = eval('require');

findSourceRootSync = __webpack_require__(5).findSourceRootSync;

defineModule(module, ModuleResolver = (function() {
  var normalizeName;

  function ModuleResolver() {}

  normalizeName = upperCamelCase;

  ModuleResolver.getNpmPackageName = function(moduleName) {
    var absolutePath, name, normalizedModuleName;
    normalizedModuleName = upperCamelCase(moduleName);
    absolutePath = Path.dirname(realRequire.resolve(name = dashCase(normalizedModuleName)));
    return {
      requireString: name,
      absolutePath: absolutePath
    };
  };

  ModuleResolver.findModuleSync = function(moduleName, options) {
    var absolutePath, base, i, len, matchingName, mod, ref1, ref2, requireString, rest, sub;
    ref1 = (function() {
      var i, len, ref1, results;
      ref1 = moduleName.split("/");
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        mod = ref1[i];
        results.push(normalizeName(mod));
      }
      return results;
    })(), base = ref1[0], rest = 2 <= ref1.length ? slice.call(ref1, 1) : [];
    base = normalizeName(base);
    ref2 = ModuleResolver._findModuleBaseSync(base, options), requireString = ref2.requireString, absolutePath = ref2.absolutePath;
    for (i = 0, len = rest.length; i < len; i++) {
      sub = rest[i];
      if (matchingName = ModuleResolver._matchingNameInDirectorySync(sub, absolutePath)) {
        absolutePath = Path.join(absolutePath, matchingName);
        requireString = requireString + "/" + matchingName;
      } else {
        throw new ErrorWithInfo("Could not find pathed module", {
          lookingIn: absolutePath,
          require: requireString,
          lookingFor: sub,
          normalized: normalizeName(sub)
        });
      }
    }
    return {
      requireString: requireString,
      absolutePath: absolutePath
    };
  };

  ModuleResolver.findModule = function(moduleName, options) {
    return Promise.resolve(ModuleResolver.findModuleSync(moduleName, options));
  };

  ModuleResolver._findModuleBaseSync = function(moduleName, options) {
    var absolutePath, directory, matchingName, normalizedModuleName, requireString, shouldContinue, sourceDir, sourceFile, sourceFiles, sourceRoot;
    normalizedModuleName = upperCamelCase(moduleName);
    if (options) {
      sourceFile = options.sourceFile, sourceDir = options.sourceDir, sourceFiles = options.sourceFiles, sourceRoot = options.sourceRoot;
    }
    sourceFile || (sourceFile = sourceFiles != null ? sourceFiles[0] : void 0);
    if (sourceFile || sourceDir) {
      directory = sourceDir || (sourceDir = Path.resolve(Path.dirname(sourceFile)));
      sourceRoot || (sourceRoot = findSourceRootSync(sourceDir));
      sourceRoot = Path.resolve(sourceRoot);
    }
    absolutePath = null;
    shouldContinue = present(sourceRoot);
    while (shouldContinue) {
      if (matchingName = ModuleResolver._matchingNameInDirectorySync(normalizedModuleName, directory)) {
        absolutePath = Path.join(directory, matchingName);
        shouldContinue = false;
      } else if (directory === sourceRoot) {
        shouldContinue = false;
      } else {
        directory = Path.dirname(directory);
      }
    }
    if (absolutePath) {
      requireString = Path.relative(sourceDir, absolutePath);
      switch (requireString) {
        case "..":
          requireString = "../../" + (Path.basename(absolutePath));
          break;
        case ".":
          requireString = "../" + (Path.basename(absolutePath));
      }
      if (!requireString.match(/^\./)) {
        requireString = "./" + requireString;
      }
      return {
        requireString: requireString,
        absolutePath: absolutePath
      };
    } else {
      return ModuleResolver.getNpmPackageName(normalizedModuleName);
    }
  };

  ModuleResolver._matchingNameInDirectorySync = function(normalizedModuleName, directory) {
    var matchingName;
    matchingName = null;
    each(FsPromise.readdirSync(directory), function(name) {
      var basename;
      basename = name.split('.')[0];
      if (normalizedModuleName === normalizeName(basename)) {
        if (matchingName && matchingName !== basename) {
          throw new ErrorWithInfo("More than one matching module name with\na) different actual names (" + matchingName + " != " + basename + ") and\nb) the same normalized name (" + normalizedModuleName + ")", {
            directory: directory,
            firstMatch: matchingName,
            secondMatch: name,
            normalizedModuleName: normalizedModuleName
          });
        }
        return matchingName = basename;
      }
    });
    return matchingName;
  };

  return ModuleResolver;

})());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("art-class-system");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var CaffeineMc, Promise, colors, commander, compile, compiler, dashCase, displayError, e, each, escapeRegExp, file, fileToRun, filename, files, filesRead, filesWritten, formattedInspect, fsp, glob, isString, log, obj, output, path, present, prettier, realRequire, ref, serializer, verbose, version, versions;

colors = __webpack_require__(21);

glob = __webpack_require__(23);

fsp = __webpack_require__(2);

path = __webpack_require__(3);

__webpack_require__(20);

realRequire = eval('require');

CaffeineMc = __webpack_require__(17);

ref = Neptune.Art.StandardLib, log = ref.log, dashCase = ref.dashCase, escapeRegExp = ref.escapeRegExp, present = ref.present, isString = ref.isString, Promise = ref.Promise, formattedInspect = ref.formattedInspect, each = ref.each, escapeRegExp = ref.escapeRegExp;

version = CaffeineMc.version;

commander = __webpack_require__(22).version(version).usage('[options] <input files and directories>').option('-o, --output <directory>', "where to write output files").option('-c, --compile', 'compile files').option('-p, --prettier', 'apply "prettier" to any js output').option('-d, --debug', 'show debug info').option('-v, --verbose', 'show more output').option('--versions [compiler-npm-name]', "show caffeine-mc's version OR the specified caffeine-mc-compatible compiler's version").on("--help", function() {
  return console.log("An output directory is required if more than one input file is specified.\n\nDefault action, if a file is provided, is to execute it.");
}).parse(process.argv);

output = commander.output, compile = commander.compile, prettier = commander.prettier, verbose = commander.verbose, versions = commander.versions;

displayError = function(e) {
  if (verbose) {
    return log.error(e);
  } else if ((e.location != null) || (e.sourceFile != null) || e.message.match(/parse|expect/i)) {
    if (e) {
      return log(e.message.replace(/<HERE>/, "<HERE>".red));
    }
  } else {
    return log.error(e.stack.split("\n").slice(0, 30).join("\n").replace(new RegExp(escapeRegExp(process.cwd() + "/"), "g"), './').replace(new RegExp(escapeRegExp(path.dirname(process.cwd()) + "/"), "g"), '../'));
  }
};

if (compile) {
  files = commander.args;
  if (!output && files.length === 1) {
    filename = files[0];
    if (!fsp.statSync(filename).isDirectory()) {
      output = path.dirname(filename);
    }
  }
  if (files.length > 0 && output) {
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
    filesRead = 0;
    filesWritten = 0;
    each(files, function(file) {
      return serializer.then(function() {
        return CaffeineMc.compileFile(file, {
          outputDirectory: output,
          prettier: prettier
        }).then(function(arg) {
          var readCount, writeCount;
          readCount = arg.readCount, writeCount = arg.writeCount;
          if (verbose) {
            log("compiled: " + file.green);
          }
          filesRead += readCount;
          return filesWritten += writeCount;
        });
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
          filesRead: filesRead,
          filesWritten: filesWritten
        }
      });
    });
    serializer["catch"](displayError);
  } else {
    commander.outputHelp();
  }
} else if (commander.args.length === 1) {
  fileToRun = commander.args[0];
  __webpack_require__(13);
  file = path.resolve(fileToRun.match(/^(\/|\.)/) ? fileToRun : "./" + fileToRun);
  try {
    realRequire(file);
  } catch (error) {
    e = error;
    displayError(e);
  }
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
  commander.outputHelp();
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var CaffeineMc, Fs, ext, i, len, loadFile, log, realRequire, ref;

realRequire = eval('require');

CaffeineMc = realRequire('./');

Fs = realRequire("fs");

log = __webpack_require__(0).log;

loadFile = function(module, filename) {
  var answer, js;
  answer = CaffeineMc.compileFileSync(filename);
  js = answer.compiled.js;
  return module._compile(js, filename);
};

if (realRequire.extensions) {
  ref = CaffeineMc.fileExtensions;
  for (i = 0, len = ref.length; i < len; i++) {
    ext = ref[i];
    realRequire.extensions["." + ext] = loadFile;
  }
}

module.exports = CaffeineMc;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var _package;

module.exports = [
  __webpack_require__(4), __webpack_require__(9), __webpack_require__(10), {
    "package": _package = __webpack_require__(18),
    version: _package.version
  }
];


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var JavaScriptWrapper;

module.exports = JavaScriptWrapper = (function() {
  function JavaScriptWrapper() {}

  JavaScriptWrapper.compile = function(sourceCode, options) {
    return {
      compiled: {
        js: sourceCode
      }
    };
  };

  return JavaScriptWrapper;

})();


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var CaffeineMc, Compilers,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CaffeineMc = __webpack_require__(1);

module.exports = CaffeineMc.Compilers || CaffeineMc.addNamespace('Compilers', Compilers = (function(superClass) {
  extend(Compilers, superClass);

  function Compilers() {
    return Compilers.__super__.constructor.apply(this, arguments);
  }

  return Compilers;

})(Neptune.Base));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).includeInNamespace(__webpack_require__(14)).addModules({
  CaffeineMcParser: __webpack_require__(7),
  FileCompiler: __webpack_require__(9),
  Metacompiler: __webpack_require__(4),
  ModuleResolver: __webpack_require__(10),
  SourceRoots: __webpack_require__(5)
});

__webpack_require__(8);


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {
	"author": "Shane Brinkman-Davis Delamore, Imikimi LLC",
	"bin": {
		"caf": "./caf"
	},
	"dependencies": {
		"art-class-system": "^1.0.1",
		"art-standard-lib": "^1.1.0",
		"art-testbench": "^1.0.0",
		"babel-bridge": "^1.0.0",
		"case-sensitive-paths-webpack-plugin": "^1.1.4",
		"coffee-loader": "^0.7.2",
		"coffee-script": "^1.12.3",
		"colors": "^1.1.2",
		"commander": "^2.9.0",
		"css-loader": "^0.26.1",
		"fs-promise": "^0.5.0",
		"glob": "^7.0.3",
		"json-loader": "^0.5.4",
		"neptune-namespaces": "^1.9.1",
		"prettier": "^0.18.0",
		"script-loader": "^0.7.0",
		"style-loader": "^0.13.1",
		"webpack": "^2.2.1",
		"webpack-dev-server": "^2.3.0",
		"webpack-merge": "^3.0.0"
	},
	"description": "Select, configure and extend your to-JavaScript compiler, with arbitrary code, on a per file bases from within the file.",
	"license": "ISC",
	"name": "caffeine-mc",
	"scripts": {
		"build": "webpack --progress",
		"start": "webpack-dev-server --hot --inline --progress",
		"test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"
	},
	"version": "1.12.1"
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("babel-bridge");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("coffee-script/register");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("colors");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("prettier");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ })
/******/ ]);