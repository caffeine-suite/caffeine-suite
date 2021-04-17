"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return (() => {return function() {return this.rule({dotReference: ["dots:/\\.+(?!\\d)/ identifier?", {stnFactory: "DotReferenceStn", stnProps: function() {let base; return {dotCount: this.dots.toString().length, accessIdentifier: Caf.exists(base = this.identifier) && base.toString()};}}]});};})();});
//# sourceMappingURL=DotReference.js.map
