{defineModule, array, log, merge, present, find, each, w} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'
fs = require 'fs-extra'
path = require 'path'

defineModule module, class SourceRoots extends BaseClass

  @classGetter "sourceRootIndicatorFiles knownSourceRoots caffeineInits",
    caffeineInitFileName: -> "caffeine-mc.config.caf"

  _Metacompiler = null
  newMetacompiler = ->
    new _Metacompiler ?= require './Metacompiler'


  # TODO - capture and report syntax errors in source better
  evalCapturingModuleExports = (source) ->
    global.__caffeineMcModule = {}
    try
      eval "
        (function(module){
          #{source}
        })(__caffeineMcModule);
        "
    catch e
      log.error "ERROR evalCapturingModuleExports":
        source: source
        error: e

      throw e

    {exports} = global.__caffeineMcModule || {}
    global.__caffeineMcModule = null
    exports

  # OUT: promise.then (caffeineInit) ->
  #   caffeineInit is a js string or false
  @getCaffeineInit: (sourceRoot = process.cwd()) =>
    # log getCaffeineInit: {sourceRoot}
    if (res = @caffeineInits[sourceRoot])?
      Promise.resolve res
    else
      fs.exists sourceFile = path.join sourceRoot, @caffeineInitFileName
      .then (exists) =>
        contentsPromise = if exists
          fs.readFile sourceFile
          .then (contents) =>
            contents = contents.toString()
        else
          Promise.resolve false

        contentsPromise.then (contents) =>
          metacompiler = newMetacompiler()
          @caffeineInits[sourceRoot] =
            compiler: metacompiler
            config: if result = contents && metacompiler.compile contents, {sourceFile, sourceRoot}
                evalCapturingModuleExports result.compiled.js
              else
                {}

  @getCaffeineInitSync: (sourceRoot) =>
    throw new Error "no sourceRoot" unless sourceRoot
    if (res = @caffeineInits[sourceRoot])?
      res
    else
      if fs.existsSync sourceFile = path.join sourceRoot, @caffeineInitFileName
        contents = fs.readFileSync(sourceFile).toString()

        metacompiler = newMetacompiler()
        result = metacompiler.compile contents, {sourceFile, sourceRoot}

        @caffeineInits[sourceRoot] =
          compiler: metacompiler.compiler
          config: evalCapturingModuleExports result.compiled.js

      else
        false

  @findSourceRoot: (directory, rootFiles = @_sourceRootIndicatorFiles) =>
    directory = path.resolve directory
    fs.stat directory
    .then (stat) =>
      directory = path.dirname directory unless stat.isDirectory()
      if (ret = @knownSourceRoots[directory])?
        ret
      else
        @_findRootR directory, rootFiles
        .then (sourceRoot) =>
          @knownSourceRoots[directory] = sourceRoot || false

  @findSourceRootSync: (directory, rootFiles = @_sourceRootIndicatorFiles) =>
    directory = path.resolve directory
    stat = fs.statSync directory
    directory = path.dirname directory unless stat.isDirectory()
    if (ret = @knownSourceRoots[directory])?
      ret
    else
      sourceRoot = @_findRootSyncR directory, rootFiles
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
      fs.exists path.join directory, file
    .then (rootFileExistResults) =>
      if find rootFileExistResults
        directory
      else if directory != "/" && present directory
        @_findRootR path.dirname(directory), rootFiles
      else
        null

  @_findRootSyncR: (directory, rootFiles) ->
    rootFileExistResults = array rootFiles, (file) ->
      fs.existsSync path.join directory, file
    if find rootFileExistResults
      directory
    else if directory != "/" && present directory
      @_findRootSyncR path.dirname(directory), rootFiles
    else
      null

