{formattedInspect, defineModule, isString, upperCamelCase} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

fs = require 'fs'

farmhash = require 'farmhash'
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
    hashed = farmhash.hash64 source
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
