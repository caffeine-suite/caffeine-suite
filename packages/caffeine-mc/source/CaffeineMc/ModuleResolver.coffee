{
  defineModule, peek, Promise, dashCase, upperCamelCase,
  ErrorWithInfo, log, merge, present, find, each, w
  mergeInto
  currentSecond
  snakeCase
} = require 'art-standard-lib'
Path = require 'path'

{statSync, readdirSync} = require 'fs-extra'

dirReader = require './DirReader'
{cacheable} = require './WorkingCache'

normalizeName = cacheable "normalizeName", upperCamelCase

realRequire = eval 'require'

{findSourceRootSync} = require './SourceRoots'
###
2018-07-21 Optimization TODO:

I think if we simplify the semantics such that matches are defined as:
  normalizeName(dirName) == normalizeName(moduleName)
AND
  # this is the change:
  normalizeName(fileName.split(".")[0]) == normalizeName(moduleName)

Then we can probably make much better use of caching:
  Read the dir in and create a map:
    normalizedName: name
  (where normalizedName here means for files, we strip the extensions)

Then, we don't have to scan the dir every time!

NOTE: I think if we have >= 2 files which map to the same noramlized name
we encode that in the map somehow and can therefore raise the same
exception we already do.
###
defineModule module, class ModuleResolver

  # normalizeName = upperCamelCase

  ###
  IN:
    moduleBaseName: the string before the first '/'
    modulePathArray: every other sub-string, split by '/'
      This is only used to determine if there is addutional pathing
      that must be resolved. It makes a difference what the
      require path looks like.
  ###
  @getNpmPackageName: (moduleBaseName, modulePathArray) ->
    normalizedModuleName = upperCamelCase moduleBaseName
    try absolutePath = Path.dirname realRequire.resolve  name = dashCase moduleBaseName
    try absolutePath ?= Path.dirname realRequire.resolve name = snakeCase moduleBaseName
    try absolutePath ?= Path.dirname realRequire.resolve name = moduleBaseName
    catch
      throw new ErrorWithInfo "ModuleResolver: Could not find requested npm package: #{moduleBaseName}",
        npmPackageNamesAttempted: [moduleBaseName, dashCase moduleBaseName]

    if modulePathArray?.length > 0
      [requireString] = name.split '/'
      absolutePath = findSourceRootSync absolutePath
    else
      requireString = name
    {requireString, absolutePath}

  @findModuleSync: (moduleName, options) =>

    if /\//.test moduleName
      [base, modulePathArray...] = for mod in [denormalizedBase] = moduleName.split "/"
        out = normalizeName mod
        out
    else denormalizedBase = moduleName

    {requireString, absolutePath} = @_findModuleBaseSync denormalizedBase, modulePathArray, options

    if modulePathArray
      for sub in modulePathArray
        if matchingName = @_matchingNameInDirectorySync sub, absolutePath, options
          absolutePath  = Path.join absolutePath, matchingName
          requireString = "#{requireString}/#{matchingName}"
        else
          throw new ErrorWithInfo "Could not find pathed submodule inside npm package: #{requireString}",
            npmPackage: requireString
            localNpmPackageLocation: absolutePath
            submodulePath: sub
            normalized: normalizeName sub
            dirItems: dirReader.read absolutePath

    {requireString, absolutePath}

  @findModule: (moduleName, options) =>
    Promise.then => @findModuleSync moduleName, options

  maybeCouldHaveCached = {}
  @_findModuleBaseSync: (moduleBaseName, modulePathArray, options) =>
    normalizedModuleName = upperCamelCase moduleBaseName

    {sourceFile, sourceDir, sourceFiles, sourceRoot} = options if options
    sourceFile ||= sourceFiles?[0]

    if sourceFile || sourceDir
      directory = sourceDir = dirReader.resolve sourceDir || Path.dirname sourceFile
      sourceRoot ||= findSourceRootSync sourceDir
      sourceRoot = sourceRoot && dirReader.resolve sourceRoot
      absoluteSourceFilePath = sourceFile && Path.join sourceDir, Path.parse(sourceFile).name

    absolutePath = null
    shouldContinue = present sourceRoot
    while shouldContinue
      # log lookin: {normalizedModuleName, directory, options}
      if (matchingName = @_matchingNameInDirectorySync normalizedModuleName, directory, options) &&
          absoluteSourceFilePath != absolutePath = Path.join directory, matchingName
        shouldContinue = false

      else
        absolutePath = null
        if directory == sourceRoot
          if normalizedModuleName == normalizeName peek sourceRoot.split "/"
            absolutePath = sourceRoot
          shouldContinue = false

        else
          directory = Path.dirname directory

    if absolutePath
      requireString = Path.relative sourceDir, absolutePath
      switch requireString
        when "..", "." then requireString = "#{requireString}/"
      requireString = "./#{requireString}" unless requireString.match /^\./
      {requireString, absolutePath}
    else
      try
        @getNpmPackageName moduleBaseName, modulePathArray
      catch e
        if e.info
          mergeInto e.info, {sourceDir, sourceRoot}
        throw e

  ###
  Notes about "." names-with-dots.

    Essentially, dots are treated as word-boundaries.

    Files:
      We need to manage extensions. Current rule:
        Full match example: FooCaf matches foo.caf
        PartialMatch must fully match on dot-boundaries:
          Foo.BarFood.caf does NOT match FooBar, but does match FooBarFood
        PartialMatch must match starting at the first character:
          Foo.BarFood.caf does NOT match BarFood but does match Foo

    Dirs:
      Dirs must fully match:
        Art.Foo.Bar matches ArtFooBar BUT NOT ArtFoo

  Future:
    I'd like to be able to treat "."s in dir-names as-if they were '/' (slashes)
    Basically, this parallels how NeptuneNamespaces interprets them.
    It should work identically to as-if there were nested dirs.

    Given these files:

      MyFile1.caf
      Foo/Bar/MyFile2.caf

    OR these files:

      MyFile1.caf
      Foo.Bar/MyFile2.caf

    Then:
      # inside MyFile1.caf
      # this works:
      &Foo/Bar/MyFile2


  ###
  # returns false or name, if it matches
  @getMatchingName: getMatchingName = (normalizedModuleName, name, isDir) ->

    if normalizedModuleName == normalizedTestName = normalizeName name
      name

    else unless isDir
      if 0 == normalizedTestName.indexOf normalizedModuleName
        foundLegalStop = false
        offset = 0

        for stop, i in stops = name.split '.'
          stop = normalizeName stop
          offset += stop.length
          if normalizedModuleName.length == offset
            return stops.slice(0, i + 1).join '.'

      false

  # PRIVATE
  @_matchingNameInDirectorySync: (normalizedModuleName, directory, options) ->
    matchingName = null
    for name in dirReader.read directory
      if newMatchingName = getMatchingName normalizedModuleName, name, dirReader.isDir Path.join directory, name
        if matchingName && matchingName != newMatchingName
          throw new ErrorWithInfo """
            More than one matching module name with
            a) different actual base-names (#{matchingName} != #{newMatchingName}) and
            b) for the same normalized name (#{normalizedModuleName})
            """,
            directory:            directory
            firstMatch:           matchingName
            secondMatch:          newMatchingName
            normalizedModuleName: normalizedModuleName

        matchingName = newMatchingName
    matchingName
