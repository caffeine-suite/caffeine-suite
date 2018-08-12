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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./index.coffee ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (typeof Neptune !== "undefined" && Neptune !== null ? Neptune.CaffeineMc : void 0) || __webpack_require__(/*! ./source/CaffeineMc */ 1);


/***/ }),
/* 1 */
/*!****************************************!*\
  !*** ./source/CaffeineMc/index.coffee ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./namespace */ 2);

module.exports.includeInNamespace(__webpack_require__(/*! ./CaffeineMc */ 6)).addModules({
  CaffeineMcParser: __webpack_require__(/*! ./CaffeineMcParser */ 11),
  CafRepl: __webpack_require__(/*! ./CafRepl */ 34),
  CompileCache: __webpack_require__(/*! ./CompileCache */ 14),
  DirReader: __webpack_require__(/*! ./DirReader */ 20),
  FileCompiler: __webpack_require__(/*! ./FileCompiler */ 29),
  Highlight: __webpack_require__(/*! ./Highlight */ 37),
  Metacompiler: __webpack_require__(/*! ./Metacompiler */ 7),
  ModuleResolver: __webpack_require__(/*! ./ModuleResolver */ 19),
  Register: __webpack_require__(/*! ./Register */ 33),
  Run: __webpack_require__(/*! ./Run */ 32),
  SourceRoots: __webpack_require__(/*! ./SourceRoots */ 16),
  Tools: __webpack_require__(/*! ./Tools */ 30),
  WorkingCache: __webpack_require__(/*! ./WorkingCache */ 21)
});

__webpack_require__(/*! ./Compilers */ 8);


/***/ }),
/* 2 */
/*!********************************************!*\
  !*** ./source/CaffeineMc/namespace.coffee ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CaffeineMc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(/*! neptune-namespaces */ 3)).addNamespace('CaffeineMc', CaffeineMc = (function(superClass) {
  extend(CaffeineMc, superClass);

  function CaffeineMc() {
    return CaffeineMc.__super__.constructor.apply(this, arguments);
  }

  CaffeineMc.version = __webpack_require__(/*! ../../package.json */ 4).version;

  return CaffeineMc;

})(Neptune.PackageNamespace));

__webpack_require__(/*! ./Compilers/namespace */ 5);


/***/ }),
/* 3 */
/*!************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 4 */
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, bin, dependencies, description, license, name, scripts, version, default */
/***/ (function(module) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","bin":{"caf":"./caf"},"dependencies":{"art-build-configurator":"*","babel-core":"^6.26.3","babel-loader":"^7.1.5","babel-preset-env":"^1.7.0","caffeine-eight":"*","cardinal":"^1.0.0","chalk":"^1.1.3","colors":"^1.1.2","commander":"^2.9.0","fs-extra":"^3.0.0","glob":"^7.0.3","glob-promise":"^3.1.0","mock-fs":"^4.5.0","prettier":"^1.13.6"},"description":"Select, configure and extend your to-JavaScript compiler, with arbitrary code, on a per file bases from within the file.","license":"ISC","name":"caffeine-mc","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd","testInBrowser":"webpack-dev-server --progress"},"version":"2.12.5"};

/***/ }),
/* 5 */
/*!******************************************************!*\
  !*** ./source/CaffeineMc/Compilers/namespace.coffee ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Compilers,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(/*! ../namespace */ 2)).addNamespace('Compilers', Compilers = (function(superClass) {
  extend(Compilers, superClass);

  function Compilers() {
    return Compilers.__super__.constructor.apply(this, arguments);
  }

  return Compilers;

})(Neptune.PackageNamespace));


/***/ }),
/* 6 */
/*!*********************************************!*\
  !*** ./source/CaffeineMc/CaffeineMc.coffee ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [__webpack_require__(/*! ./Metacompiler */ 7), __webpack_require__(/*! ./FileCompiler */ 29), __webpack_require__(/*! ./ModuleResolver */ 19), __webpack_require__(/*! ./Tools */ 30), __webpack_require__(/*! ./Run */ 32), __webpack_require__(/*! ./Register */ 33)];


/***/ }),
/* 7 */
/*!***********************************************!*\
  !*** ./source/CaffeineMc/Metacompiler.coffee ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BaseClass, CaffeineMc, CaffeineMcParser, CompileCache, Compilers, Metacompiler, checkWorkingCacheExpiration, dashCase, formattedInspect, isArray, isFunction, isObject, isString, log, lowerCamelCase, merge, objectWithout, present, realRequire, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Compilers = __webpack_require__(/*! ./Compilers */ 8);

CaffeineMcParser = __webpack_require__(/*! ./CaffeineMcParser */ 11);

CaffeineMc = __webpack_require__(/*! ./namespace */ 2);

CompileCache = __webpack_require__(/*! ./CompileCache */ 14);

realRequire = eval('require');

ref = __webpack_require__(/*! art-standard-lib */ 12), dashCase = ref.dashCase, formattedInspect = ref.formattedInspect, present = ref.present, isFunction = ref.isFunction, log = ref.log, isString = ref.isString, lowerCamelCase = ref.lowerCamelCase, upperCamelCase = ref.upperCamelCase, merge = ref.merge, objectWithout = ref.objectWithout, isArray = ref.isArray, isObject = ref.isObject;

BaseClass = __webpack_require__(/*! art-class-system */ 10).BaseClass;

