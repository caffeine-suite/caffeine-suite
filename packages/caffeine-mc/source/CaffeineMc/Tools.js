"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["vm", "console", "log", "RegExp", "escapeRegExp", "process", "path"],
    [
      global,
      require("./StandardImport"),
      { path: require("path"), vm: require("vm") },
    ],
    (vm, console, log, RegExp, escapeRegExp, process, path) => {
      let Tools;
      require("chalk");
      return (Tools = Caf.defClass(class Tools extends Object {}, function (
        Tools,
        classSuper,
        instanceSuper
      ) {
        this.fileExtensions = ["caf", "caffeine"];
        this.fileIsCaffeine = function (filename) {
          return /\.(caf|caffeine)$/.test(filename);
        };
        this.__preloadCoffeeScriptForTests = function () {
          return require("coffee-script");
        };
        this.runInContext = function (js, context, filename) {
          return context === global
            ? vm.runInThisContext(js, filename)
            : vm.runInContext(js, context, filename);
        };
        this.evalInContext = function (js, context) {
          let e;
          return (() => {
            try {
              return function () {
                return eval(js);
              }.call(context);
            } catch (error) {
              e = error;
              console.error("<---> evalInContext: error: js:");
              console.error(js);
              console.error("<--->");
              return (() => {
                throw e;
              })();
            }
          })();
        };
        this.stackTraceIgnoreLineRegExp = /(\/caffeine-(script-runtime|mc)\/|internal\/modules\/cjs\/\w+\.js|\bsource-map-support\/)/;
        this.displayError = function (e, options = {}) {
          if (!(e != null)) {
            return;
          }
          return options.verbose
            ? log.error(e)
            : e.location != null || e.sourceFile != null
            ? e
              ? log(e.message.replace(/<HERE>/, "<HERE>".red))
              : undefined
            : log.error(
                Caf.array(
                  e.stack.split("\n"),
                  null,
                  (line) => !this.stackTraceIgnoreLineRegExp.test(line)
                )
                  .slice(0, 30)
                  .join("\n")
                  .replace(
                    new RegExp(escapeRegExp(process.cwd() + "/"), "g"),
                    "./"
                  )
                  .replace(
                    new RegExp(
                      escapeRegExp(path.dirname(process.cwd()) + "/"),
                      "g"
                    ),
                    "../"
                  )
              );
        };
      }));
    }
  );
});
