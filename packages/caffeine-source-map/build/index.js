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
/*!*******************!*\
  !*** ./index.caf ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return __webpack_require__(/*! ./source */ 3);
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 1 */
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
/* 2 */
/*!*****************************************************************************************!*\
  !*** external "require('caffeine-script-runtime' /* ABC - not inlining fellow NPM *_/)" ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('caffeine-script-runtime' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 3 */
/*!**************************!*\
  !*** ./source/index.caf ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return __webpack_require__(/*! ./Caffeine.SourceMap */ 4);
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 4 */
/*!************************************************!*\
  !*** ./source/Caffeine.SourceMap/index.coffee ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./namespace */ 5);

module.exports.includeInNamespace(__webpack_require__(/*! ./SourceMap */ 8)).addModules({
  Base64: __webpack_require__(/*! ./Base64 */ 12),
  SourceMapConsumer: __webpack_require__(/*! ./SourceMapConsumer */ 16),
  SourceMapGenerator: __webpack_require__(/*! ./SourceMapGenerator */ 13),
  SourceNode: __webpack_require__(/*! ./SourceNode */ 17),
  StandardImport: __webpack_require__(/*! ./StandardImport */ 9)
});


/***/ }),
/* 5 */
/*!****************************************************!*\
  !*** ./source/Caffeine.SourceMap/namespace.coffee ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var SourceMap,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(/*! neptune-namespaces */ 6)).addNamespace('Caffeine.SourceMap', SourceMap = (function(superClass) {
  extend(SourceMap, superClass);

  function SourceMap() {
    return SourceMap.__super__.constructor.apply(this, arguments);
  }

  SourceMap.version = __webpack_require__(/*! ../../package.json */ 7).version;

  return SourceMap;

})(Neptune.PackageNamespace));


