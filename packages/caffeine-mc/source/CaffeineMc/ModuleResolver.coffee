{defineModule, Promise, dashCase, upperCamelCase, ErrorWithInfo, log, merge, present, find, each, w} = require 'art-standard-lib'
FsPromise = require 'fs-promise'
Path = require 'path'

realRequire = eval 'require'

{findSourceRootSync} = require './SourceRoots'

defineModule module, class ModuleResolver

  normalizeName = upperCamelCase

  @getNpmPackageName: (moduleName) ->
    normalizedModuleName = upperCamelCase moduleName
    path = Path.dirname realRequire.resolve name = dashCase normalizedModuleName
    {requireString: name, path: path}

  @findModuleSync: (moduleName, options) =>
    [base, rest...] = for mod in moduleName.split "/"
      normalizeName mod

    base = normalizeName base
    {requireString, path} = @_findModuleBaseSync base, options
    for sub in rest
      if matchingName = @_matchingNameInDirectorySync sub, path
        path          = Path.join path, matchingName
        requireString = "#{requireString}/#{matchingName}"
      else
        throw new ErrorWithInfo "Could not find pathed module",
          lookingIn: path
          require: requireString
          lookingFor: sub
          normalized: normalizeName sub

    {requireString, path}

  @findModule: (moduleName, options) =>
    Promise.resolve @findModuleSync moduleName, options

  @_findModuleBaseSync: (moduleName, options) =>
    normalizedModuleName = upperCamelCase moduleName

    {sourceFile, sourceDir, sourceFiles, sourceRoot} = options if options

    if sourceFile || sourceDir
      directory = sourceDir ||= Path.resolve Path.dirname sourceFile
      sourceRoot ||= findSourceRootSync sourceDir

    path = null
    shouldContinue = present sourceRoot
    while shouldContinue
      if matchingName = @_matchingNameInDirectorySync normalizedModuleName, directory
        path = Path.join directory, matchingName
        shouldContinue = false

      else if directory == sourceRoot
        shouldContinue = false

      else
        directory = Path.dirname directory

    if path
      requireString = Path.relative sourceDir, path
      requireString = "./#{requireString}" unless requireString.match /^\./
      {requireString, path}
    else
      @getNpmPackageName normalizedModuleName

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
