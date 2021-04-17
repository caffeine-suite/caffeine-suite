"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return (() => {let transforms; transforms = [require('./DotReferenceTransform')]; return {applyTransforms: function(stn) {let from, into, to, i; from = transforms; into = from; if (from != null) {to = from.length; i = 0; while (i < to) {let transform; transform = from[i]; stn = transform(stn); i++;};}; into; return stn;}};})();});
//# sourceMappingURL=Transforms.js.map
