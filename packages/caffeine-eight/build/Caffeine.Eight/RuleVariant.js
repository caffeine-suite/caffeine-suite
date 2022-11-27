"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["PatternElement", "BaseClass", "toInspectedObjects", "isString", "Error", "inspect", "compactFlatten", "Stats", "ScratchNode", "upperCamelCase", "Node", "merge", "isPlainObject"], [global, require('art-standard-lib'), require('art-class-system'), require('./Nodes'), {Stats: require('./Stats'), PatternElement: require('./PatternElement')}], (PatternElement, BaseClass, toInspectedObjects, isString, Error, inspect, compactFlatten, Stats, ScratchNode, upperCamelCase, Node, merge, isPlainObject) => {let allPatternElementsRegExp, RuleVariant; allPatternElementsRegExp = PatternElement.allPatternElementsRegExp; return RuleVariant = Caf.defClass(class RuleVariant extends BaseClass {constructor(options) {super(...arguments); this.options = options; this._toString = null; if (!isPlainObject(this.options)) {this.options = {pattern: this.options};}; this.pattern = this.options.pattern; this.rule = this.options.rule; this.parserClass = this.options.parserClass; this._variantNodeClassName = this.options.variantNodeClassName; this._initVariantNodeClass(this.options); if (this.options.parse) {this.parse = this.options.parse;};};}, function(RuleVariant, classSuper, instanceSuper) {this.property({passThroughRuleName: null}); this.getter({ruleName: function() {return this.rule.name;}, inspectedObjects: function() {return toInspectedObjects(this.pattern);}, isPassThrough: function() {return this._passThroughRuleName;}, name: function() {return this.variantNodeClassName + "Variant";}, numVariants: function() {return this.rule.numVariants;}, patternElements: function() {return this._patternElements || (this._patternElements = this._generatePatternElements());}}); this.prototype._generatePatternElements = function() {let pes, parts; pes = isString(this.pattern) ? (parts = this.pattern.match(allPatternElementsRegExp), !parts ? (() => {throw new Error(`no pattern-parts found in: ${Caf.toString(inspect(this.pattern))}`);})() : undefined, Caf.array(parts, (part) => new PatternElement(part, {ruleVariant: this}))) : [new PatternElement(this.pattern, {ruleVariant: this})]; pes = compactFlatten(pes); if (pes.length === 1 && pes[0].isBasicRulePattern) {this.passThroughRuleName = pes[0].ruleName;}; return pes;}; this.prototype.inspect = function() {return this.toString();}; this.prototype.toString = function() {return this._toString || (this._toString = `${Caf.toString(this.name)}: ${Caf.toString(this.patternString)}`);}; this.getter({patternString: function() {return this.pattern || this.options.parse && "function()";}}); this.prototype.parse = function(parentNode) {let name, parser, nextOffset, activeRuleVariantParserOffsets, previousActiveRuleVariantParserOffset, scratchNode, from, into, to, i; ({name} = this); ({parser, nextOffset} = parentNode); ({activeRuleVariantParserOffsets} = parser); if (nextOffset === (previousActiveRuleVariantParserOffset = activeRuleVariantParserOffsets[name])) {throw new Error(`leftRecursion detected: RuleVariant: ${Caf.toString(name)}, offset: ${Caf.toString(nextOffset)}`);}; activeRuleVariantParserOffsets[name] = nextOffset; return (() => {try {Stats.add("parseVariant"); scratchNode = ScratchNode.checkout(parentNode, this); ({parser} = parentNode); from = this.patternElements; into = from; if (from != null) {to = from.length; i = 0; while (i < to) {let patternElement; patternElement = from[i]; if (!parser.tryPatternElement(patternElement, scratchNode, this)) {scratchNode.checkin(); return false;}; i++;};}; into; scratchNode.checkin(); return scratchNode.getRealNode();} finally {activeRuleVariantParserOffsets[name] = previousActiveRuleVariantParserOffset;};})();}; this.getter({variantNodeClassName: function() {let baseName, base; if (this._variantNodeClassName) {return this._variantNodeClassName;}; baseName = upperCamelCase(this.rule.name) + "Rule" + (this.pattern ? upperCamelCase(Caf.exists(base = `${Caf.toString(this.pattern)}`.match(/[a-zA-Z0-9_]+/g)) && base.join("_") || "") : this.parse ? "CustomParser" : undefined); return this._variantNodeClassName = baseName;}}); this.prototype._initVariantNodeClass = function(options) {let rule, nodeSubclassOptions, nodeBaseClass; ({rule} = options); nodeSubclassOptions = options.node || options.nodeClass || options; nodeBaseClass = options.extends || options.baseClass || options.nodeBaseClass || Node; return this.VariantNodeClass = nodeBaseClass.createSubclass(merge({name: this.variantNodeClassName, ruleVariant: this.ruleVariant}, nodeSubclassOptions));};});});});
//# sourceMappingURL=RuleVariant.js.map
