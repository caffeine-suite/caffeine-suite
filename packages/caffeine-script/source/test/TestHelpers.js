"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["compile", "compactFlatten", "test", "assert"],
    [
      global,
      require("art-standard-lib"),
      require("art-testbench"),
      require("../CaffeineScript"),
    ],
    (compile, compactFlatten, test, assert) => {
      let evalCaf, evalCafSuite;
      return {
        evalCaf: (evalCaf = function (source, options) {
          return eval(compile(source, options).compiled.js);
        }),
        evalCafSuite: (evalCafSuite = function (...list) {
          let from, into, to, i1, temp;
          return (
            (from = list = compactFlatten(list)),
            (into = from),
            from != null
              ? ((to = from.length),
                (i1 = 0),
                (() => {
                  while (i1 < to) {
                    let k, i, v;
                    k = from[i1];
                    i = i1;
                    v = list[i + 1];
                    test(`${Caf.toString(k)} => ${Caf.toString(v)}`, () =>
                      assert.eq(evalCaf(k), v));
                    temp = i1 += 2;
                  }
                  return temp;
                })())
              : undefined,
            into
          );
        }),
      };
    }
  );
});
