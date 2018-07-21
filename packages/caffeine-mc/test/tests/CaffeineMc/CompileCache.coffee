{merge, log, objectWithout} = require 'art-standard-lib'
{SourceRoots, CompileCache, FileCompiler, WorkingCache} = Neptune.CaffeineMc
mockFs = require 'mock-fs'
fs = require 'fs-extra'
{ChainedTest} = require 'art-testbench'
require "caffeine-script"
require "art-standard-lib/Core"
path = require 'path'

sourceRootName = "AliceInLove"
sourceRoot = "/home/alice/#{sourceRootName}"
sourcePath = "#{sourceRoot}/source/AliceInLove/Lib"
sourceFileName = "myFile"
sourceFileExtension = "caf"
sourceFile = "#{sourcePath}/#{sourceFileName}.#{sourceFileExtension}"

initialFs =
  "#{sourceRoot}":
    "package.json": "{}"
    source: AliceInLove:
      Lib: "#{sourceFileName}.caf": "&standard_import"
      "StandardImport.caf": ":foo"

module.exports = suite:
  basic: ->
    setup -> mockFs initialFs
    teardown -> mockFs.restore()

    fakeInfo =
      compiler:
        name: "TestCompiler"
        version: "1.2.3"
      source: "My source code."
      sourceFile: sourceFile
      compiled: js: "console.log('My source code'.);"

    test "getFileName", ->
      fn = CompileCache.getFileName fakeInfo
      assert.match fn, CompileCache.compileCacheFileNameRoot
      assert.match fn, "TestCompiler"
      assert.match fn, sourceRootName
      assert.match fn, sourceFileName
      assert.match fn, sourceFileExtension

    test "cache", ->
      CompileCache.cache fakeInfo

      assert.eq fakeInfo.compiled, CompileCache.fetch(objectWithout fakeInfo, "compiled").compiled

    test "different compilerOptions generates different cache filenames", ->
      assert.neq(
        CompileCache.getFileName merge fakeInfo, compilerOptions: {}
        CompileCache.getFileName merge fakeInfo, compilerOptions: transpile: true
      )

    test "compilerOptions with different order still generates same cache filenames", ->
      assert.eq(
        CompileCache.getFileName merge fakeInfo, compilerOptions: a: 1, b: 2
        CompileCache.getFileName merge fakeInfo, compilerOptions: b: 2, a: 1
      )

  FileCompiler: ->
    suiteSetup ->
      mockFs initialFs
    suiteTeardown -> mockFs.restore()

    setup -> WorkingCache.resetWorkingCache()

    ChainedTest.setup()
    .thenTest "initial", ->
      FileCompiler.compileFile sourceFile, cache: true
      .then ({output}) ->
        assert.false output.fromCache

    .thenTest "cached", ->
      FileCompiler.compileFile sourceFile, cache: true
      .then ({output}) ->
        assert.true output.fromCache

    .thenTest "move moduleDependency triggers recompile", ->
      outputFilename = path.join path.dirname(sourceFile), "StandardImport.caf"
      fs.writeFile outputFilename, ":bar"
      .then ->
        WorkingCache.resetWorkingCache()
        FileCompiler.compileFile sourceFile, cache: true
      .then ({output}) ->
        assert.false output.fromCache
