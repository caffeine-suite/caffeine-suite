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

module.exports = __webpack_require__(/*! ./sourceWithoutNeptuneNamespaces/CaffeineScript/Runtime */ 1);


/***/ }),
/* 1 */
/*!****************************************************************************!*\
  !*** ./sourceWithoutNeptuneNamespaces/CaffeineScript/Runtime/index.coffee ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var merge;

__webpack_require__(/*! ./Global */ 2);

merge = function(list) {
  var i, k, l, len, out, v;
  out = {};
  for (i = 0, len = list.length; i < len; i++) {
    l = list[i];
    for (k in l) {
      v = l[k];
      out[k] = v;
    }
  }
  return out;
};

module.exports = global.CaffeineScriptRuntime != null ? global.CaffeineScriptRuntime : global.CaffeineScriptRuntime = merge([__webpack_require__(/*! ./ArrayCompactFlatten */ 3), __webpack_require__(/*! ./Iteration */ 5), __webpack_require__(/*! ./Iteration2 */ 6), __webpack_require__(/*! ./Lib */ 7), __webpack_require__(/*! ./Import */ 8)]);


/***/ }),
/* 2 */
/*!*****************************************************************************!*\
  !*** ./sourceWithoutNeptuneNamespaces/CaffeineScript/Runtime/Global.coffee ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

g = typeof window !== "undefined" && window !== null ? window : typeof self !== "undefined" && self !== null ? self : global;

g.global = g;


/***/ }),
/* 3 */
/*!******************************************************************************************!*\
  !*** ./sourceWithoutNeptuneNamespaces/CaffeineScript/Runtime/ArrayCompactFlatten.coffee ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var compactFlattenIfNeeded, doFlattenInternal, isPlainArray, needsFlatteningOrCompacting;

isPlainArray = __webpack_require__(/*! ./Types */ 4).isPlainArray;

doFlattenInternal = function(array, output) {
  var el, i, len;
  for (i = 0, len = array.length; i < len; i++) {
    el = array[i];
    if (isPlainArray(el)) {
      doFlattenInternal(el, output);
    } else if (el != null) {
      output.push(el);
    }
  }
  return output;
};

needsFlatteningOrCompacting = function(array) {
  var el, i, len;
  for (i = 0, len = array.length; i < len; i++) {
    el = array[i];
    if ((el == null) || isPlainArray(el)) {
      return true;
    }
  }
  return false;
};

compactFlattenIfNeeded = function(array) {
  if (needsFlatteningOrCompacting(array)) {
    return doFlattenInternal(array, []);
  } else {
    return array;
  }
};

module.exports = {
  compactFlatten: function(array) {
    return compactFlattenIfNeeded(array);
  }
};


/***/ }),
/* 4 */
/*!****************************************************************************!*\
  !*** ./sourceWithoutNeptuneNamespaces/CaffeineScript/Runtime/Types.coffee ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var isFunction, isNonNegativeInt;

isNonNegativeInt = function(x) {
  return ((x | 0) === x) && x >= 0;
};

module.exports = {

  /*
    https://jsperf.com/array-isarray-vs-instanceof-array/42
    as-of 2019-6-14
    Array.isArray vs o.constructor == Array
    Virtualy the same: Chrome, Safari, FireFox
    Edge18: constructor-test 6x faster
   */
  isPlainArray: function(o) {
    return (o != null) && o.constructor === Array;
  },
  isFunction: isFunction = function(a) {
    return typeof a === "function";
  },
  isArrayIterable: function(source) {
    return (source != null) && isNonNegativeInt(source.length) && isFunction(source.indexOf) && source.constructor !== Object;
  }
};


/***/ }),
/* 5 */
/*!********************************************************************************!*\
  !*** ./sourceWithoutNeptuneNamespaces/CaffeineScript/Runtime/Iteration.coffee ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var each, extendedEach, isArrayIterable;

isArrayIterable = __webpack_require__(/*! ./Types */ 4).isArrayIterable;


/*
Notes:

Comprehension loop variables are always going to mask any variables
defined in a higher scope.

With e/ee we put all the when, with and key blocks in the same function,
so they naturally share one loop-scope.
 */

