{
  defineModule, peek, Promise, dashCase, upperCamelCase,
  ErrorWithInfo, log, merge, present, find, each, w
} = require 'art-standard-lib'
fs = require 'fs-extra'
Path = require 'path'

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
        throw new Error "Could not find module: #{moduleBaseName} or #{dashCase moduleBaseName}"

    requireString = if modulePathArray.length > 0
      Path.join name, absolutePath.slice (absolutePath.lastIndexOf name) + name.length
    else
      name
    {requireString, absolutePath}

  @findModuleSync: (moduleName, options) =>
    [base, modulePathArray...] = for mod in [denormalizedBase] = moduleName.split "/"
      out = normalizeName mod
      out

    {requireString, absolutePath} = @_findModuleBaseSync denormalizedBase, modulePathArray, options

    for sub in modulePathArray
      if matchingName = @_matchingNameInDirectorySync sub, absolutePath
        absolutePath  = Path.join absolutePath, matchingName
        requireString = "#{requireString}/#{matchingName}"
      else
        throw new ErrorWithInfo "Could not find pathed module",
          npmName: requireString
          lookingIn: absolutePath
          lookingFor: sub
          normalized: normalizeName sub
          dirItems: fs.readdirSync absolutePath

    {requireString, absolutePath}

  @findModule: (moduleName, options) =>
    Promise.resolve @findModuleSync moduleName, options

  @_findModuleBaseSync: (moduleBaseName, modulePathArray, options) =>
    normalizedModuleName = upperCamelCase moduleBaseName

    {sourceFile, sourceDir, sourceFiles, sourceRoot} = options if options
    sourceFile ||= sourceFiles?[0]

    if sourceFile || sourceDir
      directory = sourceDir = Path.resolve sourceDir || Path.dirname sourceFile
      sourceRoot ||= findSourceRootSync sourceDir
      sourceRoot = sourceRoot && Path.resolve sourceRoot

    absolutePath = null
    shouldContinue = present sourceRoot
    while shouldContinue
      if matchingName = @_matchingNameInDirectorySync normalizedModuleName, directory
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
      @getNpmPackageName moduleBaseName, modulePathArray

  @getMatchingName: getMatchingName = (normalizedModuleName, name, isDir) ->
    if 0 == index = (normalName = normalizeName name).indexOf normalizedModuleName
      if isDir
        return if index + normalName.length == normalizedModuleName.length
          name
        else
          false

      foundLegalStop = false
      offset = 0

      for stop, i in stops = name.split '.'
        stop = upperCamelCase stop
        offset += stop.length
        if normalizedModuleName.length == offset
          return stops.slice(0, i + 1).join '.'

    false

  isDirectory = (entity) ->
    fs.statSync(entity).isDirectory()

  # PRIVATE
  @_matchingNameInDirectorySync: (normalizedModuleName, directory) ->
    matchingName = null
    each (fs.readdirSync directory), (name) ->
      if newMatchingName = getMatchingName normalizedModuleName, name, isDirectory Path.join directory, name
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