checkWorkingCacheExpiration = __webpack_require__(/*! ./WorkingCache */ 21).checkWorkingCacheExpiration;

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
    this._compiler = __webpack_require__(/*! caffeine-script */ 26);
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
    checkWorkingCacheExpiration();
    options = merge(Neptune.CaffeineMc.globalCompilerOptions, options);
    if (options.prettier && (options.inlineMap || options.sourceMap)) {
      throw new Error("prettier does not support sourcemaps");
    }
    if (options.cache && options.sourceFile) {
      return this._compileWithCaching(code, options);
    } else {
      return this._postprocess(options, this._compileWithMetacompiler(code, options));
    }
  };

  Metacompiler.prototype._postprocess = function(options, out) {
    return this._postprocesPrettier(options, this._postprocessWithTranspiler(options, out));
  };

  Metacompiler.prototype._postprocessWithTranspiler = function(options, out) {
    var babel, code, e, map, ref1, sourceMap, transpileOptions;
    if (transpileOptions = options.transpile) {
      transpileOptions = (function() {
        switch (false) {
          case !isArray(transpileOptions):
            return {
              presets: transpileOptions
            };
          case !isString(transpileOptions):
            return {
              presets: [transpileOptions]
            };
          case !isObject(transpileOptions):
            return transpileOptions;
          default:
            return {
              presets: ['env']
            };
        }
      })();
      try {
        babel = __webpack_require__(/*! babel-core */ 27);
        if (sourceMap = out.compiled.sourceMap && (transpileOptions.inputSourceMap == null)) {
          transpileOptions = merge(transpileOptions, {
            inputSourceMap: sourceMap
          });
        }
        ref1 = babel.transform(out.compiled.js, transpileOptions), code = ref1.code, map = ref1.map;
        if ((map != null) && (out.sourceMap != null)) {
          out.compiled.sourceMap = JSON.stringify(map);
        }
        out.compiled.js = code;
        out.transpiled = true;
      } catch (error) {
        e = error;
        log(e.message);
        throw e;
      }
    }
    return out;
  };

  Metacompiler.prototype._postprocesPrettier = function(options, out) {
    var e;
    if (options.prettier) {
      try {
        if (out.compiled.js != null) {
          out.compiled.js = __webpack_require__(/*! prettier */ 28).format(out.compiled.js, {
            parser: "babylon"
          });
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

  Metacompiler.prototype._compileWithCaching = function(code, options) {
    var cacheInfo, cachedCompile, inlineMap, prettier, ref1, ref2, transpile;
    options = objectWithout(options, "cache");
    cacheInfo = {
      compiler: this.compiler,
      source: code,
      verbose: options.verbose,
      sourceFile: options.sourceFile
    };
    prettier = options.prettier, inlineMap = options.inlineMap, transpile = options.transpile;
    if ((ref1 = (ref2 = prettier != null) != null ? ref2 : inlineMap != null) != null ? ref1 : transpile != null) {
      cacheInfo.compilerOptions = {
        prettier: prettier,
        inlineMap: inlineMap,
        transpile: transpile
      };
    }
    if (cachedCompile = CompileCache.fetch(cacheInfo)) {
      return cachedCompile;
    } else {
      return CompileCache.cache(merge(cacheInfo, this._postprocess(options, this._compileWithMetacompiler(code, options))));
    }
  };

  Metacompiler.prototype._compileWithMetacompiler = function(rawCode, options) {
    var code, compilerName, metaCode, ref1, result;
    ref1 = this._metaParser.parse(rawCode.toString()), compilerName = ref1.compilerName, metaCode = ref1.metaCode, code = ref1.code;
    if (metaCode || compilerName) {
      this._lastMetacompilerResult = metaCode ? (result = this.normalizeCompilerResult(this.compiler.compile(metaCode)), CaffeineMc.evalInContext(result.compiled.js, this)) : this.setCompiler(compilerName, options);
      return this._compileWithMetacompiler(code, options);
    } else {
      return this.normalizeCompilerResult(this.compiler.compile(code, options));
    }
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
/*!**************************************************!*\
  !*** ./source/CaffeineMc/Compilers/index.coffee ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./namespace */ 5);

module.exports.addModules({
  JavaScript: __webpack_require__(/*! ./JavaScript */ 9)
});


/***/ }),
/* 9 */
/*!*******************************************************!*\
  !*** ./source/CaffeineMc/Compilers/JavaScript.coffee ***!
  \*******************************************************/
/*! no static exports found */
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

})(__webpack_require__(/*! art-class-system */ 10).BaseClass);


/***/ }),
/* 10 */
/*!**********************************************************************************!*\
  !*** external "require('art-class-system' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-class-system' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 11 */
/*!***************************************************!*\
  !*** ./source/CaffeineMc/CaffeineMcParser.coffee ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CaffeineEight, CaffeineMcParser, isFunction, isString, log, lowerCamelCase, merge, present, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(/*! art-standard-lib */ 12), present = ref.present, isFunction = ref.isFunction, log = ref.log, isString = ref.isString, lowerCamelCase = ref.lowerCamelCase, upperCamelCase = ref.upperCamelCase, merge = ref.merge;

CaffeineEight = __webpack_require__(/*! caffeine-eight */ 13);

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
/* 12 */
/*!**********************************************************************************!*\
  !*** external "require('art-standard-lib' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-standard-lib' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 13 */
/*!********************************************************************************!*\
  !*** external "require('caffeine-eight' /* ABC - not inlining fellow NPM *_/)" ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('caffeine-eight' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 14 */
/*!***********************************************!*\
  !*** ./source/CaffeineMc/CompileCache.coffee ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, CompileCache, Promise, array, consistentJsonStringify, crypto, currentSecond, defineModule, findModuleSync, findSourceRootSync, formattedInspect, fs, glob, isString, log, merge, os, path, randomBase62Character, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(/*! art-standard-lib */ 12), array = ref.array, merge = ref.merge, formattedInspect = ref.formattedInspect, log = ref.log, defineModule = ref.defineModule, isString = ref.isString, upperCamelCase = ref.upperCamelCase, randomBase62Character = ref.randomBase62Character, consistentJsonStringify = ref.consistentJsonStringify, Promise = ref.Promise, currentSecond = ref.currentSecond;