module.exports = {

  /*
  IN:
    source:
      array-like (source.length is a number >= 0)
      null or undefined
      otherwise, properties are iterated
  
    out: the value that will be returned.
      out is initialized to source if out == undefined.
      This is for convenience and code-reduction in the "each-without-into-set" case.
  
    withBlock: (currentIterationValue, currentIterationKey, returning) -> ignored
  
  USE: object, array, each
   */
  each: each = function(source, out, withBlock) {
    var i, k, len, v;
    if (out == null) {
      out = source;
    }
    if (source != null) {
      if (isArrayIterable(source)) {
        for (k = i = 0, len = source.length; i < len; k = ++i) {
          v = source[k];
          withBlock(v, k, out);
        }
      } else {
        for (k in source) {
          v = source[k];
          withBlock(v, k, out);
        }
      }
    }
    return out;
  },
  e: each,

  /*
  enhanced-each
  
  Different from each :
    updating-out:   out is updated with the result of every withBlock call
    break-support:  withBlock is passed a forth argument: setShouldBreak
  
    NOTE: out is only initialized to source, if out == undefined. Any updated out
    could be set to undefined and that would be returned.
  
  setShouldBreak:
    IN: ()
    OUT: the undefined value
    EFFECT: this will be the last call to withBlock &
      the value returned by this last call will be the result
      of ee.
  
  This should be enough for all features:
    - "return" - requires a setShouldReturn function in the enclosing scope, and setShouldBreak
    - "next" - becomes a return-statement in withBlock - this works with the basic "e"
    - "break" - setShouldBreak();return out;
    - "break value" - setShouldBreak();return value;
    - "reduce" iteration - needs updating-out
    - "find" iteration - needs break-with-value
  
  Cons:
    possible performance and code-size hit:
    - ee requires more code in the withBlock: {...; return out;}
    - ee creates a setShouldBreak function every time
  
    But, with testing, we may decided those don't really matter.
  
  EXAMPLES:
  
    find v from o with v > 10
  
    Caf.ee o, null, (v, k, out, brk) ->
      brk v if v > 10
  
  
    reduce v1, v2 from o with f v1, v2
  
     * I think we need to remove the out = source default.
  
    Caf.ee o, undefined, (v2, k, v1, brk) ->
      if v1 == undefined
        v2
      else
        f v1, v2
  
     * example: object v from o with v + 1
    Caf.e(o, {}, function(v, k, into) {
      return into[k] = v + 1;
    });
  
     * example: object v from o when v > 3 with v + 1
    Caf.e(o, {}, function(v, k, into) {
      if( v > 3 ) {
        return into[k] = v + 1;
      };
    });
  
     * example: object o
    Caf.e(o, {}, function(v, k, into) {
      return into[k] = v;
    });
   */
  extendedEach: extendedEach = function(source, out, withBlock) {
    var i, k, len, setShouldBreak, shouldBreak, v;
    if (out === "undefined") {
      out = source;
    }
    if (source != null) {
      shouldBreak = false;
      setShouldBreak = function() {
        shouldBreak = true;
        return void 0;
      };
      if (isArrayIterable(source)) {
        for (k = i = 0, len = source.length; i < len; k = ++i) {
          v = source[k];
          out = withBlock(v, k, out, setShouldBreak);
          if (shouldBreak) {
            break;
          }
        }
      } else {
        for (k in source) {
          v = source[k];
          out = withBlock(v, k, out, setShouldBreak);
          if (shouldBreak) {
            break;
          }
        }
      }
    }
    return out;
  },
  ee: extendedEach
};


/***/ }),
/* 6 */
/*!*********************************************************************************!*\
  !*** ./sourceWithoutNeptuneNamespaces/CaffeineScript/Runtime/Iteration2.coffee ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var existsTest, isArrayIterable, returnFirst, returnSecond, returnTrue;

isArrayIterable = __webpack_require__(/*! ./Types */ 4).isArrayIterable;

existsTest = function(a) {
  return a != null;
};

returnTrue = function() {
  return true;
};

returnFirst = function(a) {
  return a;
};

returnSecond = function(a, b) {
  return b;
};

