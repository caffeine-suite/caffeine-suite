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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports) {

module.exports = require('caffeine-script-runtime' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require('art-standard-lib' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require('art-class-system' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
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
      __webpack_require__(2),
      __webpack_require__(4),
      __webpack_require__(8),
      __webpack_require__(3)
    ],
    (BaseClass, JSON, merge, encodeVlq, String, Array, SourceLineColumnMap) => {
      let SourceMapGenerator;
      return (SourceMapGenerator = Caf.defClass(
        class SourceMapGenerator extends BaseClass {
          constructor(source, sourceFileName, generatedFileName) {
            super(...arguments);
            this.source = source;
            this.sourceFileName = sourceFileName;
            this.generatedFileName = generatedFileName;
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
          this.property("source", "sourceFileName", "generatedFileName");
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
              rawSourceMap: function() {
                let cafTemp;
                return merge({
                  version: 3,
                  file:
                    (cafTemp = this.generatedFileName) != null ? cafTemp : "",
                  sourceRoot: this.sourceFileName && "",
                  sources: this.sourceFileName && [this.sourceFileName],
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "readVlqSequence", "Error", "String", "JSON"],
    [
      global,
      __webpack_require__(2),
      __webpack_require__(4),
      __webpack_require__(8),
      __webpack_require__(3)
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  return __webpack_require__(2).merge(
    __webpack_require__(2),
    __webpack_require__(4)
  );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require('caffeine-eight' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  return __webpack_require__(13);
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  return __webpack_require__(9);
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["merge"],
    [global, __webpack_require__(7)],
    merge => {
      return merge(
        __webpack_require__(3),
        __webpack_require__(5),
        __webpack_require__(6)
      );
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseClass",
      "toInspectedObjects",
      "SourceMapGenerator",
      "String",
      "Array"
    ],
    [
      global,
      __webpack_require__(2),
      __webpack_require__(4),
      { SourceMapGenerator: __webpack_require__(5) }
    ],
    (BaseClass, toInspectedObjects, SourceMapGenerator, String, Array) => {
      let SourceNode;
      return (SourceNode = Caf.defClass(
        class SourceNode extends BaseClass {
          constructor(sourceIndex, children) {
            super(...arguments);
            this.sourceIndex = sourceIndex;
            this.children = children;
          }
        },
        function(SourceNode, classSuper, instanceSuper) {
          this.property("sourceIndex", "children");
          this.getter({
            inspectedObjects: function() {
              return {
                sourceIndex: this.sourceIndex,
                children: toInspectedObjects(this.children)
              };
            }
          });
          this.prototype.generate = function(source, sourceFileName) {
            return new SourceMapGenerator(source, sourceFileName).add(this);
          };
          this.prototype.toString = function(source, output = { js: "" }) {
            source != null ? source : (source = this.children);
            switch (false) {
              case !Caf.is(source, String):
                output.js += source;
                break;
              case !Caf.is(source, Array):
                Caf.each2(
                  source,
                  child => this.toString(child, output),
                  child => child != null
                );
                break;
              case !Caf.is(source, SourceNode):
                source.toString(null, output);
            }
            return output.js;
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);

module.exports.includeInNamespace(__webpack_require__(11)).addModules({
  Base64: __webpack_require__(3),
  SourceMapConsumer: __webpack_require__(6),
  SourceMapGenerator: __webpack_require__(5),
  SourceNode: __webpack_require__(12),
  StandardImport: __webpack_require__(7)
});


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var SourceMap,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(16)).addNamespace('Caffeine.SourceMap', SourceMap = (function(superClass) {
  extend(SourceMap, superClass);

  function SourceMap() {
    return SourceMap.__super__.constructor.apply(this, arguments);
  }

  SourceMap.version = __webpack_require__(15).version;

  return SourceMap;

})(Neptune.PackageNamespace));


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*","art-standard-lib":"*","caffeine-eight":"*"},"description":"Caffeine.SourceMap","license":"ISC","name":"caffeine-source-map","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd --compilers coffee:coffee-script/register","testInBrowser":"webpack-dev-server --progress"},"version":"1.0.2"}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ })
/******/ ]);