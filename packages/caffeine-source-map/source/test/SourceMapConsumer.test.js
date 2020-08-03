"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "SourceMapConsumer", "assert"],
    [global, require("./StandardImport")],
    (test, SourceMapConsumer, assert) => {
      return test("AACA", function() {
        let c;
        c = new SourceMapConsumer({ mappings: "AACA" });
        return assert.eq(c.decodedMappings, [
          {
            generatedLine: 0,
            generatedColumn: 0,
            source: 0,
            sourceLine: 1,
            sourceColumn: 0
          }
        ]);
      });
    }
  );
});