module.exports = {
  isArrayIterable: isArrayIterable,
  find: function(source, withClause, whenClause) {
    var i, j, k, l, len, len1, len2, result, v;
    if (source != null) {
      if (!(whenClause || withClause)) {
        whenClause = existsTest;
      }
      if (isArrayIterable(source)) {
        switch (false) {
          case !(whenClause && withClause):
            for (k = i = 0, len = source.length; i < len; k = ++i) {
              v = source[k];
              if (whenClause(v, k)) {
                return withClause(v, k);
              }
            }
            break;
          case !whenClause:
            for (k = j = 0, len1 = source.length; j < len1; k = ++j) {
              v = source[k];
              if (whenClause(v, k)) {
                return v;
              }
            }
            break;
          case !withClause:
            for (k = l = 0, len2 = source.length; l < len2; k = ++l) {
              v = source[k];
              if (result = withClause(v, k)) {
                return result;
              }
            }
        }
      } else {
        switch (false) {
          case !(whenClause && withClause):
            for (k in source) {
              v = source[k];
              if (whenClause(v, k)) {
                return withClause(v, k);
              }
            }
            break;
          case !whenClause:
            for (k in source) {
              v = source[k];
              if (whenClause(v, k)) {
                return v;
              }
            }
            break;
          case !withClause:
            for (k in source) {
              v = source[k];
              if (result = withClause(v, k)) {
                return result;
              }
            }
        }
      }
    }
    return null;
  },
  object: function(source, withClause, whenClause, into, keyClause) {
    var i, k, len, v;
    if (withClause == null) {
      withClause = returnFirst;
    }
    if (whenClause == null) {
      whenClause = returnTrue;
    }
    if (into == null) {
      into = {};
    }
    if (isArrayIterable(source)) {
      if (keyClause == null) {
        keyClause = returnFirst;
      }
      for (k = i = 0, len = source.length; i < len; k = ++i) {
        v = source[k];
        if (whenClause(v, k)) {
          into[keyClause(v, k)] = withClause(v, k);
        }
      }
    } else {
      if (keyClause == null) {
        keyClause = returnSecond;
      }
      for (k in source) {
        v = source[k];
        if (whenClause(v, k)) {
          into[keyClause(v, k)] = withClause(v, k);
        }
      }
    }
    return into;
  },
  reduce: function(source, withClause, whenClause, inject) {
    var i, k, len, v;
    if (withClause == null) {
      withClause = returnFirst;
    }
    if (whenClause == null) {
      whenClause = returnTrue;
    }
    if (isArrayIterable(source)) {
      for (k = i = 0, len = source.length; i < len; k = ++i) {
        v = source[k];
        if (v !== void 0 && whenClause(inject, v, k)) {
          inject = inject === void 0 ? v : withClause(inject, v, k);
        }
      }
    } else {
      for (k in source) {
        v = source[k];
        if (v !== void 0 && whenClause(inject, v, k)) {
          inject = inject === void 0 ? v : withClause(inject, v, k);
        }
      }
    }
    return inject;
  },
  array: function(source, withClause, whenClause, into) {
    var i, k, len, v;
    if (withClause == null) {
      withClause = returnFirst;
    }
    if (whenClause == null) {
      whenClause = returnTrue;
    }
    if (into == null) {
      into = [];
    }
    if (isArrayIterable(source)) {
      for (k = i = 0, len = source.length; i < len; k = ++i) {
        v = source[k];
        if (whenClause(v, k)) {
          into.push(withClause(v, k));
        }
      }
    } else {
      for (k in source) {
        v = source[k];
        if (whenClause(v, k)) {
          into.push(withClause(v, k));
        }
      }
    }
    return into;
  },
  each2: function(source, withClause, whenClause, into) {
    var i, k, len, v;
    if (withClause == null) {
      withClause = returnFirst;
    }
    if (whenClause == null) {
      whenClause = returnTrue;
    }
    if (into == null) {
      into = source;
    }
    if (isArrayIterable(source)) {
      for (k = i = 0, len = source.length; i < len; k = ++i) {
        v = source[k];
        if (whenClause(v, k)) {
          withClause(v, k);
        }
      }
    } else {
      for (k in source) {
        v = source[k];
        if (whenClause(v, k)) {
          withClause(v, k);
        }
      }
    }
    return into;
  }
};


