{
  defineModule, peek, Promise, dashCase, upperCamelCase,
  ErrorWithInfo, log, merge, present, find, each, w
  mergeInto
} = require 'art-standard-lib'
Path = require 'path'

{statSync, readdirSync} = require 'fs-extra'
realDirReader =
  isDir: (entity) -> statSync(entity).isDirectory()
  read: readdirSync
  resolve: Path.resolve

realRequire = eval 'require'

{findSourceRootSync} = require './SourceRoots'

defineModule module, class ModuleResolver

  normalizeName = upperCamelCase

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
    try
      absolutePath = Path.dirname realRequire.resolve name = dashCase moduleBaseName
    catch
      try
        absolutePath = Path.dirname realRequire.resolve name = moduleBaseName
      catch
        throw new ErrorWithInfo "ModuleResolver: Could not find requested npm package: #{moduleBaseName}",
          npmPackageNamesAttempted: [moduleBaseName, dashCase moduleBaseName]

    requireString = if modulePathArray.length > 0
      Path.join name, absolutePath.slice (absolutePath.lastIndexOf name) + name.length
    else
      name
    {requireString, absolutePath}

  @findModuleSync: (moduleName, options) =>
    dirReader = options.dirReader ||= realDirReader

    [base, modulePathArray...] = for mod in [denormalizedBase] = moduleName.split "/"
      out = normalizeName mod
      out

    {requireString, absolutePath} = @_findModuleBaseSync denormalizedBase, modulePathArray, options

    for sub in modulePathArray
      if matchingName = @_matchingNameInDirectorySync sub, absolutePath, options
        absolutePath  = Path.join absolutePath, matchingName
        requireString = "#{requireString}/#{matchingName}"
      else
        throw new ErrorWithInfo "Could not find pathed submodule inside npm package.",
          npmPackage: requireString
          localNpmPackageLocation: absolutePath
          submodulePath: sub
          normalized: normalizeName sub
          dirItems: dirReader.read absolutePath

    {requireString, absolutePath}

  @findModule: (moduleName, options) =>
    Promise.then => @findModuleSync moduleName, options

  @_findModuleBaseSync: (moduleBaseName, modulePathArray, options) =>
    {dirReader} = options
    normalizedModuleName = upperCamelCase moduleBaseName

    {sourceFile, sourceDir, sourceFiles, sourceRoot} = options if options
    sourceFile ||= sourceFiles?[0]

    if sourceFile || sourceDir
      directory = sourceDir = dirReader.resolve sourceDir || Path.dirname sourceFile
      sourceRoot ||= findSourceRootSync sourceDir
      sourceRoot = sourceRoot && dirReader.resolve sourceRoot

    absolutePath = null
    shouldContinue = present sourceRoot
    while shouldContinue
      if matchingName = @_matchingNameInDirectorySync normalizedModuleName, directory, options
        absolutePath = Path.join directory, matchingName
        shouldContinue = false

      else if directory == sourceRoot
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
    # log getMatchingName: {normalizedModuleName, name, isDir, normalName: normalizeName name}
    if isDir
      if normalizedModuleName == normalName = normalizeName name
        return name
    else if 0 == index = (normalName = normalizeName name).indexOf normalizedModuleName
      foundLegalStop = false
      offset = 0

      for stop, i in stops = name.split '.'
        stop = upperCamelCase stop
        offset += stop.length
        if normalizedModuleName.length == offset
          return stops.slice(0, i + 1).join '.'

    false

  # PRIVATE
  @_matchingNameInDirectorySync: (normalizedModuleName, directory, options) ->
    {dirReader} = options
    matchingName = null
    each (dirReader.read directory), (name) ->
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
