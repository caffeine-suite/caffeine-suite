{BaseObject} = require 'art-foundation'
path = require 'path'

global.CaffeineMcTestHelper = class CaffeineMcTestHelper extends BaseObject
  @classProperty testLog: []

  @log: (str) => @testLog.push str
  @reset: =>
    Neptune.CaffeineMc.SourceRoots._resetSourceRoots()
    @testLog = []

  @testFiles: [
    path.join process.cwd(), "test", "files", "SourceRoots", "DotCaffeineRoot", "a.caf"
    path.join process.cwd(), "test", "files", "SourceRoots", "DotCaffeineRoot", "subdir", "b.caf"
  ]