/***/ }),
/* 7 */
/*!**************************************************************************!*\
  !*** ./sourceWithoutNeptuneNamespaces/CaffeineScript/Runtime/Lib.coffee ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getSuper, isDirectPrototypeOf, isFunction, isPlainArray, ref,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

__webpack_require__(/*! ./Global */ 2);

ref = __webpack_require__(/*! ./Types */ 4), isPlainArray = ref.isPlainArray, isFunction = ref.isFunction;

global.__definingModule = null;

isDirectPrototypeOf = function(o, prototype) {
  return !isFunction(o) && prototype.constructor === o.constructor;
};

module.exports = {
  "in": function(a, b) {
    if (b != null) {
      return 0 <= b.indexOf(a);
    } else {
      return false;
    }
  },
  mod: function(a, b) {
    return modulo(a, b);
  },
  div: function(a, b) {
    return Math.floor(a / b);
  },
  pow: function(a, b) {
    return Math.pow(a, b);
  },
  existsOr: function(a, b) {
    return a != null ? a : b();
  },
  exists: function(a) {
    return (a != null) || void 0;
  },

  /*
    TOFIX (in Console): this fails for built-in types in CaffeineMC's Console,
      and if you define a function identical to this, within the console,
      it WILL work. Why?
        Because there are two JS environments running, and atomic values
        are passed as atomics and their "Type" changes - to an identical
        copy of the same type, but !== to the type you passed in.
  
      e.g.: this returns false in the console: "true is Boolean"
      Solution: stop using Node's stupid interactive console, or
        can we ensure that ALL code is evaled in the same environment?
    NOTE - this also will fail, differently, across iFrames in the browser- since they
      have different javascript environments.
   */
  is: function(a, b) {
    return a === b || ((a != null) && (b != null) && a.constructor === b);
  },
  toString: function(a) {
    if (a != null) {
      if (isPlainArray(a)) {
        return a.join('');
      } else if (isFunction(a != null ? a.toString : void 0)) {
        return a.toString();
      } else {

      }
    } else {
      return '';
    }
  },

  /*
    All about getSuper in ES6 land:
  
      class A {}
      class B extends A {}
      class C extends B {}
  
      a = new A
      b = new B
      c = new C
  
      getSuper(B) == A
      getSuper(C) == B
  
      getSuper(A.prototype) == Object.prototype
      getSuper(B.prototype) == A.prototype
      getSuper(C.prototype) == B.prototype
  
      getSuper(b) == A.prototype
      getSuper(c) == B.prototype
  
    prototype map:
  
    KEY:
      <->
         <-- .constructor
         --> .prototype
      ^  Object.prototypeOf
  
    MAP:
      A <-> aPrototype
  
      ^     ^     ^
      |     |     a
      |     |
  
      B <-> bPrototype
  
      ^     ^     ^
      |     |     b
      |     |
  
      C <-> cPrototype
  
                  ^
                  c
  
    Definition of super:
  
      if instance then prototype's prototype
      else prototype
   */
  getSuper: getSuper = function(o) {
    var _super, out;
    if (!((typeof o === "object") || (typeof o === "function"))) {
      throw new Error("getSuper expecting an object");
    }
    _super = Object.getPrototypeOf(o);
    out = _super === Function.prototype && o.__super__ ? o.__super__.constructor : isDirectPrototypeOf(o, _super) ? Object.getPrototypeOf(_super) : _super;
    return out;
  },

  /*
    IN:
      klass a new class-function object
      init: (klass) -> outKlass
  
    OUT: if isF outKlass.createWithPostCreate
      outKlass.createWithPostCreate outKlass
    OR
      outKlass (from init)
  
    EFFECT:
      outKlass.createWithPostCreate?(outKlass) ? outKlass
   */
  defClass: function(klass, init) {
    var ref1;
    if (init != null) {
      init.call(klass, klass, getSuper(klass), getSuper(klass.prototype));
    }
    return (ref1 = typeof klass.createWithPostCreate === "function" ? klass.createWithPostCreate(klass) : void 0) != null ? ref1 : klass;
  },
  getModuleBeingDefined: function() {
    return global.__definingModule;
  },

  /*
    IN:
      _module: module form currently defined module
      defineFunction
   */
  defMod: function(_module, a) {
    var lastModule, result;
    lastModule = global.__definingModule;
    global.__definingModule = _module;
    result = _module.exports = a();
    global.__definingModule = lastModule;
    return result;
  },
  isFunction: isFunction,
  isF: isFunction
};