BaseClass = __webpack_require__(/*! art-class-system */ 10).BaseClass;

findSourceRootSync = __webpack_require__(/*! ./SourceRoots */ 16).findSourceRootSync;

findModuleSync = __webpack_require__(/*! ./ModuleResolver */ 19).findModuleSync;

__webpack_require__(/*! colors */ 22);

fs = __webpack_require__(/*! fs-extra */ 17);

glob = __webpack_require__(/*! glob-promise */ 23);

crypto = __webpack_require__(/*! crypto */ 24);

os = __webpack_require__(/*! os */ 25);

path = __webpack_require__(/*! path */ 18);


/*
cachedFileKey: (object)
  compiler:   (required, object) compiler
  source:     (required, string) source-code
  sourceFile: (required, string) source file path & name
  compilerOptions: (object) all options which affect the generated output

cachedFileKeyWithCompilerResults: (object)
  all the cachedFileKey fields
  compiled: (required, object) the compiler's results
 */

defineModule(module, CompileCache = (function(superClass) {
  extend(CompileCache, superClass);

  function CompileCache() {
    return CompileCache.__super__.constructor.apply(this, arguments);
  }

  CompileCache.compileCacheFileNameRoot = "CaffineMcCompileCache";

  CompileCache.classGetter({
    compileCachePathRoot: function() {
      return os.tmpdir();
    },
    compileCacheFilePathRoot: function() {
      return this._compileCacheFilePathRoot || (this._compileCacheFilePathRoot = path.join(this.compileCachePathRoot, this.compileCacheFileNameRoot));
    }
  });

  CompileCache.compilerSupportsCaching = function(compiler) {
    return isString(compiler.version) && this.getCompilerName(compiler);
  };

  CompileCache.getCompilerName = function(compiler) {
    return (typeof compiler.getName === "function" ? compiler.getName() : void 0) || compiler.name;
  };

  CompileCache.getCompilerSignature = function(compiler) {
    return (this.getCompilerName(compiler)) + "-" + compiler.version;
  };

  CompileCache.makeSha256FilenameFriendly = function(sha256String) {
    return sha256String.replace(/[\/+=]/g, "-");
  };

  CompileCache.hashSource = function(source) {
    return this.makeSha256FilenameFriendly(crypto.createHmac('sha256', "no need for a real secret").update(source).digest('base64').split("=")[0]);
  };


  /*
  IN: cachedFileKey (see above)
   */

  CompileCache.getFileName = function(cachedFileKey) {
    var compiler, compilerOptions, relativeSourceFile, source, sourceFile, sourceRoot;
    compiler = cachedFileKey.compiler, source = cachedFileKey.source, sourceFile = cachedFileKey.sourceFile, compilerOptions = cachedFileKey.compilerOptions;
    if (!(compiler && sourceFile && (source != null))) {
      throw new Error("expecting compiler, source and sourceFile: " + formattedInspect({
        compiler: compiler,
        source: source,
        sourceFile: sourceFile
      }));
    }
    if (!this.compilerSupportsCaching(compiler)) {
      return null;
    }
    sourceRoot = findSourceRootSync(sourceFile);
    relativeSourceFile = path.relative(sourceRoot, sourceFile);
    source = "# sourceFile: " + relativeSourceFile + "\n# compilerOptions: " + (consistentJsonStringify(compilerOptions != null ? compilerOptions : null)) + "\n" + source;
    return [this.compileCacheFilePathRoot, path.basename(sourceRoot).replace(/\./g, "-"), path.basename(sourceFile).replace(/\./g, "-"), this.getCompilerSignature(compiler), this.hashSource(source)].join("_") + ".json";
  };


  /*
  IN: cachedFileKey (see above), but also with {source, compiled and props}
   */

  CompileCache.cache = function(cachedFileKey) {
    var compiled, fileName, props, source;
    if (fileName = this.getFileName(cachedFileKey)) {
      source = cachedFileKey.source, compiled = cachedFileKey.compiled, props = cachedFileKey.props;
      if (cachedFileKey.verbose) {
        log({
          caching: cachedFileKey.sourceFile
        });
      }
      fs.writeFileSync(fileName, JSON.stringify(merge({
        source: source,
        compiled: compiled,
        props: props
      })));
    }
    return cachedFileKey;
  };


  /*
  IN: cachedFileKey (see above)
   */

  CompileCache.fetch = function(cachedFileKey) {
    var cacheContents, fileName, start;
    start = currentSecond();
    if ((fileName = this.getFileName(cachedFileKey)) && fs.existsSync(fileName)) {
      if ((cacheContents = (function() {
        try {
          return JSON.parse(fs.readFileSync(fileName));
        } catch (error) {}
      })()) && cacheContents.source === cachedFileKey.source && this.verifyDependencies(cachedFileKey, cacheContents.props)) {
        cacheContents.fromCache = true;
        if (cachedFileKey.verbose) {
          log({
            cached: (((currentSecond() - start) * 1000 | 0) + "ms ") + cachedFileKey.sourceFile
          });
        }
        return cacheContents;
      }
    }
  };

  CompileCache.verifyDependencies = function(cachedFileKey, props) {
    var cachedRequireString, moduleDependencies, requireString, sourceString;
    if (moduleDependencies = props != null ? props.moduleDependencies : void 0) {
      for (sourceString in moduleDependencies) {
        cachedRequireString = moduleDependencies[sourceString];
        requireString = findModuleSync(sourceString, {
          sourceFile: cachedFileKey.sourceFile
        }).requireString;
        if (requireString !== cachedRequireString) {
          log({
            CompileCache: {
              message: "moduleDependencies changed",
              sourceString: sourceString,
              sourceFile: cachedFileKey.sourceFile,
              require: {
                old: cachedRequireString,
                "new": requireString
              }
            }
          });
          return false;
        }
      }
      return true;
    } else {
      return true;
    }
  };

  CompileCache.reset = function(verbose) {
    return glob(this.compileCacheFilePathRoot + "*").then(function(list) {
      return Promise.all(array(list, function(item) {
        return Promise.resolve(item).then(function(item) {
          return fs.unlink(item);
        }).tap(function() {
          if (verbose) {
            return log("cache-reset: ".gray + item.green + " (deleted)".gray);
          }
        });
      }));
    });
  };

  return CompileCache;

})(BaseClass));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 15)(module)))

