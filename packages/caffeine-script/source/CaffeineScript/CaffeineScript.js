"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["applyTransforms", "mergeInto", "log", "merge"],
    [global, require("art-standard-lib"), require("./Transforms")],
    (applyTransforms, mergeInto, log, merge) => {
      require("./SemanticTree");
      return {
        version: require("../../package.json").version,
        compile: function (source, options = {}) {
          let bare,
            module,
            inlineMap,
            sourceMap,
            sourceFile,
            sourceRoot,
            debug,
            parseTree,
            semanticTree,
            transformedSemanticTree,
            output,
            e,
            temp;
          return (() => {
            try {
              bare = options.bare;
              module = options.module;
              inlineMap = options.inlineMap;
              sourceMap = options.sourceMap;
              sourceFile = options.sourceFile;
              sourceRoot = options.sourceRoot;
              debug = options.debug;
              parseTree = require("./CaffeineScriptParser").parse(
                source,
                options
              );
              semanticTree = parseTree.getStn().validateAll();
              transformedSemanticTree = applyTransforms(
                semanticTree
              ).transform();
              output = transformedSemanticTree.toJsUsingSourceNode({
                module: (temp = module) != null ? temp : !bare,
                bare,
                inlineMap,
                sourceMap,
                sourceFile,
                sourceRoot,
              });
              if (debug) {
                mergeInto(output, {
                  parseTree,
                  semanticTree,
                  transformedSemanticTree,
                });
              }
              return output;
            } catch (error) {
              e = error;
              if (
                !(
                  e.location != null ||
                  e.sourceFile != null ||
                  e.message.match(/parse|expect/i)
                )
              ) {
                log.error({
                  CaffeineScriptBETA: {
                    message:
                      "Uh-oh! There was an internal error compiling your file. We'd love to fix it. Could you submit an issue with a copy of the code that won't compile?\n\nSubmit issues here: https://github.com/caffeine-suite/caffeine-script/issues\n\nSorry for the inconvenience. Thank you so much for trying CaffeineScript!",
                    options,
                    parseTree,
                    semanticTree,
                    transformedSemanticTree,
                  },
                });
              }
              if (debug) {
                e.info = merge(e.info, {
                  parseTree,
                  semanticTree,
                  transformedSemanticTree,
                });
              }
              return (() => {
                throw e;
              })();
            }
          })();
        },
      };
    }
  );
});
