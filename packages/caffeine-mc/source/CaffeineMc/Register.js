"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["log"],
    [global, require("./StandardImport")],
    (log) => {
      let realRequire, CaffeineMc, Register;
      realRequire = eval("require");
      CaffeineMc = require("./namespace");
      return (Register = Caf.defClass(
        class Register extends Object {},
        function (Register, classSuper, instanceSuper) {
          this.verbose = false;
          this.register = () => {
            require("source-map-support").install({ hookRequire: true });
            Caf.each2(CaffeineMc.fileExtensions, (ext) => {
              let temp, base;
              return (temp = (base = realRequire.extensions)[
                `.${Caf.toString(ext)}`
              ]) != null
                ? temp
                : (base[`.${Caf.toString(ext)}`] = (module, filename) => {
                    let answer, error;
                    try {
                      this.verbose &&
                        log({ "caffeine-mc-compile-loading": filename });
                      answer = CaffeineMc.compileFileSync(filename, {
                        inlineMap: true,
                        sourceRoot: "",
                        cache: true,
                      });
                    } catch (error1) {
                      error = error1;
                      CaffeineMc.displayError(error);
                      if (this.verbose) {
                        module._compile(
                          `throw new Error('CaffeineMc: error compiling ${Caf.toString(
                            filename
                          )}');`,
                          filename
                        );
                      }
                    }
                    return answer != null
                      ? (() => {
                          try {
                            return module._compile(
                              answer.compiled.js,
                              filename
                            );
                          } catch (error2) {
                            error = error2;
                            CaffeineMc.displayError(error);
                            return this.verbose
                              ? (log({
                                  "caffeine-mc-compile": { filename, answer },
                                }),
                                module._compile(
                                  `\nthrow new Error('CaffeineMc: error evaluating: ${Caf.toString(
                                    filename
                                  )}');\n`,
                                  filename
                                ))
                              : undefined;
                          }
                        })()
                      : undefined;
                  });
            });
            return CaffeineMc;
          };
        }
      ));
    }
  );
});