/***/ }),
/* 15 */
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
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
/* 16 */
/*!**********************************************!*\
  !*** ./source/CaffeineMc/SourceRoots.coffee ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, SourceRoots, array, defineModule, each, find, fs, log, merge, path, present, ref, w,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(/*! art-standard-lib */ 12), defineModule = ref.defineModule, array = ref.array, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w;

BaseClass = __webpack_require__(/*! art-class-system */ 10).BaseClass;

fs = __webpack_require__(/*! fs-extra */ 17);

path = __webpack_require__(/*! path */ 18);

defineModule(module, SourceRoots = (function(superClass) {
  var _Metacompiler, defaultSourceRootIndicatorFiles, evalCapturingModuleExports, newMetacompiler;

  extend(SourceRoots, superClass);

  function SourceRoots() {
    return SourceRoots.__super__.constructor.apply(this, arguments);
  }

  SourceRoots.classGetter("sourceRootIndicatorFiles knownSourceRoots caffeineInits", {
    caffeineInitFileName: function() {
      return "caffeine-mc.config.caf";
    }
  });

  _Metacompiler = null;

  newMetacompiler = function() {
    return new (_Metacompiler != null ? _Metacompiler : _Metacompiler = __webpack_require__(/*! ./Metacompiler */ 7));
  };

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
          metacompiler = newMetacompiler();
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
        metacompiler = newMetacompiler();
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
    directory = path.resolve(directory);
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
    directory = path.resolve(directory);
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 15)(module)))

/***/ }),
/* 17 */
/*!**************************************************************************!*\
  !*** external "require('fs-extra' /* ABC - not inlining fellow NPM *_/)" ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('fs-extra' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 18 */
/*!**********************************************************************!*\
  !*** external "require('path' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('path' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 19 */
/*!*************************************************!*\
  !*** ./source/CaffeineMc/ModuleResolver.coffee ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var ErrorWithInfo, ModuleResolver, Path, Promise, cacheable, currentSecond, dashCase, defineModule, dirReader, each, find, findSourceRootSync, log, merge, mergeInto, normalizeName, peek, present, readdirSync, realRequire, ref, ref1, statSync, upperCamelCase, w,
  slice = [].slice;

ref = __webpack_require__(/*! art-standard-lib */ 12), defineModule = ref.defineModule, peek = ref.peek, Promise = ref.Promise, dashCase = ref.dashCase, upperCamelCase = ref.upperCamelCase, ErrorWithInfo = ref.ErrorWithInfo, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w, mergeInto = ref.mergeInto, currentSecond = ref.currentSecond;

Path = __webpack_require__(/*! path */ 18);

ref1 = __webpack_require__(/*! fs-extra */ 17), statSync = ref1.statSync, readdirSync = ref1.readdirSync;

dirReader = __webpack_require__(/*! ./DirReader */ 20);

cacheable = __webpack_require__(/*! ./WorkingCache */ 21).cacheable;

normalizeName = cacheable("normalizeName", upperCamelCase);

realRequire = eval('require');

findSourceRootSync = __webpack_require__(/*! ./SourceRoots */ 16).findSourceRootSync;


/*
2018-07-21 Optimization TODO:

I think if we simplify the semantics such that matches are defined as:
  normalizeName(dirName) == normalizeName(moduleName)
AND
   * this is the change:
  normalizeName(fileName.split(".")[0]) == normalizeName(moduleName)

Then we can probably make much better use of caching:
  Read the dir in and create a map:
    normalizedName: name
  (where normalizedName here means for files, we strip the extensions)

Then, we don't have to scan the dir every time!

NOTE: I think if we have >= 2 files which map to the same noramlized name
we encode that in the map somehow and can therefore raise the same
exception we already do.
 */

