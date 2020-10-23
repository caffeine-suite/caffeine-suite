"use strict";
let Caf = require("caffeine-script-runtime");
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
      "getSourceMapPath",
      "getRelativeSourceMapPath",
      "getOutputFileName",
      "String",
    ],
    [
      global,
      require("art-standard-lib"),
      require("art-class-system"),
      require("art-binary"),
      require("./Lib"),
      { SourceMapGenerator: require("./SourceMapGenerator") },
    ],
    (
      BaseClass,
      toInspectedObjects,
      compactFlatten,
      merge,
      deepMerge,
      SourceMapGenerator,
      binary,
      getSourceMapPath,
      getRelativeSourceMapPath,
      getOutputFileName,
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
        function (SourceNode, classSuper, instanceSuper) {
          this.property("sourceIndex", "children", "props");
          this.getter({
            inspectedObjects: function () {
              return {
                sourceIndex: this.sourceIndex,
                props: this.props,
                children: toInspectedObjects(this.children),
              };
            },
          });
          this.getter({
            flattenedChildren: function () {
              let temp;
              return (temp = this._flattenedChildren) != null
                ? temp
                : (this._flattenedChildren = compactFlatten(this.children));
            },
            mergedProps: function () {
              let out;
              if (this._props) {
                out = merge(this._props);
              }
              Caf.each2(this.flattenedChildren, (child) => {
                let mergedProps;
                return (mergedProps = child.mergedProps)
                  ? (out = out ? deepMerge(out, mergedProps) : mergedProps)
                  : undefined;
              });
              return out;
            },
          });
          this.prototype.withProps = function (_props) {
            this._props = _props;
            return this;
          };
          this.prototype.generate = function (source, options) {
            let sourceFile, sourceRoot, inlineMap, js, sourceMap, out;
            sourceFile = options.sourceFile;
            sourceRoot = options.sourceRoot;
            inlineMap = options.inlineMap;
            ({ js, sourceMap } = out = new SourceMapGenerator(
              source,
              options
            ).add(this));
            return inlineMap
              ? {
                  js: [
                    js,
                    `//# sourceMappingURL=${Caf.toString(
                      binary(sourceMap).toDataUri("application/json", true)
                    )}`,
                    sourceFile
                      ? `//# sourceURL=${Caf.toString(
                          getSourceMapPath(sourceRoot, sourceFile)
                        )}`
                      : undefined,
                    "",
                  ].join("\n"),
                }
              : options.sourceMap
              ? {
                  "js.map": sourceMap,
                  js: [
                    js,
                    `//# sourceMappingURL=${Caf.toString(
                      getRelativeSourceMapPath(
                        sourceRoot,
                        getOutputFileName(sourceFile, ".js.map")
                      )
                    )}`,
                    "",
                  ].join("\n"),
                }
              : { js };
          };
          this.prototype.toString = function (output = { js: "" }) {
            Caf.each2(this.flattenedChildren, (child) =>
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
