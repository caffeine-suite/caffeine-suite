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
      "String"
    ],
    [
      global,
      require("art-standard-lib"),
      require("art-class-system"),
      require("art-binary"),
      { SourceMapGenerator: require("./SourceMapGenerator") }
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
              let temp;
              return (temp = this._flattenedChildren) != null
                ? temp
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
                              require("path").relative(sourceRoot, sourceFile))
                          : undefined,
                        `//# sourceURL=${Caf.toString(sourceFile)}`)
                      : undefined
                  ].join("\n")
                }
              : out;
          };
          this.prototype.toString = function(output = { js: "" }) {
            Caf.each2(this.flattenedChildren, child =>
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
