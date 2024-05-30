"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["describe", "test", "beforeAll", "fs", "CompileCache", "assert", "objectWithout", "merge", "chainedTest", "WorkingCache", "FileCompiler", "path"], [global, require('./StandardImport'), require('caffeine-script'), {path: require('path'), fs: require('fs-extra')}], (describe, test, beforeAll, fs, CompileCache, assert, objectWithout, merge, chainedTest, WorkingCache, FileCompiler, path) => {let sourceRootName, sourceRoot, sourcePath, sourceFileName, sourceFileExtension, sourceFile, initialFs; sourceRootName = "AliceInLove"; sourceRoot = `/home/alice/${Caf.toString(sourceRootName)}`; sourcePath = `${Caf.toString(sourceRoot)}/source/AliceInLove/Lib`; sourceFileName = "myFile"; sourceFileExtension = "caf"; sourceFile = `${Caf.toString(sourcePath)}/${Caf.toString(sourceFileName)}.${Caf.toString(sourceFileExtension)}`; initialFs = {tmp: {}, home: {alice: {AliceInLove: {"package.json": "{}", source: {AliceInLove: {Lib: {[`${Caf.toString(sourceFileName)}.caf`]: "&standard_import"}, "StandardImport.caf": ":foo"}}}}}}; return describe({pre: function() {return test("JEST-needs-this-for-mock-fs-to-workfoo", () => {});}, basic: function() {let fakeInfo; beforeAll(() => fs.setMockFileStructure(initialFs)); fakeInfo = {compiler: {name: "TestCompiler", version: "1.2.3"}, source: "My source code.", sourceFile, compiled: {js: "console.log('My source code'.);"}}; test("getFileName", () => {let cacheFileName; cacheFileName = CompileCache.getFileName(fakeInfo); assert.match(cacheFileName, CompileCache.compileCacheFileNameRoot); assert.match(cacheFileName, "TestCompiler"); assert.match(cacheFileName, sourceRootName); assert.match(cacheFileName, sourceFileName); return assert.match(cacheFileName, sourceFileExtension);}); test("cache", () => {let cacheKey; cacheKey = CompileCache.cache(fakeInfo); return assert.eq(fakeInfo.compiled, CompileCache.fetch(objectWithout(fakeInfo, "compiled")).compiled);}); test("different compilerOptions generates different cache filenames", () => assert.neq(CompileCache.getFileName(merge(fakeInfo, {compilerOptions: {}})), CompileCache.getFileName(merge(fakeInfo, {compilerOptions: {prettier: true}})))); return test("compilerOptions with different order still generates same cache filenames", () => assert.eq(CompileCache.getFileName(merge(fakeInfo, {compilerOptions: {a: 1, b: 2}})), CompileCache.getFileName(merge(fakeInfo, {compilerOptions: {b: 2, a: 1}}))));}, FileCompiler: function() {beforeAll(() => fs.setMockFileStructure(initialFs)); return chainedTest("init", () => WorkingCache.resetWorkingCache()).thenTest(["initial compileFile", () => FileCompiler.compileFile(sourceFile, {cache: true}).then(({output}) => assert.jsFalse(output.cached))], ["cached compileFile", () => FileCompiler.compileFile(sourceFile, {cache: true}).then(({output}) => assert.true(output.cached))], ["move moduleDependency triggers recompile", () => {let outputFilename; outputFilename = path.join(path.dirname(sourceFile), "StandardImport.caf"); return fs.writeFile(outputFilename, ":bar").then(() => {WorkingCache.resetWorkingCache(); return FileCompiler.compileFile(sourceFile, {cache: true});}).then(({output}) => assert.jsFalse(output.cached));}]);}});});});
//# sourceMappingURL=CompileCache.test.js.map
