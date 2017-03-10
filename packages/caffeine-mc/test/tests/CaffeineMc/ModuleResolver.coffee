{defineModule, log, each} = require 'art-foundation'

{findModule} = Neptune.CaffeineMc

defineModule module, suite:

  findModule: ->
    setup ->
      CaffeineMcTestHelper.reset()

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "'sub-awesome' in #{absolutePath.basename(file)}", ->
        findModule "hurlock-alpha", sourceFile: file
        .then ({requireString, absolutePath}) ->
          assert.match requireString, /\..*HurlockAlpha/, "requireString"
          assert.match absolutePath, /\/.*\/HurlockAlpha/, "absolutePath"

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "'sub-awesome/betaRelease' in #{absolutePath.basename(file)}", ->
        findModule "sub-awesome/betaRelease", sourceFile: file
        .then ({requireString, absolutePath}) ->
          assert.match requireString, /\..*\/BetaRelease$/, "requireString"
          assert.match absolutePath, /\/.*\/SubAwesome\/BetaRelease$/, "absolutePath"

    test "npm module", ->
      findModule "ArtStandardLib", sourceDir: "."
      .then ({requireString, absolutePath}) ->
        assert.eq requireString, "art-standard-lib"
        assert.match absolutePath, /art-standard-lib$/

    test "pathed npm module", ->
      findModule "ArtStandardLib/types", sourceDir: "."
      .then ({requireString, absolutePath}) ->
        assert.eq requireString, "art-standard-lib/Types"
        assert.match absolutePath, /art-standard-lib\/Types$/
