{defineModule, log, each} = require 'art-standard-lib'
path = require 'path'

{compileFile, CompileCache} = Neptune.CaffeineMc

defineModule module, suite:
  basic: ->
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
            "caffeine-mc.config.caf custom compiler used on: #{filename}, mySpecialConfig: :worked!"
          ]

  withCache: ->
    setup ->
      CaffeineMcTestHelper.reset()
      CompileCache.reset()

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "compileFile #{path.basename file}", ->
        firstCompileOutput = null
        compileFile file, cache: true
        .then (out) ->
          firstCompileOutput = out
          assert.ok !out.fromCache

        .then ->
          CaffeineMcTestHelper.reset()
          compileFile file, cache: true

        .then (secondCompileOutput) ->
          assert.eq CaffeineMcTestHelper.testLog, [
            "caffeine-mc.config.caf loaded"
            "caffeine-mc.config.caf custom compiler used on: caffeine-mc.config.caf, mySpecialConfig: undefined"
            "caffeine-mc.config.caf ran"
          ]
          assert.ok secondCompileOutput.output.fromCache
          assert.eq secondCompileOutput.output.compiled, firstCompileOutput.output.compiled


