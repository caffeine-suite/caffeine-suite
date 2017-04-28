{log} = require 'art-standard-lib'
{CompileCache} = Neptune.CaffeineMc

module.exports = suite: ->
  test "getFileName", ->
    fn = CompileCache.getFileName
      compiler:
        name: "TestCompiler"
        version: "1.2.3"
      source: "My source code."
      sourceFile: "/foo/bar/myFile.caf"
    log fn