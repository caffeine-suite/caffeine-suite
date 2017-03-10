{defineModule, log, each} = require 'art-foundation'
path = require 'path'

{findModule} = Neptune.CaffeineMc

defineModule module, suite:

  findModule: ->
    setup ->
      CaffeineMcTestHelper.reset()

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "'sub-awesome' in #{path.basename(file)}", ->
        findModule "hurlock-alpha", sourceFile: file
        .then ({requireString, path}) ->
          assert.match requireString, /\..*HurlockAlpha/, "requireString"
          assert.match path, /\/.*\/HurlockAlpha/, "path"

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "'sub-awesome/betaRelease' in #{path.basename(file)}", ->
        findModule "sub-awesome/betaRelease", sourceFile: file
        .then ({requireString, path}) ->
          assert.match requireString, /\..*\/BetaRelease$/, "requireString"
          assert.match path, /\/.*\/SubAwesome\/BetaRelease$/, "path"

    test "npm module", ->
      findModule "ArtStandardLib", sourceDir: "."
      .then ({requireString, path}) ->
        assert.eq requireString, "art-standard-lib"
        assert.match path, /art-standard-lib$/

    test "pathed npm module", ->
      findModule "ArtStandardLib/types", sourceDir: "."
      .then ({requireString, path}) ->
        assert.eq requireString, "art-standard-lib/Types"
        assert.match path, /art-standard-lib\/Types$/
