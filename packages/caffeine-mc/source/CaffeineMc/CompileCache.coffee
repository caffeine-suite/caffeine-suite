{array, merge, formattedInspect, log, defineModule, isString, upperCamelCase, randomBase62Character} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'
require 'colors'

fs = require 'fs-extra'
glob = require 'glob-promise'

crypto = require 'crypto'
os = require 'os'
path = require 'path'

defineModule module, class CompileCache extends BaseClass
  @compileCacheFileNameRoot: "CaffineMcCompileCache"

  @classGetter
    compileCacheFilePathRoot: ->
      @_compileCacheFilePathRoot ||= path.join os.tmpDir(), @compileCacheFileNameRoot

  @getCompilerSignature: (compiler) ->
    {version} = compiler
    if isString(version) && name = compiler.getName?() || compiler.name
      "#{name}-#{version}"

  @getFileName: ({compiler, compilerSignature, source, sourceFile, prettier}) ->
    compilerSignature ||= @getCompilerSignature compiler
    unless compilerSignature && sourceFile && source
      throw new Error "expecting compilerSignature, source and sourceFile: " + formattedInspect
        source: source
        sourceFile: sourceFile
        compilerSignature: compilerSignature

    hashed = crypto.createHmac('sha256', "no need for a real secret").update(source).digest('base64').split("=")[0].replace /[\/+=]/g, "_"
    [basename] = path.basename(sourceFile).split '.'
    "#{@compileCacheFilePathRoot}_#{compilerSignature}_#{upperCamelCase basename}_#{hashed}#{if prettier then '_prettier' else ''}.json"

  @cache: (compileResultAndInfo) ->
    {compiler, source, sourceFile, compiled, prettier} = compileResultAndInfo
    if compilerSignature = @getCompilerSignature compiler
      fileName = @getFileName {compilerSignature, source, sourceFile, prettier}
      cacheFileContents = JSON.stringify {
        source
        compiled
      }
      fs.writeFileSync fileName, cacheFileContents

    compileResultAndInfo

  @fetch: ({compiler, source, sourceFile, prettier}) ->
    if compilerSignature = @getCompilerSignature compiler
      fileName = @getFileName {compilerSignature, source, sourceFile, prettier}
      if fs.existsSync fileName
        cacheFileContents = fs.readFileSync fileName
        parsedContents = try JSON.parse cacheFileContents
        if parsedContents?.source == source
          merge parsedContents, fromCache: true

  @reset: ->
    glob @compileCacheFilePathRoot + "*"
    .then (list) ->
      Promise.all array list, (item) ->
        fs.unlink item
        .then ->
          log "cache-reset: ".gray + item.green + " (deleted)".gray

