"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["BaseClass"], [global, require('art-class-system')], (BaseClass) => {let Stats; return Stats = Caf.defClass(class Stats extends BaseClass {}, function(Stats, classSuper, instanceSuper) {this._stats = {}; this.reset = function() {return this._stats = {};}; this.add = function(statName, amount = 1) {let temp; return this._stats[statName] = (((temp = this._stats[statName]) != null ? temp : 0)) + amount;}; this.get = function() {return this._stats;};});});});
//# sourceMappingURL=Stats.js.map