/***/ }),
/* 8 */
/*!*****************************************************************************!*\
  !*** ./sourceWithoutNeptuneNamespaces/CaffeineScript/Runtime/Import.coffee ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var compactFlatten, throwImportError, throwImportErrors;

compactFlatten = __webpack_require__(/*! ./ArrayCompactFlatten */ 3).compactFlatten;

throwImportErrors = __webpack_require__(/*! detect-node */ 9);

throwImportError = function(notFound, importNames, libs) {
  var i, importFileName, importFrom, len, lib, line, ref, ref1, stack;
  importFrom = ((function() {
    var i, len, results;
    results = [];
    for (i = 0, len = libs.length; i < len; i++) {
      lib = libs[i];
      if (lib === global) {
        results.push("global");
      } else if (lib != null) {
        results.push(lib.namespacePath || (typeof lib.getName === "function" ? lib.getName() : void 0) || ("{" + (Object.keys(lib).join(', ')) + "}"));
      } else {
        results.push('null');
      }
    }
    return results;
  })()).join('\n  ');
  importFileName = null;
  ref = (stack = (new Error).stack).split("\n");
  for (i = 0, len = ref.length; i < len; i++) {
    line = ref[i];
    if (!line.match(/caffeine-script-runtime/)) {
      if (importFileName != null ? importFileName : importFileName = (ref1 = line.match(/(\/[^\/]+)+\.(caf|js)\b/i)) != null ? ref1[0] : void 0) {
        break;
      }
    }
  }
  console.warn("CaffieneScript imports not found:\n  " + (notFound.join('\n  ')) + "\n\nimporting from:\n  " + importFrom + "\n\nsource:\n  " + (importFileName != null ? importFileName : stack) + "\n");
  if (throwImportErrors) {
    throw new Error("CaffieneScript imports not found: " + (notFound.join(', ')));
  }
};

module.exports = {

  /*
  IN:
    importNames: array of strings
    libs: array of objects to import from, with arbitrary subarray nesting
    toInvoke: function
  
  EFFECT:
    for each import-name, libs are searched in reverse order for a value with that name.
      if no value is found, an error is down with and information is provided.
  
    toInvoke is called with each of the values found in order as arugments.
    the value form toInvoke is returned
  
  EXAMPLE:
    importInvoke(["a", "b"], [a:1, b:2], toInvoke)
    EFFECT: return toInvoke 1, 2
   */
  importInvoke: function(importNames, libs, toInvoke) {
    var importName, importValue, importValues, lib, notFound, v;
    notFound = null;
    libs = compactFlatten(libs);
    importValues = (function() {
      var i, j, len, results;
      results = [];
      for (i = 0, len = importNames.length; i < len; i++) {
        importName = importNames[i];
        importValue = null;
        for (j = libs.length - 1; j >= 0; j += -1) {
          lib = libs[j];
          if ((v = lib[importName]) != null) {
            importValue = v;
            break;
          }
        }
        if (importValue != null) {
          results.push(importValue);
        } else {
          (notFound || (notFound = [])).push(importName);
          results.push(new Error("CaffieneScript import not found: " + importName));
        }
      }
      return results;
    })();
    if (notFound != null) {
      throwImportError(notFound, importNames, libs);
    }
    return toInvoke.apply(null, importValues);
  }
};


/***/ }),
/* 9 */
/*!******************************************************************************!*\
  !*** external "require('detect-node' /* ABC - not inlining fellow NPM *_/)" ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('detect-node' /* ABC - not inlining fellow NPM */);

/***/ })
/******/ ]);