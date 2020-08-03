"use strict";
let Caf = require("caffeine-script-runtime");
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
      require("art-standard-lib"),
      require("art-class-system"),
      require("caffeine-eight"),
      require("./Base64")
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
                      require("path").relative(
                        this._sourceRoot,
                        this._sourceFile
                      )
                  : this._sourceFile;
              },
              rawSourceMap: function() {
                let temp;
                return merge({
                  version: 3,
                  file: (temp = this.generatedFile) != null ? temp : "",
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
            lastStartIndex = null;
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