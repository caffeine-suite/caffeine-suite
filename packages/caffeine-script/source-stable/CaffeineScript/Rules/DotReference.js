"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return (() => {return function() {return this.rule({dotReference: ["dots:/\\??\\.+(?!\\d)/ identifier?", {stnFactory: "DotReferenceStn", stnProps: function() {return {dotCount: this.dots.toString().length};}}]});};})();});
//# sourceMappingURL=DotReference.js.map
