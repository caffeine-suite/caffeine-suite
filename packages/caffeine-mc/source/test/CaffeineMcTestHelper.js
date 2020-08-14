"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseObject", "path", "process", "Neptune"],
    [global, require("./StandardImport"), { path: require("path") }],
    (BaseObject, path, process, Neptune) => {
      let CaffeineMcTestHelper;
      return (global.CaffeineMcTestHelper = CaffeineMcTestHelper = Caf.defClass(
        class CaffeineMcTestHelper extends BaseObject {},
        function (CaffeineMcTestHelper, classSuper, instanceSuper) {
          this.classProperty({ testLog: [] });
          this.log = (str) => this.testLog.push(str);
          this.reset = () => {
            Neptune.CaffeineMc.SourceRoots._resetSourceRoots();
            return (this.testLog = []);
          };
          this.testFiles = {
            alpha: path.join(
              process.cwd(),
              "test",
              "files",
              "SourceRoots",
              "DotCaffeineRoot",
              "HurlockAlpha.caf"
            ),
            beta: path.join(
              process.cwd(),
              "test",
              "files",
              "SourceRoots",
              "DotCaffeineRoot",
              "SubAwesome",
              "BetaRelease.caf"
            ),
          };
        }
      ));
    }
  );
});
