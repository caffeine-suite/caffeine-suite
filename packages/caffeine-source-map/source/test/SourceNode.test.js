"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["describe", "test", "SourceNode", "assert", "merge"],
    [global, require("./StandardImport")],
    (describe, test, SourceNode, assert, merge) => {
      return describe({
        children: function () {
          test("none", () => {
            let n;
            n = new SourceNode();
            return assert.eq("", n.toString());
          });
          test("string", () => {
            let n;
            n = new SourceNode(0, "hi");
            return assert.eq("hi", n.toString());
          });
          test("array of strings", () => {
            let n;
            n = new SourceNode(0, ["hi", "there", "!"]);
            return assert.eq("hithere!", n.toString());
          });
          test("nested arrays", () => {
            let n;
            n = new SourceNode(0, ["hi", ["there", ["!"]]]);
            return assert.eq("hithere!", n.toString());
          });
          return test("SourceNode", () => {
            let n;
            n = new SourceNode(0, new SourceNode(0, "hi"));
            return assert.eq("hi", n.toString());
          });
        },
        outputProps: function () {
          test("basic", () => {
            let n, props;
            n = new SourceNode().withProps((props = { foo: 123 }));
            return assert.eq(props, n.mergedProps);
          });
          return test("nested", () => {
            let n, props1, props2;
            n = new SourceNode(
              0,
              new SourceNode().withProps((props1 = { bar: 456 }))
            ).withProps((props2 = { foo: 123 }));
            return assert.eq(merge(props1, props2), n.mergedProps);
          });
        },
      });
    }
  );
});
