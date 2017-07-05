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

  @getNpmPackageName: (moduleName) ->
    normalizedModuleName = upperCamelCase moduleName
    try
      absolutePath = Path.dirname realRequire.resolve name = dashCase moduleName
    catch
      try
        absolutePath = Path.dirname realRequire.resolve name = moduleName
      catch
        throw new Error "Could not find module: #{moduleName} or #{dashCase moduleName}"
    {requireString: name, absolutePath: absolutePath}

  @findModuleSync: (moduleName, options) =>
    [base, rest...] = for mod in [denormalizedBase] = moduleName.split "/"
      out = normalizeName mod
      out

    {requireString, absolutePath} = @_findModuleBaseSync denormalizedBase, options

    for sub in rest
      if matchingName = @_matchingNameInDirectorySync sub, absolutePath
        absolutePath          = Path.join absolutePath, matchingName
        requireString = "#{requireString}/#{matchingName}"
      else
        throw new ErrorWithInfo "Could not find pathed module",
          lookingIn: absolutePath
          require: requireString
          lookingFor: sub
          normalized: normalizeName sub

    {requireString, absolutePath}

  @findModule: (moduleName, options) =>
    Promise.resolve @findModuleSync moduleName, options

  @_findModuleBaseSync: (moduleName, options) =>
    normalizedModuleName = upperCamelCase moduleName

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
        if getMatchingName normalizedModuleName, peek sourceRoot.split "/"
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
      @getNpmPackageName moduleName

  @getMatchingName: getMatchingName = (normalizedModuleName, name) ->
    if 0 == (normalName = normalizeName name).indexOf normalizedModuleName
      foundLegalStop = false
      offset = 0
      for stop, i in stops = name.split '.'
        offset += stop.length
        if normalizedModuleName.length == offset
          return stops.slice(0, i + 1).join '.'

    false

  # PRIVATE
  @_matchingNameInDirectorySync: (normalizedModuleName, directory) ->
    matchingName = null
    each (fs.readdirSync directory), (name) ->
      if newMatchingName = getMatchingName normalizedModuleName, name
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
