{
  array, merge, formattedInspect, log, defineModule, isString, upperCamelCase, randomBase62Character
  consistentJsonStringify
  Promise
  currentSecond
} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'
{findSourceRootSync} = require './SourceRoots'

{findModuleSync} = require './ModuleResolver'

require 'colors'

fs = require 'fs-extra'
glob = require 'glob-promise'

crypto = require 'crypto'
os = require 'os'
path = require 'path'
###
cachedFileKey: (object)
  compiler:   (required, object) compiler
  source:     (required, string) source-code
  sourceFile: (required, string) source file path & name
  compilerOptions: (object) all options which affect the generated output

cachedFileKeyWithCompilerResults: (object)
  all the cachedFileKey fields
  compiled: (required, object) the compiler's results
###

defineModule module, class CompileCache extends BaseClass
  @compileCacheFileNameRoot: "CaffineMcCompileCache"

  @classGetter
    compileCachePathRoot: -> os.tmpdir()
    compileCacheFilePathRoot: ->
      @_compileCacheFilePathRoot ||= path.join @compileCachePathRoot, @compileCacheFileNameRoot

  @compilerSupportsCaching: (compiler) ->
    isString(compiler.version) && @getCompilerName compiler

  @getCompilerName: (compiler) -> compiler.getName?() || compiler.name

  @getCompilerSignature: (compiler) ->
    "#{@getCompilerName compiler}-#{compiler.version}"

  @makeSha256FilenameFriendly: (sha256String) -> sha256String.replace /[\/+=]/g, "-"

  @hashSource: (source) ->
    @makeSha256FilenameFriendly(
      crypto.createHmac 'sha256', "no need for a real secret"
      .update source
      .digest 'base64'
      .split("=")[0]
    )

  ###
  IN: cachedFileKey (see above)
  ###
  @getFileName: (cachedFileKey) ->
    {compiler, source, sourceFile, compilerOptions} = cachedFileKey
    unless compiler && sourceFile && source?
      throw new Error "expecting compiler, source and sourceFile: " + formattedInspect {compiler, source, sourceFile}

    return null unless @compilerSupportsCaching compiler

    sourceRoot = findSourceRootSync sourceFile
    relativeSourceFile = path.relative sourceRoot, sourceFile

    source = """
      # sourceFile: #{relativeSourceFile}
      # compilerOptions: #{consistentJsonStringify compilerOptions ? null}
      #{source}
      """

    [
      @compileCacheFilePathRoot
      path.basename(sourceRoot).replace /\./g, "-"
      path.basename(sourceFile).replace /\./g, "-"
      @getCompilerSignature compiler
      @hashSource source
    ].join("_") + ".json"

  ###
  IN: cachedFileKey (see above), but also with {source, compiled and props}
  ###
  @cache: (cachedFileKey) ->
    if fileName = @getFileName cachedFileKey
      {source, compiled, props} = cachedFileKey
      log caching: cachedFileKey.sourceFile if cachedFileKey.verbose
      fs.writeFileSync fileName, JSON.stringify merge {source, compiled, props}

    cachedFileKey

  ###
  IN: cachedFileKey (see above)
  ###
  @fetch: (cachedFileKey) ->
    start = currentSecond()
    if (fileName = @getFileName cachedFileKey) &&
        fs.existsSync(fileName)
      if (cacheContents = try JSON.parse fs.readFileSync fileName) &&
          cacheContents.source == cachedFileKey.source &&
          @verifyDependencies cachedFileKey, cacheContents.props
        cacheContents.fromCache = true
        log cached: "#{(currentSecond() - start) * 1000 | 0}ms " + cachedFileKey.sourceFile if cachedFileKey.verbose
        cacheContents
      # # debug caching:
      # else
      #   log CompileCache:
      #     cacheFileInvalid:
      #       cacheContents: cacheContents
      #       sourceMatch: cacheContents && cacheContents.source == cachedFileKey.source
      #       verifyDependencies: cacheContents && @verifyDependencies cachedFileKey, cacheContents.props

      #   null

  @verifyDependencies: (cachedFileKey, props) ->
    if moduleDependencies = props?.moduleDependencies
      for sourceString, cachedRequireString of moduleDependencies
        {requireString} = findModuleSync sourceString, sourceFile: cachedFileKey.sourceFile
        if requireString != cachedRequireString
          log CompileCache:
            message:      "moduleDependencies changed"
            sourceString: sourceString
            sourceFile:   cachedFileKey.sourceFile
            require:
              old: cachedRequireString
              new: requireString

          return false
      true
    else
      true

  # NOTE: for some reason when using mock-fs, we need to apply (Promise.resolve item) to glob's results
  @reset: (verbose) ->
    glob @compileCacheFilePathRoot + "*"
    .then (list) ->
      Promise.all array list, (item) ->
        Promise.resolve item
        .then (item) -> fs.unlink item
        .tap -> log "cache-reset: ".gray + item.green + " (deleted)".gray if verbose

