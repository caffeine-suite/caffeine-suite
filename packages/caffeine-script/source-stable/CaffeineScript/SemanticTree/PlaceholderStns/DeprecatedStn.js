"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["Error"], [global, require('../../StandardImport')], (Error) => {let DeprecatedStn; return DeprecatedStn = Caf.defClass(class DeprecatedStn extends require('../BaseStn') {}, function(DeprecatedStn, classSuper, instanceSuper) {this.prototype.validate = function() {let temp; return (() => {throw new Error(`Deprecated: ${Caf.toString(((temp = this.props.message) != null ? temp : "syntax"))}`);})();}; this.prototype.toSourceNode = function(options) {return this.children[0].toSourceNode(options);};});});});
//# sourceMappingURL=DeprecatedStn.js.map