/***/ }),
/* 6 */
/*!************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 7 */
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, dependencies, description, license, name, scripts, version, default */
/***/ (function(module) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*","art-standard-lib":"*","caffeine-eight":"*"},"description":"Caffeine.SourceMap","license":"ISC","name":"caffeine-source-map","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd","testInBrowser":"webpack-dev-server --progress"},"version":"2.0.0"};

/***/ }),
/* 8 */
/*!*************************************************!*\
  !*** ./source/Caffeine.SourceMap/SourceMap.caf ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["merge"],
    [global, __webpack_require__(/*! ./StandardImport */ 9)],
    merge => {
      return merge(
        __webpack_require__(/*! ./Base64 */ 12),
        __webpack_require__(/*! ./SourceMapGenerator */ 13),
        __webpack_require__(/*! ./SourceMapConsumer */ 16)
      );
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 9 */
/*!******************************************************!*\
  !*** ./source/Caffeine.SourceMap/StandardImport.caf ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return __webpack_require__(/*! art-standard-lib */ 10).merge(
    __webpack_require__(/*! art-standard-lib */ 10),
    __webpack_require__(/*! art-class-system */ 11)
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 10 */
/*!**********************************************************************************!*\
  !*** external "require('art-standard-lib' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-standard-lib' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 11 */
/*!**********************************************************************************!*\
  !*** external "require('art-class-system' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-class-system' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 12 */
/*!**********************************************!*\
  !*** ./source/Caffeine.SourceMap/Base64.caf ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return (() => {
    let vlqBaseShift,
      vlqBase,
      vlqBaseMask,
      vlqContinuationBit,
      intToCharMap,
      charMapToInt,
      getBase64char,
      toVlqSigned,
      fromVlqSigned,
      encodeVlq,
      readVlq,
      readVlqSequence;
    return {
      vlqBaseShift: (vlqBaseShift = 5),
      vlqBase: (vlqBase = 1 << vlqBaseShift),
      vlqBaseMask: (vlqBaseMask = vlqBase - 1),
      vlqContinuationBit: (vlqContinuationBit = vlqBase),
      intToCharMap: (intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
        ""
      )),
      charMapToInt: (charMapToInt = Caf.object(intToCharMap, (v, k) => k)),
      getBase64char: (getBase64char = function(number) {
        return intToCharMap[number];
      }),
      toVlqSigned: (toVlqSigned = function(value) {
        return value < 0 ? (-value << 1) + 1 : value << 1;
      }),
      fromVlqSigned: (fromVlqSigned = function(value) {
        return value & 1 ? 0 - (value >> 1) : value >> 1;
      }),
      encodeVlq: (encodeVlq = function(value) {
        let encoded, vlq, digit;
        return value === 0
          ? "A"
          : ((encoded = ""),
            (vlq = toVlqSigned(value)),
            (() => {
              while (vlq > 0) {
                digit = vlq & vlqBaseMask;
                encoded += getBase64char(
                  0 < (vlq >>>= vlqBaseShift)
                    ? digit | vlqContinuationBit
                    : digit
                );
              }
            })(),
            encoded);
      }),
      readVlq: (readVlq = function(string, resultObject = { index: 0 }) {
        let index, number, shiftAmount, read;
        ({ index } = resultObject);
        number = 0;
        shiftAmount = 0;
        return charMapToInt[string[index]] != null
          ? ((() => {
              while (
                vlqContinuationBit & (read = charMapToInt[string[index++]])
              ) {
                number += (read & vlqBaseMask) << shiftAmount;
                shiftAmount += vlqBaseShift;
              }
            })(),
            (resultObject.index = index),
            (resultObject.value = fromVlqSigned(
              number + (read << shiftAmount)
            )),
            resultObject)
          : undefined;
      }),
      readVlqSequence: (readVlqSequence = function(
        string,
        resultObject = { index: 0 }
      ) {
        let out, result;
        out = [];
        while ((result = readVlq(string, resultObject))) {
          out.push(result.value);
        }
        return out;
      })
    };
  })();
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 13 */
/*!**********************************************************!*\
  !*** ./source/Caffeine.SourceMap/SourceMapGenerator.caf ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseClass",
      "JSON",
      "merge",
      "encodeVlq",
      "String",
      "Array",
      "SourceLineColumnMap"
    ],
    [
      global,
      __webpack_require__(/*! art-standard-lib */ 10),
      __webpack_require__(/*! art-class-system */ 11),
      __webpack_require__(/*! caffeine-eight */ 14),
      __webpack_require__(/*! ./Base64 */ 12)
    ],
    (BaseClass, JSON, merge, encodeVlq, String, Array, SourceLineColumnMap) => {
      let SourceMapGenerator;
      return (SourceMapGenerator = Caf.defClass(
        class SourceMapGenerator extends BaseClass {
          constructor(source, options) {
            super(...arguments);
            this.source = source;
            this.sourceFile = options.sourceFile;
            this.generatedFile = options.generatedFile;
            this.sourceRoot = options.sourceRoot;
            this._js = "";
            this._mappings = "";
            this._lastSourceLine = this._lastSourceColumn = this._lastGeneratedColumn = this._nextGeneratedColumn = 0;
            this._firstSegment = true;
            this._lastSourceIndex = -1;
            this._sourceLineColumnMap = new SourceLineColumnMap(this.source);
          }
        },
        function(SourceMapGenerator, classSuper, instanceSuper) {
          let reusableColLine;
          this.property("source", "sourceFile", "generatedFile", "sourceRoot");
          this.getter(
            "js",
            "mappings",
            "lastSourceLine",
            "lastSourceColumn",
            "lastGeneratedColumn",
            "nextGeneratedColumn",
            {
              status: function() {
                return {
                  lastSourceLine: this.lastSourceLine,
                  lastSourceColumn: this.lastSourceColumn,
                  lastGeneratedColumn: this.lastGeneratedColumn,
                  nextGeneratedColumn: this.nextGeneratedColumn,
                  mappings: this.mappings
                };
              },
              sourceMap: function() {
                return JSON.stringify(this.rawSourceMap);
              },
              sourceFile: function() {
                return this._sourceRoot
                  ? "./" +
                      __webpack_require__(/*! path */ 15).relative(
                        this._sourceRoot,
                        this._sourceFile
                      )
                  : this._sourceFile;
              },
              rawSourceMap: function() {
                let cafTemp;
                return merge({
                  version: 3,
                  file: (cafTemp = this.generatedFile) != null ? cafTemp : "",
                  sourceRoot: this.sourceFile && "",
                  sources: this.sourceFile && [this.sourceFile],
                  sourceContent: [this.source],
                  names: [],
                  mappings: this.mappings
                });
              },
              inspectedObjects: function() {
                return this.rawSourceMap;
              }
            }
          );
          this.prototype.addLine = function() {
            this._mappings += ";";
            this._lastGeneratedColumn = 0;
            return (this._firstSegment = true);
          };
          reusableColLine = {};
          this.prototype.addSegment = function(sourceIndex) {
            let line, column, out;
            return sourceIndex != null && sourceIndex !== this._lastSourceIndex
              ? ((this._lastSourceIndex = sourceIndex),
                ({ line, column } = this._sourceLineColumnMap.getLineColumn(
                  sourceIndex,
                  reusableColLine
                )),
                (out =
                  encodeVlq(
                    this._nextGeneratedColumn - this._lastGeneratedColumn
                  ) +
                  "A" +
                  encodeVlq(line - this._lastSourceLine) +
                  encodeVlq(column - this._lastSourceColumn)),
                (this._lastGeneratedColumn = this._nextGeneratedColumn),
                (this._lastSourceLine = line),
                (this._lastSourceColumn = column),
                this._firstSegment
                  ? (this._firstSegment = false)
                  : (this._mappings += ","),
                (this._mappings += out))
              : undefined;
          };
          this.prototype.advance = function(generatedString) {
            let index, lineAdded, lastStartIndex;
            index = -1;
            lineAdded = false;
            while (
              0 <=
              (index = generatedString.indexOf(
                "\n",
                (lastStartIndex = index + 1)
              ))
            ) {
              lineAdded = true;
              this.addLine();
            }
            return lineAdded
              ? (this._nextGeneratedColumn =
                  generatedString.length - lastStartIndex)
              : (this._nextGeneratedColumn += generatedString.length);
          };
          this.prototype.add = function(output) {
            let sourceIndex, children;
            switch (false) {
              case !Caf.is(output, String):
                this._js += output;
                this.advance(output);
                break;
              case !(Caf.exists(output) && output.children):
                ({ sourceIndex, children } = output);
                this.addSegment(sourceIndex);
                this.add(children);
                break;
              case !Caf.is(output, Array):
                Caf.each2(
                  output,
                  child => this.add(child),
                  child => child != null
                );
            }
            return this;
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 14 */
/*!********************************************************************************!*\
  !*** external "require('caffeine-eight' /* ABC - not inlining fellow NPM *_/)" ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('caffeine-eight' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 15 */
/*!**********************************************************************!*\
  !*** external "require('path' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('path' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 16 */
/*!*********************************************************!*\
  !*** ./source/Caffeine.SourceMap/SourceMapConsumer.caf ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "readVlqSequence", "Error", "String", "JSON"],
    [
      global,
      __webpack_require__(/*! art-standard-lib */ 10),
      __webpack_require__(/*! art-class-system */ 11),
      __webpack_require__(/*! caffeine-eight */ 14),
      __webpack_require__(/*! ./Base64 */ 12)
    ],
    (BaseClass, readVlqSequence, Error, String, JSON) => {
      let SourceMapConsumer;
      return (SourceMapConsumer = Caf.defClass(
        class SourceMapConsumer extends BaseClass {
          constructor(sourceMap) {
            super(...arguments);
            if (Caf.is(sourceMap, String)) {
              sourceMap = JSON.parse(sourceMap);
            }
            this.sourceMap = sourceMap;
          }
        },
        function(SourceMapConsumer, classSuper, instanceSuper) {
          this.getter({
            mappings: function() {
              return this.sourceMap.mappings;
            },
            sources: function() {
              return this.sourceMap.sources;
            },
            names: function() {
              return this.sourceMap.names;
            },
            inspectedObjects: function() {
              return {
                sourceMap: this.sourceMap,
                decodedMappings: this.decodedMappings
              };
            },
            decodedMappings: function() {
              let out, result;
              out = [];
              while ((result = this.readMapping(this.mappings, result))) {
                if (result.mapping) {
                  out.push(result.mapping);
                }
              }
              return out;
            }
          });
          this.prototype.readMapping = function(
            mappings = this.mappings,
            result
          ) {
            let index,
              genColDelta,
              srcDelta,
              srcLineDelta,
              srcColDelta,
              nameDelta,
              m;
            ({ index } =
              result != null
                ? result
                : (result = {
                    index: 0,
                    generatedLine: 0,
                    generatedColumn: 0,
                    sourceLine: 0,
                    sourceColumn: 0,
                    source: 0,
                    sourceNameIndex: 0,
                    mapping: null
                  }));
            result.mapping = null;
            return index < mappings.length
              ? ((() => {
                  switch (mappings[index]) {
                    case ";":
                      result.index++;
                      result.generatedColumn = 0;
                      return result.generatedLine++;
                    case ",":
                      return result.index++;
                    default:
                      [
                        genColDelta,
                        srcDelta,
                        srcLineDelta,
                        srcColDelta,
                        nameDelta
                      ] = readVlqSequence(mappings, result);
                      if (!(genColDelta != null)) {
                        throw new Error(
                          `invalid mapping at ${Caf.toString(
                            index
                          )}, char: ${Caf.toString(mappings[index])}`
                        );
                      }
                      m = result.mapping = {};
                      m.generatedLine = result.generatedLine;
                      m.generatedColumn = result.generatedColumn += genColDelta;
                      if (srcDelta != null) {
                        m.source = result.source += srcDelta;
                      }
                      if (srcLineDelta != null) {
                        m.sourceLine = result.sourceLine += srcLineDelta;
                      }
                      if (srcColDelta != null) {
                        m.sourceColumn = result.sourceColumn += srcColDelta;
                      }
                      return nameDelta != null
                        ? (m.sourceNameIndex = result.sourceNameIndex += nameDelta)
                        : undefined;
                  }
                })(),
                result)
              : undefined;
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 17 */
/*!**************************************************!*\
  !*** ./source/Caffeine.SourceMap/SourceNode.caf ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseClass",
      "toInspectedObjects",
      "compactFlatten",
      "merge",
      "deepMerge",
      "SourceMapGenerator",
      "binary",
      "String"
    ],
    [
      global,
      __webpack_require__(/*! art-standard-lib */ 10),
      __webpack_require__(/*! art-class-system */ 11),
      __webpack_require__(/*! art-binary */ 18),
      { SourceMapGenerator: __webpack_require__(/*! ./SourceMapGenerator */ 13) }
    ],
    (
      BaseClass,
      toInspectedObjects,
      compactFlatten,
      merge,
      deepMerge,
      SourceMapGenerator,
      binary,
      String
    ) => {
      let SourceNode;
      return (SourceNode = Caf.defClass(
        class SourceNode extends BaseClass {
          constructor(sourceIndex, children) {
            super(...arguments);
            this.sourceIndex = sourceIndex;
            this.children = children;
            this._props = null;
            this._flattenedChildren = null;
          }
        },
        function(SourceNode, classSuper, instanceSuper) {
          this.property("sourceIndex", "children", "props");
          this.getter({
            inspectedObjects: function() {
              return {
                sourceIndex: this.sourceIndex,
                props: this.props,
                children: toInspectedObjects(this.children)
              };
            }
          });
          this.getter({
            flattenedChildren: function() {
              let cafTemp;
              return (cafTemp = this._flattenedChildren) != null
                ? cafTemp
                : (this._flattenedChildren = compactFlatten(this.children));
            },
            mergedProps: function() {
              let out;
              if (this._props) {
                out = merge(this._props);
              }
              Caf.each2(this.flattenedChildren, child => {
                let mergedProps;
                return (mergedProps = child.mergedProps)
                  ? (out = out ? deepMerge(out, mergedProps) : mergedProps)
                  : undefined;
              });
              return out;
            }
          });
          this.prototype.withProps = function(_props) {
            this._props = _props;
            return this;
          };
          this.prototype.generate = function(source, options) {
            let sourceFile, sourceRoot, inlineMap, js, sourceMap, out;
            ({ sourceFile, sourceRoot, inlineMap } = options);
            ({ js, sourceMap } = out = new SourceMapGenerator(
              source,
              options
            ).add(this));
            return inlineMap
              ? {
                  sourceMap,
                  js: [
                    js,
                    `//# sourceMappingURL=${Caf.toString(
                      binary(sourceMap).toDataUri("application/json", true)
                    )}`,
                    sourceFile
                      ? (sourceRoot
                          ? (sourceFile =
                              "./" +
                              __webpack_require__(/*! path */ 15).relative(sourceRoot, sourceFile))
                          : undefined,
                        `//# sourceURL=${Caf.toString(sourceFile)}`)
                      : undefined
                  ].join("\n")
                }
              : out;
          };
          this.prototype.toString = function(output = { js: "" }) {
            Caf.each2(
              this.flattenedChildren,
              child =>
                Caf.is(child, String)
                  ? (output.js += child)
                  : child.toString(output)
            );
            return output.js;
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 18 */
/*!****************************************************************************!*\
  !*** external "require('art-binary' /* ABC - not inlining fellow NPM *_/)" ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-binary' /* ABC - not inlining fellow NPM */);

/***/ })
/******/ ]);