"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {let EmptyNode; return EmptyNode = Caf.defClass(class EmptyNode extends require('./Node') {}, function(EmptyNode, classSuper, instanceSuper) {this.getter({present: function() {return false;}});});});
//# sourceMappingURL=EmptyNode.js.map
