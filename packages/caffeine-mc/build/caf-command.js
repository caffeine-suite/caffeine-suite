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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib");

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var CaffeineMc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(32)).addNamespace('CaffeineMc', CaffeineMc = (function(superClass) {
  extend(CaffeineMc, superClass);

  function CaffeineMc() {
    return CaffeineMc.__super__.constructor.apply(this, arguments);
  }

  CaffeineMc.version = __webpack_require__(25).version;

  return CaffeineMc;

})(Neptune.PackageNamespace));

__webpack_require__(12);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("art-class-system");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, Metacompiler, SourceRoots, array, defineModule, each, find, fs, log, merge, path, present, ref, w,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(0), defineModule = ref.defineModule, array = ref.array, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w;

BaseClass = __webpack_require__(5).BaseClass;

fs = __webpack_require__(4);

path = __webpack_require__(2);

Metacompiler = __webpack_require__(7);

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
      return fs.exists(sourceFile = path.join(sourceRoot, SourceRoots.caffeineInitFileName)).then(function(exists) {
        var contentsPromise;
        contentsPromise = exists ? fs.readFile(sourceFile).then(function(contents) {
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
      if (fs.existsSync(sourceFile = path.join(sourceRoot, SourceRoots.caffeineInitFileName))) {
        contents = fs.readFileSync(sourceFile).toString();
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
    return fs.stat(directory).then(function(stat) {
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
    stat = fs.statSync(directory);
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
      return fs.exists(path.join(directory, file));
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
      return fs.existsSync(path.join(directory, file));
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var BaseClass, CaffeineMc, CaffeineMcParser, CompileCache, Compilers, Metacompiler, dashCase, formattedInspect, isFunction, isString, log, lowerCamelCase, merge, objectWithout, present, realRequire, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Compilers = __webpack_require__(11);

CaffeineMcParser = __webpack_require__(9);

CaffeineMc = __webpack_require__(3);

CompileCache = __webpack_require__(10);

realRequire = eval('require');

ref = __webpack_require__(0), dashCase = ref.dashCase, formattedInspect = ref.formattedInspect, present = ref.present, isFunction = ref.isFunction, log = ref.log, isString = ref.isString, lowerCamelCase = ref.lowerCamelCase, upperCamelCase = ref.upperCamelCase, merge = ref.merge, objectWithout = ref.objectWithout;

BaseClass = __webpack_require__(5).BaseClass;

module.exports = Metacompiler = (function(superClass) {
  extend(Metacompiler, superClass);

  Metacompiler.compile = function(code, options) {
    if (options == null) {
      options = {};
    }
    return new Metacompiler().compile(code, options);
  };

  Metacompiler.getter("compiler lastMetacompilerResult", {
    current: function() {
      return this.compiler;
    }
  });

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
    this._compiler = __webpack_require__(27);
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

  Metacompiler.prototype.compile = function(code, options) {
    var base, cacheInfo, cachedCompile, compilerName, metaCode, name, ref1, version;
    if (options == null) {
      options = {};
    }
    ref1 = this._metaParser.parse(code.toString()), compilerName = ref1.compilerName, metaCode = ref1.metaCode, code = ref1.code;
    if (compilerName) {
      this._lastMetacompilerResult = this.setCompiler(compilerName, options);
    }
    if (options.cache && (version = this.compiler.version) && (name = typeof (base = this.compiler).getName === "function" ? base.getName() : void 0)) {
      options = objectWithout(options, "cache");
      cacheInfo = {
        compiler: {
          name: name,
          version: version
        },
        source: code,
        sourceFile: options.sourceFile
      };
      if (options.prettier) {
        cacheInfo.prettier = true;
      }
      if (cachedCompile = CompileCache.fetch(cacheInfo)) {
        return cachedCompile;
      } else {
        return CompileCache.cache(merge(cacheInfo, this._compileInternal(metaCode, code, options)));
      }
    } else {
      return this._compileInternal(metaCode, code, options);
    }
  };

  Metacompiler.prototype._compileInternal = function(metaCode, code, options) {
    var e, out, result;
    out = this.normalizeCompilerResult(metaCode ? (result = this.normalizeCompilerResult(this.compiler.compile(metaCode)), this._lastMetacompilerResult = CaffeineMc.evalInContext(result.compiled.js, this), this.compile(code, options)) : this.compiler.compile(code, options));
    if (options.prettier) {
      try {
        if (out.compiled.js != null) {
          out.compiled.js = __webpack_require__(19).format(out.compiled.js);
        }
        out.prettier = true;
      } catch (error) {
        e = error;
        log(e.message);
        throw e;
      }
    }
    return out;
  };

  Metacompiler.getter({
    compilerName: function() {
      var base, base1;
      return (typeof (base = this.compiler).getClassName === "function" ? base.getClassName() : void 0) || (typeof (base1 = this.compiler).getName === "function" ? base1.getName() : void 0) || this._compilerName || 'unknown-compiler';
    }
  });

  Metacompiler.prototype.getCompiler = function(compilerName, options) {
    var absolutePath, base, compiler, out, ucCompilerName;
    if (compilerName.toLocaleLowerCase() === "javascript") {
      compilerName = "JavaScript";
    }
    if (!present(compilerName)) {
      return this.compiler;
    }
    if (compiler = Compilers[ucCompilerName = upperCamelCase(compilerName)]) {
      return compiler;
    }
    this._compilerName = compilerName;
    absolutePath = CaffeineMc.findModuleSync(compilerName, options).absolutePath;
    try {
      out = (base = this.compilers)[absolutePath] || (base[absolutePath] = realRequire(absolutePath));
      if (!isFunction(out.compile)) {
        throw new Error;
      }
    } catch (error) {
      throw new Error("CaffeineMc: compiler not found for: " + compilerName + " (normalized: " + ucCompilerName + ", require: " + absolutePath + ")");
    }
    return out;
  };

  return Metacompiler;

})(BaseClass);


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("colors");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var CaffeineEight, CaffeineMcParser, isFunction, isString, log, lowerCamelCase, merge, present, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(0), present = ref.present, isFunction = ref.isFunction, log = ref.log, isString = ref.isString, lowerCamelCase = ref.lowerCamelCase, upperCamelCase = ref.upperCamelCase, merge = ref.merge;

CaffeineEight = __webpack_require__(26);

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
    block: CaffeineEight.Extensions.IndentBlocks.getPropsToSubparseBlock({
      rule: "toEof"
    })
  });

  return CaffeineMcParser;

})(CaffeineEight.Parser);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, CompileCache, array, crypto, defineModule, formattedInspect, fs, glob, isString, log, merge, os, path, randomBase62Character, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(0), array = ref.array, merge = ref.merge, formattedInspect = ref.formattedInspect, log = ref.log, defineModule = ref.defineModule, isString = ref.isString, upperCamelCase = ref.upperCamelCase, randomBase62Character = ref.randomBase62Character;

BaseClass = __webpack_require__(5).BaseClass;

__webpack_require__(8);

fs = __webpack_require__(4);

glob = __webpack_require__(20);

crypto = __webpack_require__(30);

os = __webpack_require__(33);

path = __webpack_require__(2);

defineModule(module, CompileCache = (function(superClass) {
  extend(CompileCache, superClass);

  function CompileCache() {
    return CompileCache.__super__.constructor.apply(this, arguments);
  }

  CompileCache.compileCacheFileNameRoot = "CaffineMcCompileCache";

  CompileCache.classGetter({
    compileCacheFilePathRoot: function() {
      return this._compileCacheFilePathRoot || (this._compileCacheFilePathRoot = path.join(os.tmpDir(), this.compileCacheFileNameRoot));
    }
  });

  CompileCache.getCompilerSignature = function(compiler) {
    var name, version;
    version = compiler.version;
    if (isString(version) && (name = (typeof compiler.getName === "function" ? compiler.getName() : void 0) || compiler.name)) {
      return name + "-" + version;
    }
  };

  CompileCache.getFileName = function(arg) {
    var basename, compiler, compilerSignature, hashed, prettier, source, sourceFile;
    compiler = arg.compiler, compilerSignature = arg.compilerSignature, source = arg.source, sourceFile = arg.sourceFile, prettier = arg.prettier;
    compilerSignature || (compilerSignature = this.getCompilerSignature(compiler));
    if (!(compilerSignature && sourceFile && source)) {
      throw new Error("expecting compilerSignature, source and sourceFile: " + formattedInspect({
        source: source,
        sourceFile: sourceFile,
        compilerSignature: compilerSignature
      }));
    }
    hashed = crypto.createHmac('sha256', "no need for a real secret").update(source).digest('base64').split("=")[0].replace(/[\/+=]/g, "_");
    basename = path.basename(sourceFile).split('.')[0];
    return this.compileCacheFilePathRoot + "_" + compilerSignature + "_" + (upperCamelCase(basename)) + "_" + hashed + (prettier ? '_prettier' : '') + ".json";
  };

  CompileCache.cache = function(compileResultAndInfo) {
    var cacheFileContents, compiled, compiler, compilerSignature, fileName, prettier, source, sourceFile;
    compiler = compileResultAndInfo.compiler, source = compileResultAndInfo.source, sourceFile = compileResultAndInfo.sourceFile, compiled = compileResultAndInfo.compiled, prettier = compileResultAndInfo.prettier;
    if (compilerSignature = this.getCompilerSignature(compiler)) {
      fileName = this.getFileName({
        compilerSignature: compilerSignature,
        source: source,
        sourceFile: sourceFile,
        prettier: prettier
      });
      cacheFileContents = JSON.stringify({
        source: source,
        compiled: compiled
      });
      fs.writeFileSync(fileName, cacheFileContents);
    }
    return compileResultAndInfo;
  };

  CompileCache.fetch = function(arg) {
    var cacheFileContents, compiler, compilerSignature, fileName, parsedContents, prettier, source, sourceFile;
    compiler = arg.compiler, source = arg.source, sourceFile = arg.sourceFile, prettier = arg.prettier;
    if (compilerSignature = this.getCompilerSignature(compiler)) {
      fileName = this.getFileName({
        compilerSignature: compilerSignature,
        source: source,
        sourceFile: sourceFile,
        prettier: prettier
      });
      if (fs.existsSync(fileName)) {
        cacheFileContents = fs.readFileSync(fileName);
        parsedContents = (function() {
          try {
            return JSON.parse(cacheFileContents);
          } catch (error) {}
        })();
        if ((parsedContents != null ? parsedContents.source : void 0) === source) {
          return merge(parsedContents, {
            fromCache: true
          });
        }
      }
    }
  };

  CompileCache.reset = function() {
    return glob(this.compileCacheFilePathRoot + "*").then(function(list) {
      return Promise.all(array(list, function(item) {
        return fs.unlink(item).then(function() {
          return log("cache-reset: ".gray + item.green + " (deleted)".gray);
        });
      }));
    });
  };

  return CompileCache;

})(BaseClass));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);

module.exports.addModules({
  JavaScript: __webpack_require__(24)
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Compilers,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(3)).addNamespace('Compilers', Compilers = (function(superClass) {
  extend(Compilers, superClass);

  function Compilers() {
    return Compilers.__super__.constructor.apply(this, arguments);
  }

  return Compilers;

})(Neptune.PackageNamespace));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var CaffeineMc, FileCompiler, array, caffeineInitFileName, defineModule, each, find, findSourceRoot, findSourceRootSync, fs, getCaffeineInit, getCaffeineInitSync, log, merge, path, present, ref, ref1, w;

ref = __webpack_require__(0), defineModule = ref.defineModule, array = ref.array, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w;

fs = __webpack_require__(4);

path = __webpack_require__(2);

CaffeineMc = __webpack_require__(3);

ref1 = __webpack_require__(6), getCaffeineInit = ref1.getCaffeineInit, caffeineInitFileName = ref1.caffeineInitFileName, findSourceRoot = ref1.findSourceRoot, getCaffeineInitSync = ref1.getCaffeineInitSync, findSourceRootSync = ref1.findSourceRootSync;

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
    source = options.source;
    caffeineInit = getCaffeineInitSync(sourceRoot = findSourceRootSync(sourceFile));
    source || (source = (fs.readFileSync(sourceFile)).toString());
    return CaffeineMc.compile(source, merge(options, {
      sourceFile: sourceFile,
      sourceRoot: sourceRoot
    }), caffeineInit);
  };

  FileCompiler.compileFile = function(sourceFile, options) {
    var outputDirectory, source;
    if (options == null) {
      options = {};
    }
    outputDirectory = options.outputDirectory, source = options.source;
    return findSourceRoot(sourceFile).then(function(sourceRoot) {
      var result;
      result = {
        readCount: 0,
        writeCount: 0,
        outputFiles: [],
        output: null
      };
      return fs.exists(sourceFile).then(function(exists) {
        if (!exists) {
          throw new Error("sourceFile not found: " + sourceFile);
        }
        return getCaffeineInit(sourceRoot);
      }).then(function(arg) {
        var compiler, config, p;
        compiler = arg.compiler, config = arg.config;
        p = source ? Promise.resolve(source) : fs.readFile(sourceFile);
        return p.then(function(source) {
          source = source.toString();
          result.output = compiler.compile(source, merge(config, options, {
            sourceFile: sourceFile,
            sourceRoot: sourceRoot
          }));
          result.readCount++;
          return Promise.all(array(result.output.compiled, function(text, extension) {
            var basename, outputFilename;
            basename = path.basename(sourceFile, path.extname(sourceFile));
            result.outputFiles.push(outputFilename);
            if (outputDirectory) {
              result.writeCount++;
              outputFilename = path.join(outputDirectory, basename + "." + extension);
              return fs.writeFile(outputFilename, text);
            } else {
              return Promise.resolve(text);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  highlight: function(js) {
    var cardinal, chalk, functionDeclarationColor, itentifierColor, keywordColor, normalizeChalkColor, operatorColor, options;
    chalk = __webpack_require__(29);
    cardinal = __webpack_require__(28);
    normalizeChalkColor = function(clk) {
      return function(str) {
        return clk(str);
      };
    };
    keywordColor = normalizeChalkColor(chalk.yellow);
    operatorColor = normalizeChalkColor(chalk.magenta);
    functionDeclarationColor = normalizeChalkColor(chalk.blue);
    itentifierColor = normalizeChalkColor(chalk.black);
    options = {
      linenos: true,
      theme: {
        Identifier: {
          'undefined': keywordColor,
          'null': keywordColor,
          _default: function(s, info) {
            var nextToken, prevToken;
            prevToken = info.tokens[info.tokenIndex - 1];
            nextToken = info.tokens[info.tokenIndex + 1];
            if ((nextToken != null ? nextToken.type : void 0) === 'Punctuator' && (nextToken != null ? nextToken.value : void 0) === '(' && (prevToken != null ? prevToken.type : void 0) === 'Keyword' && (prevToken != null ? prevToken.value : void 0) === 'function') {
              return functionDeclarationColor(s);
            } else if ((nextToken != null ? nextToken.value : void 0) === ":") {
              return functionDeclarationColor(s);
            } else {
              return itentifierColor(s);
            }
          }
        },
        Line: {
          _default: normalizeChalkColor(chalk.grey)
        },
        Block: {
          _default: normalizeChalkColor(chalk.grey)
        },
        Boolean: {
          _default: keywordColor
        },
        Null: {
          _default: keywordColor
        },
        Numeric: {
          _default: normalizeChalkColor(chalk.red)
        },
        String: {
          _default: normalizeChalkColor(chalk.green)
        },
        Keyword: {
          _default: keywordColor
        },
        Punctuator: {
          _default: operatorColor
        }
      }
    };
    return cardinal.highlight(js, options);
  }
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var ErrorWithInfo, ModuleResolver, Path, Promise, dashCase, defineModule, each, find, findSourceRootSync, log, merge, peek, present, readdirSync, realDirReader, realRequire, ref, ref1, statSync, upperCamelCase, w,
  slice = [].slice;

ref = __webpack_require__(0), defineModule = ref.defineModule, peek = ref.peek, Promise = ref.Promise, dashCase = ref.dashCase, upperCamelCase = ref.upperCamelCase, ErrorWithInfo = ref.ErrorWithInfo, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w;

Path = __webpack_require__(2);

ref1 = __webpack_require__(4), statSync = ref1.statSync, readdirSync = ref1.readdirSync;

realDirReader = {
  isDir: function(entity) {
    return statSync(entity).isDirectory();
  },
  read: readdirSync,
  resolve: Path.resolve
};

realRequire = eval('require');

findSourceRootSync = __webpack_require__(6).findSourceRootSync;

defineModule(module, ModuleResolver = (function() {
  var getMatchingName, normalizeName;

  function ModuleResolver() {}

  normalizeName = upperCamelCase;


  /*
  IN:
    moduleBaseName: the string before the first '/'
    modulePathArray: every other sub-string, split by '/'
      This is only used to determine if there is addutional pathing
      that must be resolved. It makes a difference what the
      require path looks like.
   */

  ModuleResolver.getNpmPackageName = function(moduleBaseName, modulePathArray) {
    var absolutePath, name, normalizedModuleName, requireString;
    normalizedModuleName = upperCamelCase(moduleBaseName);
    try {
      absolutePath = Path.dirname(realRequire.resolve(name = dashCase(moduleBaseName)));
    } catch (error) {
      try {
        absolutePath = Path.dirname(realRequire.resolve(name = moduleBaseName));
      } catch (error) {
        throw new Error("Could not find module: " + moduleBaseName + " or " + (dashCase(moduleBaseName)));
      }
    }
    requireString = modulePathArray.length > 0 ? Path.join(name, absolutePath.slice((absolutePath.lastIndexOf(name)) + name.length)) : name;
    return {
      requireString: requireString,
      absolutePath: absolutePath
    };
  };

  ModuleResolver.findModuleSync = function(moduleName, options) {
    var absolutePath, base, denormalizedBase, dirReader, j, len, matchingName, mod, modulePathArray, out, ref2, ref3, requireString, sub;
    dirReader = options.dirReader || (options.dirReader = realDirReader);
    ref2 = (function() {
      var j, len, ref2, ref3, results;
      ref3 = (ref2 = moduleName.split("/"), denormalizedBase = ref2[0], ref2);
      results = [];
      for (j = 0, len = ref3.length; j < len; j++) {
        mod = ref3[j];
        out = normalizeName(mod);
        results.push(out);
      }
      return results;
    })(), base = ref2[0], modulePathArray = 2 <= ref2.length ? slice.call(ref2, 1) : [];
    ref3 = ModuleResolver._findModuleBaseSync(denormalizedBase, modulePathArray, options), requireString = ref3.requireString, absolutePath = ref3.absolutePath;
    for (j = 0, len = modulePathArray.length; j < len; j++) {
      sub = modulePathArray[j];
      if (matchingName = ModuleResolver._matchingNameInDirectorySync(sub, absolutePath, options)) {
        absolutePath = Path.join(absolutePath, matchingName);
        requireString = requireString + "/" + matchingName;
      } else {
        throw new ErrorWithInfo("Could not find pathed module", {
          npmName: requireString,
          lookingIn: absolutePath,
          lookingFor: sub,
          normalized: normalizeName(sub),
          dirItems: dirReader.read(absolutePath)
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

  ModuleResolver._findModuleBaseSync = function(moduleBaseName, modulePathArray, options) {
    var absolutePath, dirReader, directory, matchingName, normalizedModuleName, requireString, shouldContinue, sourceDir, sourceFile, sourceFiles, sourceRoot;
    dirReader = options.dirReader;
    normalizedModuleName = upperCamelCase(moduleBaseName);
    if (options) {
      sourceFile = options.sourceFile, sourceDir = options.sourceDir, sourceFiles = options.sourceFiles, sourceRoot = options.sourceRoot;
    }
    sourceFile || (sourceFile = sourceFiles != null ? sourceFiles[0] : void 0);
    if (sourceFile || sourceDir) {
      directory = sourceDir = dirReader.resolve(sourceDir || Path.dirname(sourceFile));
      sourceRoot || (sourceRoot = findSourceRootSync(sourceDir));
      sourceRoot = sourceRoot && dirReader.resolve(sourceRoot);
    }
    absolutePath = null;
    shouldContinue = present(sourceRoot);
    while (shouldContinue) {
      if (matchingName = ModuleResolver._matchingNameInDirectorySync(normalizedModuleName, directory, options)) {
        absolutePath = Path.join(directory, matchingName);
        shouldContinue = false;
      } else if (directory === sourceRoot) {
        if (normalizedModuleName === normalizeName(peek(sourceRoot.split("/")))) {
          absolutePath = sourceRoot;
        }
        shouldContinue = false;
      } else {
        directory = Path.dirname(directory);
      }
    }
    if (absolutePath) {
      requireString = Path.relative(sourceDir, absolutePath);
      switch (requireString) {
        case "..":
        case ".":
          requireString = requireString + "/";
      }
      if (!requireString.match(/^\./)) {
        requireString = "./" + requireString;
      }
      return {
        requireString: requireString,
        absolutePath: absolutePath
      };
    } else {
      return ModuleResolver.getNpmPackageName(moduleBaseName, modulePathArray);
    }
  };

  ModuleResolver.getMatchingName = getMatchingName = function(normalizedModuleName, name, isDir) {
    var foundLegalStop, i, index, j, k, len, len1, normalName, offset, part, ref2, ref3, stop, stops;
    if (isDir) {
      ref2 = name.split('.');
      for (j = 0, len = ref2.length; j < len; j++) {
        part = ref2[j];
        if (normalizedModuleName === normalizeName(part)) {
          return name;
        }
      }
      false;
    } else if (0 === (index = (normalName = normalizeName(name)).indexOf(normalizedModuleName))) {
      foundLegalStop = false;
      offset = 0;
      ref3 = stops = name.split('.');
      for (i = k = 0, len1 = ref3.length; k < len1; i = ++k) {
        stop = ref3[i];
        stop = upperCamelCase(stop);
        offset += stop.length;
        if (normalizedModuleName.length === offset) {
          return stops.slice(0, i + 1).join('.');
        }
      }
    }
    return false;
  };

  ModuleResolver._matchingNameInDirectorySync = function(normalizedModuleName, directory, options) {
    var dirReader, matchingName;
    dirReader = options.dirReader;
    matchingName = null;
    each(dirReader.read(directory), function(name) {
      var newMatchingName;
      if (newMatchingName = getMatchingName(normalizedModuleName, name, dirReader.isDir(Path.join(directory, name)))) {
        if (matchingName && matchingName !== newMatchingName) {
          throw new ErrorWithInfo("More than one matching module name with\na) different actual base-names (" + matchingName + " != " + newMatchingName + ") and\nb) for the same normalized name (" + normalizedModuleName + ")", {
            directory: directory,
            firstMatch: matchingName,
            secondMatch: newMatchingName,
            normalizedModuleName: normalizedModuleName
          });
        }
        return matchingName = newMatchingName;
      }
    });
    return matchingName;
  };

  return ModuleResolver;

})());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var CaffeineMc, Register, defineModule, log, realRequire, ref;

ref = __webpack_require__(0), defineModule = ref.defineModule, log = ref.log;

realRequire = eval('require');

CaffeineMc = __webpack_require__(3);

defineModule(module, Register = (function() {
  function Register() {}

  Register.register = function() {
    var base, ext, i, len, name, ref1;
    if (!realRequire.extensions) {
      throw new Error("please update NODE.js");
    }
    ref1 = CaffeineMc.fileExtensions;
    for (i = 0, len = ref1.length; i < len; i++) {
      ext = ref1[i];
      (base = realRequire.extensions)[name = "." + ext] || (base[name] = function(module, filename) {
        var answer, error;
        try {
          answer = CaffeineMc.compileFileSync(filename);
          return module._compile(answer.compiled.js, filename);
        } catch (error1) {
          error = error1;
          CaffeineMc.displayError(error);
          return process.exit(1);
        }
      });
    }
    return CaffeineMc;
  };

  return Register;

})());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, CaffeineMc, ErrorWithInfo, Promise, Run, array, defineModule, fileExists, find, formattedInspect, fs, isString, log, merge, path, randomBase62Character, realRequire, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(0), array = ref.array, log = ref.log, ErrorWithInfo = ref.ErrorWithInfo, find = ref.find, Promise = ref.Promise, merge = ref.merge, formattedInspect = ref.formattedInspect, log = ref.log, defineModule = ref.defineModule, isString = ref.isString, upperCamelCase = ref.upperCamelCase, randomBase62Character = ref.randomBase62Character;

BaseClass = __webpack_require__(5).BaseClass;

fs = __webpack_require__(4);

path = __webpack_require__(2);

CaffeineMc = __webpack_require__(3);

realRequire = eval('require');

fileExists = function(filename) {
  return fs.existsSync(filename) && filename;
};

defineModule(module, Run = (function(superClass) {
  extend(Run, superClass);

  function Run() {
    return Run.__super__.constructor.apply(this, arguments);
  }

  Run._resolveSourceFile = function(options) {
    var color, e, found, sourceFile;
    sourceFile = options.sourceFile, color = options.color;
    return merge(options, {
      sourceFile: (function() {
        if (fs.existsSync(sourceFile)) {
          return sourceFile;
        } else if ((found = find(realRequire.extensions, function(v, k) {
          return fileExists("" + sourceFile + k);
        }))) {
          return found;
        } else {
          e = new Error("No matching file found: " + (formattedInspect({
            sourceFile: sourceFile,
            extensions: Object.keys(realRequire.extensions).join(' ')
          })));
          e.stack = color ? e.message.red : e.message;
          throw e;
        }
      })()
    });
  };

  Run.runFile = function(sourceFile, options) {
    Run.setupNodeForRun(Run._resolveSourceFile(options = merge(options, {
      sourceFile: sourceFile
    })));
    return realRequire(realRequire.main.filename);
  };


  /*
  Do all the things NODE needs to make it look like
  we ran the file like "> node souceFile"
   */

  Run.runJs = function(js, options) {
    var main;
    if (options == null) {
      options = {};
    }
    Run.setupNodeForRun(options);
    main = realRequire.main;
    return main._compile(js, main.filename);
  };

  Run.setupNodeForRun = function(options) {
    var main, sourceFile;
    sourceFile = options.sourceFile;
    main = realRequire.main;
    main.filename = process.argv[1] = sourceFile ? fs.realpathSync(sourceFile) : '<anonymous>';
    main.moduleCache && (main.moduleCache = {});
    return main.paths = realRequire('module')._nodeModulePaths(fs.realpathSync(path.dirname(sourceFile || "./anonymous")));
  };

  return Run;

})(BaseClass));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var Tools, defineModule, escapeRegExp, log, path, ref, vm;

ref = __webpack_require__(0), log = ref.log, escapeRegExp = ref.escapeRegExp, defineModule = ref.defineModule;

path = __webpack_require__(2);

vm = __webpack_require__(35);

defineModule(module, Tools = (function() {
  function Tools() {}

  Tools.fileExtensions = ["caf", "caffeine"];

  Tools.fileIsCaffeine = function(filename) {
    return /\.(caf|caffeine)$/.test(filename);
  };

  Tools.runInContext = function(js, context, filename) {
    if (context === global) {
      return vm.runInThisContext(js, filename);
    } else {
      return vm.runInContext(js, context, filename);
    }
  };

  Tools.evalInContext = function(js, context) {
    var e;
    try {
      return (function() {
        return eval(js);
      }).call(context);
    } catch (error) {
      e = error;
      console.error("<---> evalInContext: error: js:");
      console.error(js);
      console.error("<--->");
      throw e;
    }
  };

  Tools.displayError = function(e, options) {
    var verbose;
    if (options == null) {
      options = {};
    }
    __webpack_require__(8);
    if (!e) {
      return;
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
  };

  return Tools;

})());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("prettier");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("glob-promise");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);

module.exports.includeInNamespace(__webpack_require__(23)).addModules({
  CaffeineMcParser: __webpack_require__(9),
  CafRepl: __webpack_require__(22),
  CompileCache: __webpack_require__(10),
  FileCompiler: __webpack_require__(13),
  Highlight: __webpack_require__(14),
  Metacompiler: __webpack_require__(7),
  ModuleResolver: __webpack_require__(15),
  Register: __webpack_require__(16),
  Run: __webpack_require__(17),
  SourceRoots: __webpack_require__(6),
  Tools: __webpack_require__(18)
});

__webpack_require__(11);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var CafRepl, CaffeineMc, compactFlatten, defineModule, displayError, formattedInspect, fs, getCaffeineInit, highlight, historyFile, historyMaxInputSize, isArray, isArrayUniversal, isPlainObjectUniversal, log, maxOutputCharacters, maxOutputLines, objectKeyCount, path, ref, ref1, repl, runInContext;

ref = __webpack_require__(0), objectKeyCount = ref.objectKeyCount, isArray = ref.isArray, isArrayUniversal = ref.isArrayUniversal, isPlainObjectUniversal = ref.isPlainObjectUniversal, formattedInspect = ref.formattedInspect, defineModule = ref.defineModule, log = ref.log, compactFlatten = ref.compactFlatten;

getCaffeineInit = __webpack_require__(6).getCaffeineInit;

ref1 = CaffeineMc = __webpack_require__(3), runInContext = ref1.runInContext, displayError = ref1.displayError;

repl = __webpack_require__(34);

path = __webpack_require__(2);

fs = __webpack_require__(31);

if (process.env.HOME) {
  historyFile = path.join(process.env.HOME, '.caffeine-mc-history');
}

historyMaxInputSize = 10240;

maxOutputLines = 20;

maxOutputCharacters = maxOutputLines * 80;

highlight = __webpack_require__(14).highlight;

defineModule(module, CafRepl = (function() {
  var lastCompiler;

  function CafRepl() {}

  CafRepl.start = function(parser) {
    return getCaffeineInit().then((function(_this) {
      return function(init) {
        var config, evaluateMode, lastOutput, showSource;
        showSource = false;
        evaluateMode = true;
        lastOutput = null;
        _this.compiler = init.compiler, config = init.config;
        log("Welcome to the CaffeineMC console.".gray);
        log("For help: ".gray + ".help");
        _this._showCurrentCompiler();
        _this.cafRepl = repl.start({
          prompt: _this.getPrompt(),
          completer: function(command) {
            var __, commandToEval, commandToReturn, k, keys, last, regex, result, trimmedCommand;
            try {
              commandToReturn = command;
              trimmedCommand = command.trim();
              commandToEval = (result = trimmedCommand.match(regex = /\.([$\w\u007f-\uffff]*)$/)) ? ((__ = result[0], last = result[1], result), trimmedCommand.split(regex)[0]) : trimmedCommand;
              result = _this.replEval(commandToEval);
              keys = (function() {
                var ref2, results;
                results = [];
                for (k in result) {
                  if (!last || ((ref2 = k.match(last)) != null ? ref2.index : void 0) === 0) {
                    results.push(k);
                  }
                }
                return results;
              })();
              return [keys, last || ""];
            } catch (error1) {
              return [[], command];
            }
          },
          "eval": function(command, context, filename, callback) {
            var e, result;
            try {
              if (command.trim() === '') {
                return callback();
              }
              if (showSource || !evaluateMode) {
                _this.cafRepl.outputStream.write("Source:\n".grey);
                _this.cafRepl.outputStream.write(highlight(_this.compileCommand(command, filename)));
                _this.cafRepl.outputStream.write("\n\n");
              }
              result = evaluateMode ? (showSource ? _this.cafRepl.outputStream.write("Evaluate...\n".grey) : void 0, _this.replEval(command, context, filename)) : ("evaluation off (.evaluate to turn back on)".grey, void 0);
              log.resolvePromiseWrapper(result, function(toLog, label, wasResolved) {
                var finalOut, lines, obj, out;
                lastOutput = out = formattedInspect(label ? (
                  obj = {},
                  obj["" + label] = toLog,
                  obj
                ) : toLog, {
                  color: true
                });
                if (showSource && evaluateMode) {
                  _this.cafRepl.outputStream.write("\nOut:\n".grey);
                }
                finalOut = ((lines = out.split("\n")).slice(0, maxOutputLines)).join("\n");
                if (finalOut.length > maxOutputCharacters) {
                  finalOut = finalOut.slice(0, maxOutputCharacters);
                }
                if (wasResolved) {
                  log("");
                }
                log(finalOut);
                if (finalOut !== out) {
                  log("output truncated".gray);
                  if (isArray(toLog)) {
                    log(("  array: length: " + toLog.length).gray);
                  } else if (isPlainObjectUniversal(toLog)) {
                    log(("  object: keys: " + (objectKeyCount(toLog))).gray);
                  }
                  if (lines.length > maxOutputLines) {
                    log(("  showing: " + maxOutputLines + "/" + lines.length + " lines").gray);
                  } else {
                    log(("  showing: " + finalOut.length + "/" + lastOutput.length + " characters").gray);
                  }
                  log("  show all: .last".gray);
                }
                if (wasResolved) {
                  return _this.cafRepl.displayPrompt();
                }
              });
              return callback();
            } catch (error1) {
              e = error1;
              return callback(e);
            }
          }
        });
        _this.setupHistory();
        _this.addCommand({
          name: 'compiler',
          help: 'CaffeineMC: Show the current compiler',
          action: function() {
            _this.cafRepl.outputStream.write(formattedInspect(_this.compiler.current));
            _this.cafRepl.outputStream.write("\n");
            return _this.cafRepl.displayPrompt();
          }
        });
        _this.addCommand({
          name: "last",
          help: "CaffeineMC: Show the last output value in its entirety.",
          action: function() {
            _this.cafRepl.outputStream.write("" + lastOutput);
            _this.cafRepl.outputStream.write("\n");
            return _this.cafRepl.displayPrompt();
          }
        });
        _this.addCommand({
          name: "evaluate",
          help: "toggle evaluate command",
          action: function() {
            evaluateMode = !evaluateMode;
            _this.cafRepl.outputStream.write("Evaluate Mode is " + (evaluateMode ? 'On' : 'Off') + "\n");
            return _this.cafRepl.displayPrompt();
          }
        });
        return _this.addCommand({
          name: "source",
          help: "toggle show-source",
          action: function() {
            showSource = !showSource;
            _this.cafRepl.outputStream.write("Show-Source Mode is " + (showSource ? 'On' : 'Off') + "\n");
            return _this.cafRepl.displayPrompt();
          }
        });
      };
    })(this))["catch"](function(error) {
      return log.error({
        replError: error
      });
    });
  };

  CafRepl.getPrompt = function() {
    return ("caf-mc:" + this.compiler.compilerName + "> ").gray;
  };

  CafRepl.compileCommand = function(command, filename) {
    var e, js;
    command = command.trim();
    js = this.compiler.compile(command, {
      bare: true,
      sourceFile: filename
    }).compiled.js;
    try {
      return __webpack_require__(19).format(js);
    } catch (error1) {
      e = error1;
      return displayError(e);
    }
  };

  CafRepl._showCurrentCompiler = function() {
    return log("Your current compiler is: ".gray + this.compiler.compilerName.green);
  };

  lastCompiler = null;

  CafRepl.replEval = function(command, context, filename) {
    var e, error, js, result;
    if (context == null) {
      context = this.cafRepl.context;
    }
    result = error = null;
    try {
      js = this.compileCommand(command, filename);
      try {
        result = command.match(/^\|/) ? this.compiler.lastMetacompilerResult : runInContext(js, context);
        if (lastCompiler !== this.compiler) {
          this._showCurrentCompiler();
          lastCompiler = this.compiler;
        }
        this.cafRepl.setPrompt(this.getPrompt());
      } catch (error1) {
        e = error1;
        error = e;
      }
    } catch (error1) {
      e = error1;
      displayError(e);
      result = null;
    }
    if (error) {
      throw error;
    }
    return result;
  };


  /*
  Code BELOW was adapted FROM CoffeeScript's REPL:
    https://github.com/jashkenas/coffeescript/blob/master/src/repl.coffee
   */

  CafRepl.setupHistory = function(filename, maxSize) {
    if (filename == null) {
      filename = historyFile;
    }
    if (maxSize == null) {
      maxSize = historyMaxInputSize;
    }
    this.addHistoryListener(filename, maxSize);
    return this.addCommand({
      name: 'history',
      help: 'Show command history',
      action: (function(_this) {
        return function() {
          _this.cafRepl.outputStream.write((_this.cafRepl.rli.history.slice(0).reverse().join('\n')) + "\n");
          return _this.cafRepl.displayPrompt();
        };
      })(this)
    });
  };

  CafRepl.loadHistory = function(filename, maxSize) {
    var buffer, lastLine, readFd, size, stat;
    lastLine = null;
    try {
      stat = fs.statSync(filename);
      size = Math.min(maxSize, stat.size);
      readFd = fs.openSync(filename, 'r');
      buffer = new Buffer(size);
      fs.readSync(readFd, buffer, 0, size, stat.size - size);
      fs.closeSync(readFd);
      this.cafRepl.rli.history = buffer.toString().split('\n').reverse();
      if (stat.size > maxSize) {
        this.cafRepl.rli.history.pop();
      }
      if (this.cafRepl.rli.history[0] === '') {
        this.cafRepl.rli.history.shift();
      }
      this.cafRepl.rli.historyIndex = -1;
      lastLine = this.cafRepl.rli.history[0];
    } catch (error1) {}
    return lastLine;
  };

  CafRepl.addHistoryListener = function(filename, maxSize) {
    var fd, lastLine;
    fd = fs.openSync(filename, 'a');
    lastLine = this.loadHistory(filename, maxSize);
    this.cafRepl.rli.addListener('line', function(code) {
      if (code && code.length && code !== '.history' && code !== '.exit' && lastLine !== code) {
        fs.writeSync(fd, code + "\n");
        return lastLine = code;
      }
    });
    return this.cafRepl.on('exit', function() {
      return fs.closeSync(fd);
    });
  };

  CafRepl.addCommand = function(arg) {
    var action, help, name;
    name = arg.name, help = arg.help, action = arg.action;
    return this.cafRepl.commands[name] = {
      help: help,
      action: action
    };
  };

  return CafRepl;

})());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [__webpack_require__(7), __webpack_require__(13), __webpack_require__(15), __webpack_require__(18), __webpack_require__(17), __webpack_require__(16)];


/***/ }),
/* 24 */
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

})(__webpack_require__(5).BaseClass);


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = {
	"author": "Shane Brinkman-Davis Delamore, Imikimi LLC",
	"bin": {
		"caf": "./caf"
	},
	"dependencies": {
		"art-build-configurator": "*",
		"art-class-system": "*",
		"art-config": "*",
		"art-standard-lib": "*",
		"art-testbench": "*",
		"bluebird": "^3.5.0",
		"caffeine-eight": "*",
		"caffeine-script": "*",
		"caffeine-script-runtime": "*",
		"cardinal": "^1.0.0",
		"case-sensitive-paths-webpack-plugin": "^2.1.1",
		"chai": "^4.0.1",
		"chalk": "^1.1.3",
		"coffee-loader": "^0.7.3",
		"coffee-script": "^1.12.6",
		"colors": "^1.1.2",
		"commander": "^2.9.0",
		"css-loader": "^0.28.4",
		"dateformat": "^2.0.0",
		"detect-node": "^2.0.3",
		"fs-extra": "^3.0.0",
		"glob": "^7.0.3",
		"glob-promise": "^3.1.0",
		"json-loader": "^0.5.4",
		"mocha": "^3.4.2",
		"neptune-namespaces": "*",
		"prettier": "^0.18.0",
		"script-loader": "^0.7.0",
		"style-loader": "^0.18.1",
		"webpack": "^2.6.1",
		"webpack-dev-server": "^2.4.5",
		"webpack-merge": "^4.1.0",
		"webpack-node-externals": "^1.6.0"
	},
	"description": "Select, configure and extend your to-JavaScript compiler, with arbitrary code, on a per file bases from within the file.",
	"license": "ISC",
	"name": "caffeine-mc",
	"scripts": {
		"build": "webpack --progress",
		"start": "webpack-dev-server --hot --inline --progress",
		"test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register",
		"testInBrowser": "webpack-dev-server --progress"
	},
	"version": "2.4.9"
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("caffeine-eight");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("caffeine-script");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("cardinal");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("repl");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("vm");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("coffee-script/register");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var CafRepl, CaffeineMc, CompileCache, Promise, cache, colors, commander, compile, compileDirectory, compileFile, compiler, dashCase, displayError, each, escapeRegExp, fileCounts, fileToRun, files, formattedInspect, fs, glob, isString, log, obj, output, path, present, prettier, realRequire, ref, ref1, reset, serializer, verbose, version, versions;

global.ArtStandardLibMultipleContextTypeSupport = true;

colors = __webpack_require__(8);

glob = __webpack_require__(20);

fs = __webpack_require__(4);

path = __webpack_require__(2);

__webpack_require__(36);

realRequire = eval('require');

ref = CaffeineMc = __webpack_require__(21), version = ref.version, displayError = ref.displayError, CafRepl = ref.CafRepl, CompileCache = ref.CompileCache;

ref1 = Neptune.Art.StandardLib, log = ref1.log, dashCase = ref1.dashCase, escapeRegExp = ref1.escapeRegExp, present = ref1.present, isString = ref1.isString, Promise = ref1.Promise, formattedInspect = ref1.formattedInspect, each = ref1.each, escapeRegExp = ref1.escapeRegExp;

commander = __webpack_require__(37).version(version).usage('[options] <input files and directories>').option('-o, --output <directory>', "where to write output files").option('-c, --compile', 'compile files').option('-C, --cache', 'cache compiled files').option('-p, --prettier', 'apply "prettier" to any js output').option('-d, --debug', 'show debug info').option('-v, --verbose', 'show more output').option('-r, --reset', 'reset cache').option('--versions [compiler-npm-name]', "show caffeine-mc's version OR the specified caffeine-mc-compatible compiler's version").on("--help", function() {
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
    cache: cache
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


/***/ })
/******/ ]);