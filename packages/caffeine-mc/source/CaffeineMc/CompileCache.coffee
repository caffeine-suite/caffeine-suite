{
  array, merge, formattedInspect, log, defineModule, isString, upperCamelCase, randomBase62Character
  consistentJsonStringify
} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'
{findSourceRootSync} = require './SourceRoots'

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
    compileCacheFilePathRoot: ->
      @_compileCacheFilePathRoot ||= path.join os.tmpdir(), @compileCacheFileNameRoot

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
    unless compiler && sourceFile && source
      throw new Error "expecting compiler, source and sourceFile: " + formattedInspect {compiler, source, sourceFile, compilerSignature}

    return null unless @compilerSupportsCaching compiler

    sourceRoot = findSourceRootSync sourceFile

    if compilerOptions
      source = "# compilerOptions: #{consistentJsonStringify compilerOptions}\n#{source}"

    [
      @compileCacheFilePathRoot
      path.basename(sourceRoot).replace /\./g, "-"
      path.basename(sourceFile).replace /\./g, "-"
      @getCompilerSignature compiler
      @hashSource source
    ].join("_") + ".json"

  ###
  IN: cachedFileKeyWithCompilerResults (see above)
  ###
  @cache: (cachedFileKeyWithCompilerResults) ->
    if fileName = @getFileName cachedFileKeyWithCompilerResults
      {source, compiled} = cachedFileKeyWithCompilerResults
      fs.writeFileSync fileName, JSON.stringify {source, compiled}

    cachedFileKeyWithCompilerResults

  ###
  IN: cachedFileKey (see above)
  ###
  @fetch: (cachedFileKey) ->
    if (fileName = @getFileName cachedFileKey) && fs.existsSync fileName
      parsedContents = try JSON.parse fs.readFileSync fileName
      if parsedContents?.source == cachedFileKey.source
        parsedContents.fromCache = true
        parsedContents

  @reset: ->
    glob @compileCacheFilePathRoot + "*"
    .then (list) ->
      Promise.all array list, (item) ->
        fs.unlink item
        .then ->
          log "cache-reset: ".gray + item.green + " (deleted)".gray

