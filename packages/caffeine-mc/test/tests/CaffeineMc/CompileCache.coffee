{merge, log, objectWithout} = require 'art-standard-lib'
{SourceRoots, CompileCache} = Neptune.CaffeineMc
mockFs = require('mock-fs')

module.exports = suite: ->

  sourceRootName = "AliceInLove"
  sourceRoot = "/home/alice/#{sourceRootName}"
  sourcePath = "#{sourceRoot}/foo/bar"
  sourceFileName = "myFile"
  sourceFileExtension = "caf"
  sourceFile = "#{sourcePath}/#{sourceFileName}.#{sourceFileExtension}"

  setup ->
    CompileCache.reset()
    mockFs
      "#{sourceRoot}":
        "package.json": "{}"
        foo: bar: "myFile.caf": "# file contents"

  teardown ->
    mockFs.restore()


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