{BaseObject} = require 'art-class-system'
path = require 'path'

global.CaffeineMcTestHelper = class CaffeineMcTestHelper extends BaseObject
  @classProperty testLog: []

  @log: (str) => @testLog.push str
  @reset: =>
    Neptune.CaffeineMc.SourceRoots._resetSourceRoots()
    @testLog = []

  @testFiles:
    alpha:  path.join process.cwd(), "test", "files", "SourceRoots", "DotCaffeineRoot", "HurlockAlpha.caf"
    beta:   path.join process.cwd(), "test", "files", "SourceRoots", "DotCaffeineRoot", "SubAwesome", "BetaRelease.caf"
