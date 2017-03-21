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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
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

Neptune = __webpack_require__(20);

module.exports = Neptune.CaffeineMc || Neptune.addNamespace('CaffeineMc', CaffeineMc = (function(superClass) {
  extend(CaffeineMc, superClass);

  function CaffeineMc() {
    return CaffeineMc.__super__.constructor.apply(this, arguments);
  }

  return CaffeineMc;

})(Neptune.Base));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, FsPromise, Metacompiler, SourceRoots, array, defineModule, each, find, log, merge, path, present, ref, w,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(0), defineModule = ref.defineModule, array = ref.array, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w;

BaseClass = __webpack_require__(6).BaseClass;

FsPromise = __webpack_require__(7);

path = __webpack_require__(4);

Metacompiler = __webpack_require__(5);

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
    if (sourceRoot == null) {
      sourceRoot = process.cwd();
    }
    if ((res = SourceRoots.caffeineInits[sourceRoot]) != null) {
      return Promise.resolve(res);
    } else {
      return FsPromise.exists(sourceFile = path.join(sourceRoot, SourceRoots.caffeineInitFileName)).then(function(exists) {
        var contentsPromise;
        contentsPromise = exists ? FsPromise.readFile(sourceFile).then(function(contents) {
          return contents = contents.toString();
        }) : Promise.resolve(false);
        return contentsPromise.then(function(contents) {
          var metacompiler, result;
          metacompiler = new Metacompiler;
          return SourceRoots.caffeineInits[sourceRoot] = {
            compiler: metacompiler,
            config: (result = contents && metacompiler.compile(contents, {
              sourceFile: sourceFile,
              sourceRoot: sourceRoot
            })) ? evalCapturingModuleExports(result.compiled.js) : {}
          };
        });
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var BaseClass, CaffeineMc, CaffeineMcParser, Compilers, Metacompiler, dashCase, evalInContext, formattedInspect, isFunction, isString, log, lowerCamelCase, merge, present, realRequire, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Compilers = __webpack_require__(9);

CaffeineMcParser = __webpack_require__(8);

evalInContext = (CaffeineMc = __webpack_require__(1)).evalInContext;

realRequire = eval('require');

ref = __webpack_require__(0), dashCase = ref.dashCase, formattedInspect = ref.formattedInspect, present = ref.present, isFunction = ref.isFunction, log = ref.log, isString = ref.isString, lowerCamelCase = ref.lowerCamelCase, upperCamelCase = ref.upperCamelCase, merge = ref.merge;

BaseClass = __webpack_require__(6).BaseClass;

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

  Metacompiler.getter({
    compilerName: function() {
      var base, base1;
      return (typeof (base = this.compiler).getClassName === "function" ? base.getClassName() : void 0) || (typeof (base1 = this.compiler).getName === "function" ? base1.getName() : void 0) || this._compilerName || 'unknown-compiler';
    }
  });

  Metacompiler.prototype.getCompiler = function(compilerName, options) {
    var absolutePath, base, compiler, out;
    if (!present(compilerName)) {
      return this.compiler;
    }
    if (compiler = Compilers[upperCamelCase(compilerName)]) {
      return compiler;
    }
    this._compilerName = compilerName;
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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("art-class-system");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs-promise");

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16).addModules({
  JavaScript: __webpack_require__(15)
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var CaffeineMc, FileCompiler, FsPromise, array, caffeineInitFileName, defineModule, each, find, findSourceRoot, findSourceRootSync, getCaffeineInit, getCaffeineInitSync, log, merge, path, present, ref, ref1, w;

ref = __webpack_require__(0), defineModule = ref.defineModule, array = ref.array, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w;

FsPromise = __webpack_require__(7);

path = __webpack_require__(4);

CaffeineMc = __webpack_require__(1);

ref1 = __webpack_require__(2), getCaffeineInit = ref1.getCaffeineInit, caffeineInitFileName = ref1.caffeineInitFileName, findSourceRoot = ref1.findSourceRoot, getCaffeineInitSync = ref1.getCaffeineInitSync, findSourceRootSync = ref1.findSourceRootSync;

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
                text = __webpack_require__(21).format(text);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var ErrorWithInfo, FsPromise, ModuleResolver, Path, Promise, dashCase, defineModule, each, find, findSourceRootSync, log, merge, present, realRequire, ref, upperCamelCase, w,
  slice = [].slice;

ref = __webpack_require__(0), defineModule = ref.defineModule, Promise = ref.Promise, dashCase = ref.dashCase, upperCamelCase = ref.upperCamelCase, ErrorWithInfo = ref.ErrorWithInfo, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w;

FsPromise = __webpack_require__(7);

Path = __webpack_require__(4);

realRequire = eval('require');

findSourceRootSync = __webpack_require__(2).findSourceRootSync;

defineModule(module, ModuleResolver = (function() {
  var normalizeName;

  function ModuleResolver() {}

  normalizeName = upperCamelCase;

  ModuleResolver.getNpmPackageName = function(moduleName) {
    var absolutePath, name, normalizedModuleName;
    normalizedModuleName = upperCamelCase(moduleName);
    try {
      absolutePath = Path.dirname(realRequire.resolve(name = dashCase(moduleName)));
    } catch (error) {
      try {
        absolutePath = Path.dirname(realRequire.resolve(name = moduleName));
      } catch (error) {
        throw new Error("Could not find module: " + moduleName + " or " + (dashCase(moduleName)));
      }
    }
    return {
      requireString: name,
      absolutePath: absolutePath
    };
  };

  ModuleResolver.findModuleSync = function(moduleName, options) {
    var absolutePath, base, denormalizedBase, i, len, matchingName, mod, ref1, ref2, requireString, rest, sub;
    ref1 = (function() {
      var i, len, ref1, ref2, results;
      ref2 = (ref1 = moduleName.split("/"), denormalizedBase = ref1[0], ref1);
      results = [];
      for (i = 0, len = ref2.length; i < len; i++) {
        mod = ref2[i];
        results.push(normalizeName(mod));
      }
      return results;
    })(), base = ref1[0], rest = 2 <= ref1.length ? slice.call(ref1, 1) : [];
    ref2 = ModuleResolver._findModuleBaseSync(denormalizedBase, options), requireString = ref2.requireString, absolutePath = ref2.absolutePath;
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
      return ModuleResolver.getNpmPackageName(moduleName);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (typeof Neptune !== "undefined" && Neptune !== null ? Neptune.CaffeineMc : void 0) || __webpack_require__(17);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var CafRepl, CaffeineMc, defineModule, displayError, evalInContext, getCaffeineInit, log, ref, ref1, repl;

ref = __webpack_require__(0), defineModule = ref.defineModule, log = ref.log;

getCaffeineInit = __webpack_require__(2).getCaffeineInit;

ref1 = CaffeineMc = __webpack_require__(1), evalInContext = ref1.evalInContext, displayError = ref1.displayError;

repl = __webpack_require__(22);

defineModule(module, CafRepl = (function() {
  function CafRepl() {}

  CafRepl.start = function(parser) {
    return getCaffeineInit().then(function(init) {
      var cafRepl, compiler, config, getPrompt;
      compiler = init.compiler, config = init.config;
      getPrompt = function() {
        return "caf:" + compiler.compilerName + "> ";
      };
      return cafRepl = repl.start({
        prompt: getPrompt(),
        "eval": function(command, context, filename, callback) {
          var e, js, result;
          try {
            js = compiler.compile(command).compiled.js;
            try {
              result = evalInContext(js, context);
              cafRepl.setPrompt(getPrompt());
              return callback(null, result);
            } catch (error1) {
              e = error1;
              return callback(e);
            }
          } catch (error1) {
            e = error1;
            displayError(e);
            return callback();
          }
        }
      });
    })["catch"](function(error) {
      return log.error({
        replError: error
      });
    });
  };

  return CafRepl;

})());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var _package, escapeRegExp, log, path, ref;

ref = __webpack_require__(0), log = ref.log, escapeRegExp = ref.escapeRegExp;

path = __webpack_require__(4);

module.exports = [
  __webpack_require__(5), __webpack_require__(10), __webpack_require__(11), {
    "package": _package = __webpack_require__(18),
    version: _package.version,
    displayError: function(e, options) {
      var verbose;
      if (options == null) {
        options = {};
      }
      verbose = options.verbose;
      if (verbose) {
        return log.error(e);
      } else if ((e.location != null) || (e.sourceFile != null) || e.message.match(/parse|expect/i)) {
        if (e) {
          return log(e.message.replace(/<HERE>/, "<HERE>".red));
        }
      } else {
        return log.error(e.stack.split("\n").slice(0, 30).join("\n").replace(new RegExp(escapeRegExp(process.cwd() + "/"), "g"), './').replace(new RegExp(escapeRegExp(path.dirname(process.cwd()) + "/"), "g"), '../'));
      }
    },
    evalInContext: function(js, context) {
      return (function() {
        return eval(js);
      }).call(context);
    }
  }
];


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var JavaScript,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = JavaScript = (function(superClass) {
  extend(JavaScript, superClass);

  function JavaScript() {
    return JavaScript.__super__.constructor.apply(this, arguments);
  }

  JavaScript.compile = function(sourceCode, options) {
    return {
      compiled: {
        js: sourceCode
      }
    };
  };

  return JavaScript;

})(__webpack_require__(6).BaseClass);


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
  CaffeineMcParser: __webpack_require__(8),
  CafRepl: __webpack_require__(13),
  FileCompiler: __webpack_require__(10),
  Metacompiler: __webpack_require__(5),
  ModuleResolver: __webpack_require__(11),
  SourceRoots: __webpack_require__(2)
});

__webpack_require__(9);


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
	"version": "1.14.0"
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("babel-bridge");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("prettier");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("repl");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ })
/******/ ]);