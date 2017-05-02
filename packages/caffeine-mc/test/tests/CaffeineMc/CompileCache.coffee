{log, objectWithout} = require 'art-standard-lib'
{CompileCache} = Neptune.CaffeineMc

module.exports = suite: ->
  setup ->
    CompileCache.reset()

  fakeInfo =
    compiler:
      name: "TestCompiler"
      version: "1.2.3"
    source: "My source code."
    sourceFile: "/foo/bar/myFile.caf"
    compiled: js: "console.log('My source code'.);"

  test "getFileName", ->
    fn = CompileCache.getFileName fakeInfo
    assert.match fn, CompileCache.compileCacheFileNameRoot
    assert.match fn, "TestCompiler"

  test "cache", ->
    CompileCache.cache fakeInfo

    assert.eq fakeInfo.compiled, CompileCache.fetch objectWithout fakeInfo, "compiled"