defineModule(module, ModuleResolver = (function() {
  var getMatchingName, maybeCouldHaveCached;

  function ModuleResolver() {}


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
        throw new ErrorWithInfo("ModuleResolver: Could not find requested npm package: " + moduleBaseName, {
          npmPackageNamesAttempted: [moduleBaseName, dashCase(moduleBaseName)]
        });
      }
    }
    requireString = (modulePathArray != null ? modulePathArray.length : void 0) > 0 ? Path.join(name, absolutePath.slice((absolutePath.lastIndexOf(name)) + name.length)) : name;
    return {
      requireString: requireString,
      absolutePath: absolutePath
    };
  };

  ModuleResolver.findModuleSync = function(moduleName, options) {
    var absolutePath, base, denormalizedBase, j, len, matchingName, mod, modulePathArray, out, ref2, ref3, requireString, sub;
    if (/\//.test(moduleName)) {
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
    } else {
      denormalizedBase = moduleName;
    }
    ref3 = ModuleResolver._findModuleBaseSync(denormalizedBase, modulePathArray, options), requireString = ref3.requireString, absolutePath = ref3.absolutePath;
    if (modulePathArray) {
      for (j = 0, len = modulePathArray.length; j < len; j++) {
        sub = modulePathArray[j];
        if (matchingName = ModuleResolver._matchingNameInDirectorySync(sub, absolutePath, options)) {
          absolutePath = Path.join(absolutePath, matchingName);
          requireString = requireString + "/" + matchingName;
        } else {
          throw new ErrorWithInfo("Could not find pathed submodule inside npm package.", {
            npmPackage: requireString,
            localNpmPackageLocation: absolutePath,
            submodulePath: sub,
            normalized: normalizeName(sub),
            dirItems: dirReader.read(absolutePath)
          });
        }
      }
    }
    return {
      requireString: requireString,
      absolutePath: absolutePath
    };
  };

  ModuleResolver.findModule = function(moduleName, options) {
    return Promise.then(function() {
      return ModuleResolver.findModuleSync(moduleName, options);
    });
  };

  maybeCouldHaveCached = {};

  ModuleResolver._findModuleBaseSync = function(moduleBaseName, modulePathArray, options) {
    var absolutePath, absoluteSourceFilePath, directory, e, matchingName, normalizedModuleName, requireString, shouldContinue, sourceDir, sourceFile, sourceFiles, sourceRoot;
    normalizedModuleName = upperCamelCase(moduleBaseName);
    if (options) {
      sourceFile = options.sourceFile, sourceDir = options.sourceDir, sourceFiles = options.sourceFiles, sourceRoot = options.sourceRoot;
    }
    sourceFile || (sourceFile = sourceFiles != null ? sourceFiles[0] : void 0);
    if (sourceFile || sourceDir) {
      directory = sourceDir = dirReader.resolve(sourceDir || Path.dirname(sourceFile));
      sourceRoot || (sourceRoot = findSourceRootSync(sourceDir));
      sourceRoot = sourceRoot && dirReader.resolve(sourceRoot);
      absoluteSourceFilePath = sourceFile && Path.join(sourceDir, Path.parse(sourceFile).name);
    }
    absolutePath = null;
    shouldContinue = present(sourceRoot);
    while (shouldContinue) {
      if ((matchingName = ModuleResolver._matchingNameInDirectorySync(normalizedModuleName, directory, options)) && absoluteSourceFilePath !== (absolutePath = Path.join(directory, matchingName))) {
        shouldContinue = false;
      } else {
        absolutePath = null;
        if (directory === sourceRoot) {
          if (normalizedModuleName === normalizeName(peek(sourceRoot.split("/")))) {
            absolutePath = sourceRoot;
          }
          shouldContinue = false;
        } else {
          directory = Path.dirname(directory);
        }
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
      try {
        return ModuleResolver.getNpmPackageName(moduleBaseName, modulePathArray);
      } catch (error) {
        e = error;
        if (e.info) {
          mergeInto(e.info, {
            sourceDir: sourceDir,
            sourceRoot: sourceRoot
          });
        }
        throw e;
      }
    }
  };


  /*
  Notes about "." names-with-dots.
  
    Essentially, dots are treated as word-boundaries.
  
    Files:
      We need to manage extensions. Current rule:
        Full match example: FooCaf matches foo.caf
        PartialMatch must fully match on dot-boundaries:
          Foo.BarFood.caf does NOT match FooBar, but does match FooBarFood
        PartialMatch must match starting at the first character:
          Foo.BarFood.caf does NOT match BarFood but does match Foo
  
    Dirs:
      Dirs must fully match:
        Art.Foo.Bar matches ArtFooBar BUT NOT ArtFoo
  
  Future:
    I'd like to be able to treat "."s in dir-names as-if they were '/' (slashes)
    Basically, this parallels how NeptuneNamespaces interprets them.
    It should work identically to as-if there were nested dirs.
  
    Given these files:
  
      MyFile1.caf
      Foo/Bar/MyFile2.caf
  
    OR these files:
  
      MyFile1.caf
      Foo.Bar/MyFile2.caf
  
    Then:
       * inside MyFile1.caf
       * this works:
      &Foo/Bar/MyFile2
   */

  ModuleResolver.getMatchingName = getMatchingName = function(normalizedModuleName, name, isDir) {
    var foundLegalStop, i, j, len, normalizedTestName, offset, ref2, stop, stops;
    if (normalizedModuleName === (normalizedTestName = normalizeName(name))) {
      return name;
    } else if (!isDir) {
      if (0 === normalizedTestName.indexOf(normalizedModuleName)) {
        foundLegalStop = false;
        offset = 0;
        ref2 = stops = name.split('.');
        for (i = j = 0, len = ref2.length; j < len; i = ++j) {
          stop = ref2[i];
          stop = normalizeName(stop);
          offset += stop.length;
          if (normalizedModuleName.length === offset) {
            return stops.slice(0, i + 1).join('.');
          }
        }
      }
      return false;
    }
  };

  ModuleResolver._matchingNameInDirectorySync = function(normalizedModuleName, directory, options) {
    var j, len, matchingName, name, newMatchingName, ref2;
    matchingName = null;
    ref2 = dirReader.read(directory);
    for (j = 0, len = ref2.length; j < len; j++) {
      name = ref2[j];
      if (newMatchingName = getMatchingName(normalizedModuleName, name, dirReader.isDir(Path.join(directory, name)))) {
        if (matchingName && matchingName !== newMatchingName) {
          throw new ErrorWithInfo("More than one matching module name with\na) different actual base-names (" + matchingName + " != " + newMatchingName + ") and\nb) for the same normalized name (" + normalizedModuleName + ")", {
            directory: directory,
            firstMatch: matchingName,
            secondMatch: newMatchingName,
            normalizedModuleName: normalizedModuleName
          });
        }
        matchingName = newMatchingName;
      }
    }
    return matchingName;
  };

  return ModuleResolver;

})());

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 15)(module)))

/***/ }),
/* 20 */
/*!********************************************!*\
  !*** ./source/CaffeineMc/DirReader.coffee ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ErrorWithInfo, Path, Promise, cacheable, currentSecond, dashCase, defineModule, each, find, log, merge, mergeInto, peek, present, readdirSync, ref, ref1, statSync, upperCamelCase, w;

ref = __webpack_require__(/*! art-standard-lib */ 12), defineModule = ref.defineModule, peek = ref.peek, Promise = ref.Promise, dashCase = ref.dashCase, upperCamelCase = ref.upperCamelCase, ErrorWithInfo = ref.ErrorWithInfo, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w, mergeInto = ref.mergeInto, currentSecond = ref.currentSecond;

