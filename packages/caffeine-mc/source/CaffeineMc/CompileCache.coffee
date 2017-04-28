{formattedInspect, defineModule, isString, upperCamelCase, randomBase62Character} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

fs = require 'fs'

crypto = require 'crypto'
os = require 'os'
path = require 'path'

defineModule module, class CompileCache

  @getCompilerSignature: (compiler) ->
    {version} = compiler
    if isString(version) && name = compiler.getName?() || compiler.name
      "#{name}-#{version}"

  @getFileName: ({compiler, compilerSignature, source, sourceFile}) ->
    compilerSignature ||= @getCompilerSignature compiler
    unless compilerSignature && sourceFile && source
      throw new Error "expecting compilerSignature, source and sourceFile: " + formattedInspect
        source: source
        sourceFile: sourceFile
        compilerSignature: compilerSignature

    hashed = crypto.createHmac('sha256', "no need for a real secret").update(source).digest('base64').split("=")[0].replace /[\/+=]/g, "_"
    [basename] = path.basename(sourceFile).split '.'
    path.join os.tmpDir(), "CaffineMcCompileCache_#{compilerSignature}_#{upperCamelCase basename}_#{hashed}.json"

  @cache: ({compiler, source, sourceFile, compiled}) ->
    if compilerSignature = @getCompilerSignature compiler
      fileName = @getFileName {compilerSignature, source, sourceFile}
      cacheFileContents = JSON.stringify {
        source
        compiled
      }
      fs.writeSync fileName, cacheFileContents
      true

  @fetch: ({compiler, source, sourceFile}) ->
    if compilerSignature = @getCompilerSignature compiler
      fileName = @getFileName {compilerSignature, source, sourceFile}
      if fs.existsSync fileName
        cacheFileContents = fs.readSync fileName
        parsedContents = try
          JSON.parse cacheFileContents
          parsedContents.source == source && compiled
        catch
          null
