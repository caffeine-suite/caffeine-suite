{defineModule, log, each, merge, isArray} = require 'art-standard-lib'

{findModule, findModuleSync, WorkingCache, getNpmPackageName} = Neptune.CaffeineMc
mockFs = require 'mock-fs'

defineModule module, suite:

  findModule: ->
    setup ->
      WorkingCache.resetWorkingCache()
      CaffeineMcTestHelper.reset()

    each CaffeineMcTestHelper.testFiles, (file) ->
      test "'sub-awesome' in absolutePath.basename('#{file}')", ->
        if /HurlockAlpha\.caf/.test file
          assert.rejects findModule "hurlock-alpha", sourceFile: file
        else
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

  stubbedFindModule: ->
    # setup -> mockFs initialFs
    setup ->
      WorkingCache.resetWorkingCache()

    teardown -> mockFs.restore()

    dirReaderFromDirMap = (structure) ->
      find = (dir, current = structure) ->
        return current if dir.length == 0
        [first, rest...] = if isArray dir then dir else dir.split "/"
        find rest, structure[first]

      dirReader:
        read: (dir) ->
          found = find dir
          throw new Error "missing dir: #{dir}" unless found
          Object.keys found
        isDir: (dir) -> !!find dir
        resolve: (dir) -> dir

    test "stubbed", ->
      mockFs
        ArtStandardLib:
          alpha: {}
          beta:  {}

      findModule "ALPHA", merge
        sourceDir:  "ArtStandardLib/beta"
        sourceRoot: "ArtStandardLib"

      .then ({requireString, absolutePath}) ->
        assert.eq requireString, "../alpha"
        assert.match absolutePath, "ArtStandardLib/alpha"

    test "MyDottedDir finds My.DottedDir", ->
      mockFs
        myRoot:
          "My.DottedDir":
            MySubdir: {}
      findModule "MyDottedDir", merge
        sourceDir:  "myRoot/My.DottedDir/MySubdir"
        sourceRoot: "myRoot"

      .then ({requireString, absolutePath}) ->
        assert.eq requireString, "../"

    test "DottedDir does not find My.DottedDir", ->
      mockFs
        myRoot:
          "My.DottedDir": MySubdir: {}
          MyDottedDir: {}

      assert.rejects findModule "DottedDir", merge
        sourceDir:  "myRoot/My.DottedDir/MySubdir"
        sourceRoot: "myRoot"
      .then (rejectsWith) ->
        assert.match rejectsWith.message, /Could not find.*DottedDir/i

    test "findModuleSync does not resolve to the sourceFile the request came from", ->
      mockFs
        myRoot:
          MySubdir: "StandardImport.caf": "&StandardImport"
          "StandardImport.caf": "&ArtSuite"


      found = findModuleSync "StandardImport",
        sourceDir:  "myRoot/MySubdir"
        sourceFile: "StandardImport.caf"
        sourceRoot: "myRoot"

      assert.eq found.requireString, "../StandardImport"
      assert.isString log found.absolutePath

    ### regressions to test:
      &testing/testingMin >> testing/testing-min.js
      should become:
      &testing/build/testing-min

    - &ArtSuite
      should NOT resolve a parent directory named: Art.Suite.Demos
    - &indexeddb-promised
      should resolve to 'indexeddb-promised'
      even though the actual file is: indexeddb-promised/js/indexeddb-promised.js

    ###

  regressions: ->
    test 'getNpmPackageName', ->
      assert.eq(
        getNpmPackageName('three', ['build', 'three.min'])
        requireString: "three"
        absolutePath:  require.resolve("three/build/three.min").split(/\/build/)[0]
      )

    test "findModuleSync 'three/build/threeMin' - should return same as require.resolve", ->
      assert.eq(
        requireString: "three/build/three.min"
        absolutePath: require.resolve("three/build/three.min").split(/\.js$/)[0]
        findModuleSync "three/build/threeMin"
      )