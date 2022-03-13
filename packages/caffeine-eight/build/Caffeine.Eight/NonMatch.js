"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["BaseClass"], [global, require('art-standard-lib'), require('art-class-system')], (BaseClass) => {let NonMatch; return NonMatch = Caf.defClass(class NonMatch extends BaseClass {constructor(_node, _patternElement) {super(...arguments); this._node = _node; this._patternElement = _patternElement;};}, function(NonMatch, classSuper, instanceSuper) {this.getter("node", "patternElement", {inspectedObjects: function() {return {NonMatch: {patternElement: this.toString(), offset: this.node.offset}};}}); this.prototype.toString = function() {return this.patternElement.ruleVariant.toString();};});});});
//# sourceMappingURL=NonMatch.js.map
