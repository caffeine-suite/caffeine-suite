{defineModule, array, log, merge, present, find, each, w, BaseObject} = require 'art-foundation'
FsPromise = require 'fs-promise'
path = require 'path'
Metacompiler = require './Metacompiler'

defineModule module, class SourceRoots extends BaseObject

  @classGetter "sourceRootIndicatorFiles knownSourceRoots caffeineInits",
    caffeineInitFileName: -> "caffeine-mc.config.caf"

  evalCapturingModuleExports = (source) ->
    # as of ES5, this should limit eval's access to only the global scope
    globalContextEval = eval
    global.__caffeineMcModule = {}
    globalContextEval "
      (function(module){
        #{source}
      })(__caffeineMcModule);
      "

    {exports} = global.__caffeineMcModule || {}
    global.__caffeineMcModule = null
    exports

  # OUT: promise.then (caffeineInit) ->
  #   caffeineInit is a js string or false
  @getCaffeineInit: (sourceRoot) =>
    # log getCaffeineInit: {sourceRoot}
    if (res = @caffeineInits[sourceRoot])?
      Promise.resolve res
    else
      FsPromise.exists sourceFile = path.join sourceRoot, @caffeineInitFileName
      .then (exists) =>
        if exists
          FsPromise.readFile sourceFile
          .then (contents) =>
            contents = contents.toString()
            # log CaffeineInit: compile: {sourceFile, sourceRoot, contents}
            metacompiler = new Metacompiler
            result = metacompiler.compile contents, {sourceFile, sourceRoot}

            @caffeineInits[sourceRoot] =
              compiler: metacompiler.compiler
              config: evalCapturingModuleExports result.compiled.js
        else
          # log CaffeineInit: noInit: {sourceFile, sourceRoot}
          false

  @findSourceRoot: (directory, rootFiles = @_sourceRootIndicatorFiles) =>
    FsPromise.stat directory
    .then (stat) =>
      directory = path.dirname directory unless stat.isDirectory()
      if (ret = @knownSourceRoots[directory])?
        ret
      else
        @_findRootR directory, rootFiles
        .then (sourceRoot) =>
          @knownSourceRoots[directory] = sourceRoot || false

  ######################
  # PRIVATE
  ######################

  # keyed by sourceRoot
  @_caffeineInits: {}
  @_knownSourceRoots: {}
  @_sourceRootIndicatorFiles: defaultSourceRootIndicatorFiles = ["package.json", @caffeineInitFileName]

  # for testing
  @_resetSourceRoots: =>
    @_caffeineInits = {}
    @_knownSourceRoots = {}
    @_sourceRootIndicatorFiles = defaultSourceRootIndicatorFiles

  @_findRootR: (directory, rootFiles) ->
    Promise.all array rootFiles, (file) ->
      FsPromise.exists path.join directory, file
    .then (rootFileExistResults) =>
      if find rootFileExistResults
        directory
      else if directory != "/" && present directory
        @_findRootR path.dirname(directory), rootFiles
      else
        null