Path = __webpack_require__(/*! path */ 18);

ref1 = __webpack_require__(/*! fs-extra */ 17), statSync = ref1.statSync, readdirSync = ref1.readdirSync;

cacheable = __webpack_require__(/*! ./WorkingCache */ 21).cacheable;

module.exports = {
  isDir: cacheable("isDir", function(p) {
    return statSync(p).isDirectory();
  }),
  read: cacheable("read", readdirSync),
  resolve: cacheable("resolve", Path.resolve)
};


/***/ }),
/* 21 */
/*!***********************************************!*\
  !*** ./source/CaffeineMc/WorkingCache.coffee ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ErrorWithInfo, Promise, cacheExpiresIn, cacheRead, cacheWrite, currentSecond, dashCase, defineModule, each, find, log, merge, mergeInto, peek, present, ref, resetWorkingCache, upperCamelCase, w, workingCache, workingCacheLastResetAt;

ref = __webpack_require__(/*! art-standard-lib */ 12), defineModule = ref.defineModule, peek = ref.peek, Promise = ref.Promise, dashCase = ref.dashCase, upperCamelCase = ref.upperCamelCase, ErrorWithInfo = ref.ErrorWithInfo, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w, mergeInto = ref.mergeInto, currentSecond = ref.currentSecond;

workingCache = null;

cacheExpiresIn = 1;

workingCacheLastResetAt = currentSecond() - cacheExpiresIn * 10;

module.exports = {
  checkWorkingCacheExpiration: function() {
    if (currentSecond() - workingCacheLastResetAt > cacheExpiresIn) {
      return resetWorkingCache();
    }
  },
  resetWorkingCache: resetWorkingCache = function() {
    return workingCache = {};
  },
  cacheRead: cacheRead = function(key, p) {
    var ref1;
    return (ref1 = workingCache[key]) != null ? ref1[p] : void 0;
  },
  cacheWrite: cacheWrite = function(key, p, v) {
    return (workingCache[key] != null ? workingCache[key] : workingCache[key] = {})[p] = v;
  },
  cacheable: function(key, f) {
    return function(p) {
      var v;
      if ((v = cacheRead(key, p)) != null) {
        return v;
      } else {
        return cacheWrite(key, p, f(p));
      }
    };
  }
};

resetWorkingCache();


/***/ }),
/* 22 */
/*!************************************************************************!*\
  !*** external "require('colors' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('colors' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 23 */
/*!******************************************************************************!*\
  !*** external "require('glob-promise' /* ABC - not inlining fellow NPM *_/)" ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('glob-promise' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 24 */
/*!************************************************************************!*\
  !*** external "require('crypto' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('crypto' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 25 */
/*!********************************************************************!*\
  !*** external "require('os' /* ABC - not inlining fellow NPM *_/)" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('os' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 26 */
/*!*********************************************************************************!*\
  !*** external "require('caffeine-script' /* ABC - not inlining fellow NPM *_/)" ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('caffeine-script' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 27 */
/*!****************************************************************************!*\
  !*** external "require('babel-core' /* ABC - not inlining fellow NPM *_/)" ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if(typeof require('babel-core' /* ABC - not inlining fellow NPM */) === 'undefined') {var e = new Error("Cannot find module 'require('babel-core' /* ABC - not inlining fellow NPM */)'"); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = require('babel-core' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 28 */
/*!**************************************************************************!*\
  !*** external "require('prettier' /* ABC - not inlining fellow NPM *_/)" ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if(typeof require('prettier' /* ABC - not inlining fellow NPM */) === 'undefined') {var e = new Error("Cannot find module 'require('prettier' /* ABC - not inlining fellow NPM */)'"); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = require('prettier' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 29 */
/*!***********************************************!*\
  !*** ./source/CaffeineMc/FileCompiler.coffee ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var CaffeineMc, FileCompiler, array, caffeineInitFileName, defineModule, each, find, findSourceRoot, findSourceRootSync, fs, getCaffeineInit, getCaffeineInitSync, log, merge, path, present, ref, ref1, w;

ref = __webpack_require__(/*! art-standard-lib */ 12), defineModule = ref.defineModule, array = ref.array, log = ref.log, merge = ref.merge, present = ref.present, find = ref.find, each = ref.each, w = ref.w;

fs = __webpack_require__(/*! fs-extra */ 17);

path = __webpack_require__(/*! path */ 18);

CaffeineMc = __webpack_require__(/*! ./namespace */ 2);

ref1 = __webpack_require__(/*! ./SourceRoots */ 16), getCaffeineInit = ref1.getCaffeineInit, caffeineInitFileName = ref1.caffeineInitFileName, findSourceRoot = ref1.findSourceRoot, getCaffeineInitSync = ref1.getCaffeineInitSync, findSourceRootSync = ref1.findSourceRootSync;

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
    source = options.source, sourceRoot = options.sourceRoot;
    sourceRoot = sourceRoot ? path.resolve(sourceRoot) : findSourceRootSync(sourceFile);
    caffeineInit = getCaffeineInitSync(sourceRoot);
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 15)(module)))

/***/ }),
/* 30 */
/*!****************************************!*\
  !*** ./source/CaffeineMc/Tools.coffee ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var Tools, defineModule, escapeRegExp, log, path, ref, vm;

ref = __webpack_require__(/*! art-standard-lib */ 12), log = ref.log, escapeRegExp = ref.escapeRegExp, defineModule = ref.defineModule;

path = __webpack_require__(/*! path */ 18);

vm = __webpack_require__(/*! vm */ 31);

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
    __webpack_require__(/*! colors */ 22);
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 15)(module)))

