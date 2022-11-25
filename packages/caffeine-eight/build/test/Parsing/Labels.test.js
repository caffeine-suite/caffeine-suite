"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "Parser", "assert"], [global, require('../StandardImport')], (test, Parser, assert) => {test("three different labels", function() {let MyParser, mainNode; MyParser = Caf.defClass(class MyParser extends Parser {}, function(MyParser, classSuper, instanceSuper) {this.rule({root: {pattern: "a:'eh'?\nb:'bee'?\nc:'cee'?", nodeClass: {result: function() {let base, base1, base2; return {a: Caf.exists(base = this.a) && base.text, b: Caf.exists(base1 = this.b) && base1.text, c: Caf.exists(base2 = this.c) && base2.text};}}}});}); mainNode = MyParser.parse("ehcee"); return assert.eq(mainNode.result(), {a: "eh", b: undefined, c: "cee"});}); return test("three same labels", function() {let MyParser, mainNode; MyParser = Caf.defClass(class MyParser extends Parser {}, function(MyParser, classSuper, instanceSuper) {this.rule({root: {pattern: "a:'eh'?\na:'bee'?\na:'cee'?", nodeClass: {result: function() {return {a: this.a.text, "matches.a": Caf.array(this.as, (match) => match.text)};}}}});}); mainNode = MyParser.parse("ehcee"); return assert.eq(mainNode.result(), {a: "cee", "matches.a": ["eh", "cee"]});});});});
//# sourceMappingURL=Labels.test.js.map