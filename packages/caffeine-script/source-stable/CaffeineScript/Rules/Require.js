"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return {require: {pattern: "/&@?/ pathedRequire", stnProps: function() {let text; text = this.text; return {require: text.slice(1, text.length)};}, stnFactory: "RequireStn"}};});
//# sourceMappingURL=Require.js.map
