"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let ImportStn, ImportBodyStn;
  ImportStn = require("./ImportStn");
  return (ImportBodyStn = Caf.defClass(
    class ImportBodyStn extends require("../ScopeStnMixin")(
      require("../BaseStn")
    ) {},
    function(ImportBodyStn, classSuper, instanceSuper) {
      this.prototype.isImports = true;
      this.prototype.toJs = function(options) {
        return this.children[0].toJs(options);
      };
    }
  ));
});
