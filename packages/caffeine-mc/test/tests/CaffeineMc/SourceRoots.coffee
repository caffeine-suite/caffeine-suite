{defineModule, log, each} = require 'art-standard-lib'
path = require 'path'

{WorkingCache, SourceRoots} = Neptune.CaffeineMc
{getCaffeineInit, findSourceRoot, _resetSourceRoots} = SourceRoots


defineModule module, suite: ->
  setup ->
    WorkingCache.resetWorkingCache()
    CaffeineMcTestHelper.reset()

  each CaffeineMcTestHelper.testFiles, (file) ->
    test "findSourceRoot #{path.basename file}", ->
      findSourceRoot file
      .then (out) ->
        assert.eq path.relative(process.cwd(), out), "test/files/SourceRoots/DotCaffeineRoot"

  each CaffeineMcTestHelper.testFiles, (file) ->
    test "getCaffeineInit #{path.basename file}", ->
      findSourceRoot file
      .then (sourceRoot) ->
        getCaffeineInit sourceRoot
      .then (caffeineInit) ->
        assert.eq CaffeineMcTestHelper.testLog, [
          "caffeine-mc.config.caf loaded"
          'caffeine-mc.config.caf custom compiler used on: caffeine-mc.config.caf, mySpecialConfig: undefined'
          "caffeine-mc.config.caf ran"
        ]

        assert.eq caffeineInit.config, mySpecialConfig: "worked!"
        assert.isFunction caffeineInit.compiler.compile
