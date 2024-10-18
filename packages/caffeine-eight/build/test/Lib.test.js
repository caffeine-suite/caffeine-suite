"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["describe", "test", "presentSourceLocation", "assert", "log"], [global, require('./StandardImport')], (describe, test, presentSourceLocation, assert, log) => {return describe({presentSourceLocation: function() {let source, testString, insertString, sourceIndex; source = 'firstLines = (string, count = 5) ->\n  a = string.split "\\n"\n  a.slice 0, count\n  .join "\\n"'; testString = "slice"; insertString = "<HERE>"; sourceIndex = source.indexOf(testString); test("presentSourceLocation source, sourceIndex", () => {let out; out = presentSourceLocation(source, sourceIndex); assert.eq(sourceIndex, out.indexOf(insertString)); return assert.eq(sourceIndex + insertString.length, out.indexOf(testString));}); test("presentSourceLocation source, sourceIndex with customInsertString", () => {let customInsertString, out; customInsertString = "<CUSTOM>"; out = presentSourceLocation(source, sourceIndex, {insertString: customInsertString}); assert.eq(sourceIndex, out.indexOf(customInsertString)); return assert.eq(sourceIndex + customInsertString.length, out.indexOf(testString));}); test("presentSourceLocation source, sourceIndex, color: true", () => {let out, outIndexOfInsertString; out = presentSourceLocation(source, sourceIndex, {color: true}); assert.lt(sourceIndex, outIndexOfInsertString = out.indexOf(insertString)); log({sourceIndex, outIndexOfInsertString, out}); return assert.lt(outIndexOfInsertString + insertString.length, out.indexOf(testString));}); test("presentSourceLocation source, sourceIndex, maxLines: 1", () => {let out; out = presentSourceLocation(source, sourceIndex, {maxLines: 1}); assert.eq(1, out.split("\n").length); return assert.match(out, insertString);}); test("presentSourceLocation source, sourceIndex, maxLines: 2", () => {let out; out = presentSourceLocation(source, sourceIndex, {maxLines: 3}); assert.eq(3, out.split("\n").length); return assert.match(out, insertString);}); return test("presentSourceLocation source, sourceIndex, maxLines: 5", () => {let out; out = presentSourceLocation(source, sourceIndex, {maxLines: 5}); assert.eq(4, out.split("\n").length); return assert.match(out, insertString);});}});});});
//# sourceMappingURL=Lib.test.js.map