/***/ }),
/* 31 */
/*!********************************************************************!*\
  !*** external "require('vm' /* ABC - not inlining fellow NPM *_/)" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('vm' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 32 */
/*!**************************************!*\
  !*** ./source/CaffeineMc/Run.coffee ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, CaffeineMc, ErrorWithInfo, Promise, Run, array, defineModule, fileExists, find, formattedInspect, fs, isString, log, merge, path, randomBase62Character, realRequire, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(/*! art-standard-lib */ 12), array = ref.array, log = ref.log, ErrorWithInfo = ref.ErrorWithInfo, find = ref.find, Promise = ref.Promise, merge = ref.merge, formattedInspect = ref.formattedInspect, log = ref.log, defineModule = ref.defineModule, isString = ref.isString, upperCamelCase = ref.upperCamelCase, randomBase62Character = ref.randomBase62Character;

BaseClass = __webpack_require__(/*! art-class-system */ 10).BaseClass;

fs = __webpack_require__(/*! fs-extra */ 17);

path = __webpack_require__(/*! path */ 18);

CaffeineMc = __webpack_require__(/*! ./namespace */ 2);

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
    var globalCompilerOptions;
    globalCompilerOptions = Neptune.CaffeineMc.globalCompilerOptions;
    try {
      Neptune.CaffeineMc.globalCompilerOptions = options;
      Run.setupNodeForRun(Run._resolveSourceFile(options = merge(options, {
        sourceFile: sourceFile
      })));
      return realRequire(realRequire.main.filename);
    } finally {
      Neptune.CaffeineMc.globalCompilerOptions = globalCompilerOptions;
    }
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 15)(module)))

/***/ }),
/* 33 */
/*!*******************************************!*\
  !*** ./source/CaffeineMc/Register.coffee ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var CaffeineMc, Register, defineModule, log, realRequire, ref;

ref = __webpack_require__(/*! art-standard-lib */ 12), defineModule = ref.defineModule, log = ref.log;

realRequire = eval('require');

CaffeineMc = __webpack_require__(/*! ./namespace */ 2);

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
          answer = CaffeineMc.compileFileSync(filename, {
            inlineMap: true,
            sourceRoot: "",
            cache: true
          });
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 15)(module)))

/***/ }),
/* 34 */
/*!******************************************!*\
  !*** ./source/CaffeineMc/CafRepl.coffee ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var CafRepl, CaffeineMc, compactFlatten, currentSecond, defineModule, displayError, formattedInspect, fs, getCaffeineInit, highlight, historyFile, historyMaxInputSize, isArray, isArrayUniversal, isPlainObjectUniversal, log, maxOutputCharacters, maxOutputLines, merge, objectKeyCount, path, ref, ref1, repl, runInContext;

ref = __webpack_require__(/*! art-standard-lib */ 12), currentSecond = ref.currentSecond, merge = ref.merge, objectKeyCount = ref.objectKeyCount, isArray = ref.isArray, isArrayUniversal = ref.isArrayUniversal, isPlainObjectUniversal = ref.isPlainObjectUniversal, formattedInspect = ref.formattedInspect, defineModule = ref.defineModule, log = ref.log, compactFlatten = ref.compactFlatten;

getCaffeineInit = __webpack_require__(/*! ./SourceRoots */ 16).getCaffeineInit;

ref1 = CaffeineMc = __webpack_require__(/*! ./namespace */ 2), runInContext = ref1.runInContext, displayError = ref1.displayError;

repl = __webpack_require__(/*! repl */ 35);

path = __webpack_require__(/*! path */ 18);

fs = __webpack_require__(/*! fs */ 36);

if (process.env.HOME) {
  historyFile = path.join(process.env.HOME, '.caffeine-mc-history');
}

historyMaxInputSize = 10240;

maxOutputLines = 30;

maxOutputCharacters = maxOutputLines * 200;

highlight = __webpack_require__(/*! ./Highlight */ 37).highlight;

