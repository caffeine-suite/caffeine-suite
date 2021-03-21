"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Error"],
    [global, require("../StandardImport")],
    (Error) => {
      let transformChildren, depthFirstTransform, dotTransform;
      transformChildren = function ({ children }, transform) {
        let ret, from, into, to, i1;
        ret = null;
        from = children;
        into = from;
        if (from != null) {
          to = from.length;
          i1 = 0;
          while (i1 < to) {
            let child, i, newChild;
            child = from[i1];
            i = i1;
            if (child !== (newChild = transform(child))) {
              ret != null ? ret : (ret = children.slice());
              newChild.props.label = child.label;
              ret[i] = newChild;
            }
            i1++;
          }
        }
        into;
        return ret || children;
      };
      transformChildren = function (stn, transform) {
        return stn.withChildren(transformChildren(stn, transform));
      };
      depthFirstTransform = function (stn, transform) {
        let e, ce;
        return (() => {
          try {
            return transform(transformChildren(stn, transform));
          } catch (error) {
            e = error;
            ce = this.parseTreeNode.parser.generateCompileError({
              failureIndex: this.sourceOffset,
              errorType: "Validation",
              message: e.message,
              info: e.info,
            });
            ce.stack = e.stack;
            return (() => {
              throw ce;
            })();
          }
        })();
      };
      dotTransform = function (stn) {
        if (stn.type === "DotReference") {
          throw new Error("DotReference not supported yet");
        }
        return stn;
      };
      return function (stn) {
        return stn;
      };
    }
  );
});
