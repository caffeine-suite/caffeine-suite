"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["max", "Math"], [global, require('art-standard-lib')], (max, Math) => {let Lib; return Lib = Caf.defClass(class Lib extends Object {}, function(Lib, classSuper, instanceSuper) {let lastLines, firstLines; this.lastLines = lastLines = function(string, count = 5) {let a; return (a = string.split("\n")).slice(max(0, a.length - count), a.length).join("\n");}; this.firstLines = firstLines = function(string, count = 5) {let a; a = string.split("\n"); return a.slice(0, count).join("\n");}; this.presentSourceLocation = function(source, index, options) {let maxLines, color, insertString, sourceBefore, sourceAfter, halfMaxLines, temp, temp1; if (Caf.exists(options)) {maxLines = (undefined !== (temp = options.maxLines)) ? temp : 10; color = options.color; insertString = (undefined !== (temp1 = options.insertString)) ? temp1 : "<HERE>";}; if (color) {if (color === true) {color = "red";}; insertString = `${Caf.toString(insertString)}`[color];}; sourceBefore = source.slice(0, index); sourceAfter = source.slice(index); if (maxLines) {halfMaxLines = Math.ceil(maxLines / 2); sourceBefore = lastLines(sourceBefore, halfMaxLines); sourceAfter = firstLines(sourceAfter, halfMaxLines);}; return `${Caf.toString(sourceBefore)}${Caf.toString(insertString)}${Caf.toString(sourceAfter.replace(/[\s\n]+$/, ""))}`;};});});});
//# sourceMappingURL=Lib.js.map