defineModule(module, CafRepl = (function() {
  var lastCompiler, logReplInfo;

  function CafRepl() {}

  logReplInfo = function(categoryName, info) {
    var out;
    out = categoryName.gray;
    if (info != null) {
      out += info.green;
    }
    return log(out);
  };

  CafRepl.start = function(parser) {
    return getCaffeineInit().then((function(_this) {
      return function(init) {
        var config, evaluateMode, lastOutput, showSource;
        showSource = false;
        evaluateMode = true;
        lastOutput = null;
        _this.compiler = init.compiler, config = init.config;
        logReplInfo("Welcome to the CaffeineMC console.");
        logReplInfo("For help: ", ".help");
        _this._showCurrentCompiler();
        _this.cafRepl = repl.start({
          prompt: _this.getPrompt(),
          completer: function(command) {
            var __, commandToEval, error, k, key, keys, last, out, regex, result, trimmedCommand;
            trimmedCommand = command.trim();
            commandToEval = (result = trimmedCommand.match(regex = /\.([$\w\u007f-\uffff]*)$/)) ? ((__ = result[0], last = result[1], result), trimmedCommand.split(regex)[0]) : trimmedCommand.match(/^[$\w\u007f-\uffff]*$/) ? (last = trimmedCommand, "global") : trimmedCommand;
            out = (function() {
              try {
                result = this._replEval(commandToEval);
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
                this.cafRepl.outputStream.write("\n" + (formattedInspect({
                  "tab-completion": merge({
                    object: commandToEval,
                    prefix: last != null ? last : "(none)",
                    found: keys.length <= 3 ? keys.join(', ') : (keys.slice(0, 3).join(', ')) + "..."
                  })
                }, {
                  color: true
                })) + (keys.length > 3 ? ("  press tab again to show all " + keys.length + "\n").gray : ""));
                if (last || /\.$/.test(command)) {
                  return [keys, last];
                } else {
                  return [
                    (function() {
                      var i, len, results;
                      results = [];
                      for (i = 0, len = keys.length; i < len; i++) {
                        key = keys[i];
                        results.push("." + key);
                      }
                      return results;
                    })(), ""
                  ];
                }
              } catch (error1) {
                error = error1;
                this.cafRepl.outputStream.write("\ntab-completion could not evaluate: " + commandToEval.red + "\n");
                return [[], trimmedCommand];
              }
            }).call(_this);
            if (out[0].length === 0) {
              _this.cafRepl.displayPrompt(true);
            }
            return out;
          },
          "eval": function(command, context, filename, callback) {
            var e, midTime, result, startTime;
            try {
              startTime = currentSecond();
              if (command.trim() === '') {
                return callback();
              }
              if (showSource || !evaluateMode) {
                _this.cafRepl.outputStream.write("Source:\n".grey);
                _this.cafRepl.outputStream.write(highlight(_this.compileCommand(command, filename)));
                _this.cafRepl.outputStream.write("\n\n");
              }
              result = evaluateMode ? (showSource ? _this.cafRepl.outputStream.write("Evaluate...\n".grey) : void 0, _this.replEval(command, context, filename)) : ("evaluation off (.evaluate to turn back on)".grey, void 0);
              (_this.replEval("global", context, filename)).$last = result;
              midTime = currentSecond();
              log.resolvePromiseWrapper(result, function(toLog, label, wasResolved, wasRejected) {
                var finalOut, finalTime, lines, obj, out;
                finalTime = currentSecond();
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
                if (wasResolved || wasRejected) {
                  log("");
                }
                log(finalOut);
                if (finalOut !== out) {
                  logReplInfo("output truncated");
                  if (isArray(toLog)) {
                    logReplInfo("  array: length: " + toLog.length);
                  } else if (isPlainObjectUniversal(toLog)) {
                    logReplInfo("  object: keys: " + (objectKeyCount(toLog)));
                  }
                  if (lines.length > maxOutputLines) {
                    logReplInfo("  showing: " + maxOutputLines + "/" + lines.length + " lines");
                  } else {
                    logReplInfo("  showing: " + finalOut.length + "/" + lastOutput.length + " characters");
                  }
                  logReplInfo("  show all:                      ", ".last");
                  logReplInfo("  result available at:           ", "$last");
                }
                if (wasResolved || wasRejected) {
                  logReplInfo("  promise wall-time:             ", ((finalTime - midTime) * 1000 | 0) + "ms");
                  logReplInfo("  total wall-time:               ", ((finalTime - startTime) * 1000 | 0) + "ms");
                  if (!wasRejected) {
                    logReplInfo("  resolved value available at:   ", "$lastResolved");
                    (_this.replEval("global", context, filename)).$lastResolved = toLog;
                  } else {
                    logReplInfo("  rejected value available at:   ", "$lastRejected");
                    (_this.replEval("global", context, filename)).$lastRejected = toLog;
                  }
                  (_this.replEval("global", context, filename)).$lastPromise = result;
                  logReplInfo("  promise available at:          ", "$lastPromise");
                  return _this.cafRepl.displayPrompt();
                }
              });
              if (midTime - startTime > .1) {
                logReplInfo("wall-time: ", ((midTime - startTime) * 1000 | 0) + "ms");
              }
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
          help: "CaffeineMC: Show the last output value in its entirety. $last contains the value of the last output.",
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
        _this.addCommand({
          name: "source",
          help: "toggle show-source",
          action: function() {
            showSource = !showSource;
            _this.cafRepl.outputStream.write("Show-Source Mode is " + (showSource ? 'On' : 'Off') + "\n");
            return _this.cafRepl.displayPrompt();
          }
        });
        return runInContext("Neptune.CaffeineMc.register()", _this.cafRepl.context);
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
      sourceFile: filename,
      cache: filename !== "repl"
    }).compiled.js;
    try {
      return __webpack_require__(/*! prettier */ 28).format(js, {
        parser: 'babylon'
      });
    } catch (error1) {
      e = error1;
      return displayError(e);
    }
  };

  CafRepl._showCurrentCompiler = function() {
    return logReplInfo("Your current compiler is: ", this.compiler.compilerName);
  };

  CafRepl._replEval = function(command, context, filename) {
    var js;
    if (context == null) {
      context = this.cafRepl.context;
    }
    if (filename == null) {
      filename = 'repl';
    }
    js = this.compileCommand(command, filename);
    if (command.match(/^\|/)) {
      return this.compiler.lastMetacompilerResult;
    } else {
      return runInContext(js, context);
    }
  };

  lastCompiler = null;

  CafRepl.replEval = function(command, context, filename) {
    var e, error, js, result;
    if (context == null) {
      context = this.cafRepl.context;
    }
    if (filename == null) {
      filename = 'repl';
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 15)(module)))

/***/ }),
/* 35 */
/*!**********************************************************************!*\
  !*** external "require('repl' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('repl' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 36 */
/*!********************************************************************!*\
  !*** external "require('fs' /* ABC - not inlining fellow NPM *_/)" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('fs' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 37 */
/*!********************************************!*\
  !*** ./source/CaffeineMc/Highlight.coffee ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  highlight: function(js) {
    var cardinal, chalk, functionDeclarationColor, itentifierColor, keywordColor, normalizeChalkColor, operatorColor, options;
    chalk = __webpack_require__(/*! chalk */ 38);
    cardinal = __webpack_require__(/*! cardinal */ 39);
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
/* 38 */
/*!***********************************************************************!*\
  !*** external "require('chalk' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('chalk' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 39 */
/*!**************************************************************************!*\
  !*** external "require('cardinal' /* ABC - not inlining fellow NPM *_/)" ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('cardinal' /* ABC - not inlining fellow NPM */);

/***/ })
/******/ ]);