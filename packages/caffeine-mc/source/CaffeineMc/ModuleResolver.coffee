{defineModule, Promise, dashCase, upperCamelCase, ErrorWithInfo, log, merge, present, find, each, w} = require 'art-standard-lib'
FsPromise = require 'fs-promise'
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
      normalizeName mod

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
      directory = sourceDir ||= Path.resolve Path.dirname sourceFile
      sourceRoot ||= findSourceRootSync sourceDir
      sourceRoot = Path.resolve sourceRoot

    absolutePath = null
    shouldContinue = present sourceRoot
    while shouldContinue
      if matchingName = @_matchingNameInDirectorySync normalizedModuleName, directory
        absolutePath = Path.join directory, matchingName
        shouldContinue = false

      else if directory == sourceRoot
        shouldContinue = false

      else
        directory = Path.dirname directory

    if absolutePath
      requireString = Path.relative sourceDir, absolutePath
      switch requireString
        when ".." then requireString = "../../#{Path.basename absolutePath}"
        when "."  then requireString = "../#{Path.basename absolutePath}"
      requireString = "./#{requireString}" unless requireString.match /^\./
      {requireString, absolutePath}
    else
      @getNpmPackageName moduleName

  # PRIVATE
  @_matchingNameInDirectorySync: (normalizedModuleName, directory) ->
    matchingName = null
    each (FsPromise.readdirSync directory), (name) ->
      [basename] = name.split '.'
      if normalizedModuleName == normalizeName basename
        if matchingName && matchingName != basename
          throw new ErrorWithInfo """
            More than one matching module name with
            a) different actual names (#{matchingName} != #{basename}) and
            b) the same normalized name (#{normalizedModuleName})
            """,
            directory: directory
            firstMatch: matchingName
            secondMatch: name
            normalizedModuleName: normalizedModuleName

        # TODO: should return 'name' instead of basename if its a directory
        matchingName = basename
    matchingName
