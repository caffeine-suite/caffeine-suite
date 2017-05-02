{defineModule, log, each} = require 'art-standard-lib'
path = require 'path'

{compileFile} = Neptune.CaffeineMc

defineModule module, suite: ->
  setup ->
    CaffeineMcTestHelper.reset()

  each CaffeineMcTestHelper.testFiles, (file) ->
    test "compileFile #{path.basename file}", ->
      compileFile file
      .then (out) ->
        filename = path.basename file
        assert.eq CaffeineMcTestHelper.testLog, [
          "caffeine-mc.config.caf loaded"
          'caffeine-mc.config.caf custom compiler used on: caffeine-mc.config.caf, mySpecialConfig: undefined'
          "caffeine-mc.config.caf ran"
          "caffeine-mc.config.caf custom compiler used on: #{filename}, mySpecialConfig: \"worked!\""
        ]
