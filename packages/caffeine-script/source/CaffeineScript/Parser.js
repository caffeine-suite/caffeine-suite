let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let ArtFoundation = require("art-foundation"),
    BabelBridge = require("babel-bridge"),
    CafParseNodeBaseClass = require("./CafParseNodeBaseClass"),
    Parser,
    isFunction;
  ({ Parser, isFunction } = Caf.i(["Parser", "isFunction"], [
    ArtFoundation,
    BabelBridge,
    CafParseNodeBaseClass,
    global
  ]));
  return CaffeineScriptParser = Caf.defClass(
    class CaffeineScriptParser extends Parser {},
    function() {
      let Rules = require("./Rules");
      this.nodeBaseClass = CafParseNodeBaseClass;
      Caf.e(Rules.modules, undefined, (mod, k, into) => {
        return isFunction(mod) ? mod.call(this) : this.rule(mod);
      });
      return this;
    }
  );
});