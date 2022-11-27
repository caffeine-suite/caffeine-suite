"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["BaseClass", "RuleVariant", "merge", "compactFlattenAll", "toInspectedObjects", "Stats"], [global, require('art-standard-lib'), require('art-class-system'), {RuleVariant: require('./RuleVariant'), Stats: require('./Stats')}], (BaseClass, RuleVariant, merge, compactFlattenAll, toInspectedObjects, Stats) => {let Rule; return Rule = Caf.defClass(class Rule extends BaseClass {constructor(_name, _definedInClass, _variants = []) {super(...arguments); this._name = _name; this._definedInClass = _definedInClass; this._variants = _variants;};}, function(Rule, classSuper, instanceSuper) {this.getter("nodeClassName", "name", "variantNodeClasses", "definedInClass", {numVariants: function() {return this._variants.length;}}); this.prototype.addVariant = function(options, addPriorityVariant) {let v; v = new RuleVariant(merge(options, {variantNumber: this._variants.length + 1, rule: this, parserClass: this._definedInClass})); if (addPriorityVariant) {this._variants = compactFlattenAll(v, this._variants);} else {this._variants.push(v);}; return v;}; this.getter({inspectedObjects: function() {return toInspectedObjects(this._variants);}}); this.prototype.clone = function() {return new Rule(this._name, this._definedInClass, this._variants.slice());}; this.prototype.parse = function(parentNode) {let parser, nextOffset, cached, temp, from, into, to, i, temp1; Stats.add("parseRule"); parser = parentNode.parser; nextOffset = parentNode.nextOffset; return (cached = parser._cached(this.name, nextOffset)) ? (cached === "no_match") ? (Stats.add("cacheHitNoMatch"), null) : (Stats.add("cacheHit"), cached) : ((temp = (from = this._variants, into = null, (from != null) ? (to = from.length, i = 0, (() => {while (i < to) {let v, match; v = from[i]; if (into = (match = v.parse(parentNode)) ? parser._cacheMatch(this.name, match) : undefined) {break;}; temp1 = i++;}; return temp1;})()) : undefined, into || null)) != null ? temp : parser._cacheNoMatch(this.name, nextOffset));};});});});
//# sourceMappingURL=Rule.js.map
