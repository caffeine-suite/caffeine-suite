Caf.defMod(module, () => {let require = global.require, module = global.module, match = global.match, throw = global.throw, Error = global.Error, extension = global.extension; let Foundation, BabelBridge, log, a, w, m, defineModule, compactFlatten, present, isFunction, BaseObject, inspect, isString, Parser, Nodes, Extensions, RuleNode, Rules, SemanticTree, RootStn; Foundation = require("art-foundation"); BabelBridge = require("babel-bridge"); ({log, a, w, m, defineModule, compactFlatten, present, isFunction, BaseObject, inspect, isString} = Foundation); ({Parser, Nodes, Extensions} = BabelBridge); ({RuleNode} = Nodes); Rules = require("./Rules"); SemanticTree = require("./SemanticTree"); ({RootStn} = require("./SemanticTree")); return defineModule(module, function() {return CafParseNodeBaseClass = Caf.defClass(class CafParseNodeBaseClass extends Nodes.Node {}, function() {this.prototype.isImplicitArray = function() {return !!this.getImplicitArray();}; this.prototype.getMatchStns = function() {let v; return Caf.a(this.matches, (m) => {return v;}, (m) => {return v = Caf.isF(m.getStn) && m.getStn();});}; this.prototype.getImplicitArray = function() {return Caf.f(this.matches, (match) => {return Caf.isF(match.getImplicitArray) && match.getImplicitArray();});}; this.prototype.getStnFactory = function() {if (isString(this.stnFactory) && !(SemanticTree[this.stnFactory])) {throw(new Error(`stnFactory not found: ${inspect(this.stnFactory)}`));}; return (SemanticTree[this.stnFactory]) || this.stnFactory;}; this.prototype.getStnChildren = function(left) {let v; return this.stnChildren ? (isFunction(this.stnChildren) ? this.stnChildren() : this.stnChildren) : Caf.a(this.nonStnExtensionMatches, (m) => {return v;}, (m) => {return v = m.getStn(left);});}; this.getter({isStnExtension: function() {let p; return this.stnExtension || ((((p = this.presentMatches).length) >= 1) && (p[0].isStnExtension));}, stnExtensionMatches: function() {return Caf.a(this.presentMatches, null, (m) => {return m.getStn && m.isStnExtension;});}, nonStnExtensionMatches: function() {return Caf.a(this.presentMatches, null, (m) => {return m.getStn && !m.isStnExtension;});}}); this.prototype.getTransformedSemanticTree = function() {return this.getStn().transform();}; this.prototype.toJs = function() {return this.getTransformedSemanticTree().toJs();}; this.prototype.getStn = function(left) {let stn, factory, x, currentStnLabel, label, ruleName, pluralLabel, pluralRuleName; stn = (factory = this.getStnFactory()) ? factory({parseTreeNode: this}, (Caf.isF(this.stnProps) && this.stnProps()) || this.stnProps, left, this.getStnChildren()) : (x = this.getStnChildren(left), if (x.length === 1) {x[0];} else {if (x.length === 0) {left;} else {x;};}); Caf.e(this.stnExtensionMatches, (extension) => {return stn = extension.getStn(stn);}); if (stn.props) {currentStnLabel = stn.props.label; if (!currentStnLabel || this.label) {({label, ruleName, pluralLabel, pluralRuleName} = this); stn.props.label = label || ruleName; stn.props.pluralLabel = pluralLabel || pluralRuleName;};}; return this.isRoot ? RootStn(stn) : stn;}; return this;});});});