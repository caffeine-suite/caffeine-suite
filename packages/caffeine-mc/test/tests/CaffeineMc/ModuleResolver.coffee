{defineModule, log, each} = require 'art-standard-lib'

{findModule} = Neptune.CaffeineMc

defineModule module, suite:

  findModule: ->
    setup ->
      CaffeineMcTestHelper.reset()

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "'sub-awesome' in absolutePath.basename('#{file}')", ->
        findModule "hurlock-alpha", sourceFile: file
        .then ({requireString, absolutePath}) ->
          assert.match requireString, /\..*HurlockAlpha/, "requireString"
          assert.match absolutePath, /\/.*\/HurlockAlpha/, "absolutePath"

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "'sub-awesome/betaRelease' in absolutePath.basename('#{file}')", ->
        findModule "sub-awesome/betaRelease", sourceFile: file
        .then ({requireString, absolutePath}) ->
          assert.match requireString, /\..*\/BetaRelease$/, "requireString"
          assert.match absolutePath, /\/.*\/SubAwesome\/BetaRelease$/, "absolutePath"

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "'hurlock-alpha.caf' in absolutePath.basename('#{file}')", ->
        findModule "hurlock-alpha.caf", sourceFile: file
        .then ({requireString, absolutePath}) ->
          assert.match requireString, /\.\/HurlockAlpha\.caf$/, "requireString"
          assert.match absolutePath, /DotCaffeineRoot\/HurlockAlpha\.caf$/, "absolutePath"

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "'DotCaffeineRoot' in absolutePath.basename('#{file}')", ->
        findModule "DotCaffeineRoot", sourceFile: file
        .then ({requireString, absolutePath}) ->
          assert.match requireString, /\.\/$/, "requireString"
          assert.match absolutePath, /DotCaffeineRoot$/, "absolutePath"

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "'hurlock' in absolutePath.basename('#{file}') should not match because it is only partial", ->
        assert.rejects -> findModule "hurlock", sourceFile: file

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "'DotCaffeineRootPeer.caf' in absolutePath.basename('#{file}') should not match because it is a peer of the root", ->
        assert.rejects -> findModule "DotCaffeineRootPeer.caf", sourceFile: file

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "'SourceRoots' in absolutePath.basename('#{file}') should not match because it is the parent of the root", ->
        assert.rejects -> findModule "SourceRoots", sourceFile: file

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
