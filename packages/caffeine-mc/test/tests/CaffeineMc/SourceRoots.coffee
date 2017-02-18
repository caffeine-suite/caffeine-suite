{defineModule, log, each} = require 'art-foundation'
path = require 'path'

{getCaffeineInit, findSourceRoot, _resetSourceRoots} = Neptune.CaffeineMc.SourceRoots


defineModule module, suite: ->
  setup ->
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
        assert.isString caffeineInit.preCompileJsInitString
        assert.isFunction caffeineInit.compiler.compile
        assert.eq CaffeineMcTestHelper.testLog, [
          "caffeine-mc.config.caf loaded"
          'caffeine-mc.config.caf custom compiler used on: "caffeine-mc.config.caf ran"'
        ]
