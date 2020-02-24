{defineModule, array, log, merge, present, find, each, w} = require 'art-standard-lib'
fs = require 'fs-extra'
path = require 'path'
CaffeineMc = require './namespace'
{
  getCaffeineInit, caffeineInitFileName, findSourceRoot
  getCaffeineInitSync, findSourceRootSync
} = require './SourceRoots'

defineModule module, class FileCompiler

  @compileFileSync: (sourceFile, options = {}) ->
    throw new Error "outputDirectory unsupported" if options.outputDirectory

    {source, sourceRoot} = options

    sourceRoot = if sourceRoot
      path.resolve sourceRoot
    else
      findSourceRootSync sourceFile

    caffeineInit = getCaffeineInitSync sourceRoot

    source ||= (fs.readFileSync sourceFile).toString()

    CaffeineMc.compile source, merge(options, {sourceFile, sourceRoot}), caffeineInit

  @compileFile: (sourceFile, options = {})->
    {outputDirectory, source} = options
    findSourceRoot sourceFile
    .then (sourceRoot) ->

      result =
        readCount: 0
        writeCount: 0
        outputFiles: []
        output: null

      fs.exists sourceFile
      .then (exists) ->
        throw new Error "sourceFile not found: #{sourceFile}" unless exists
        getCaffeineInit sourceRoot

      .then ({compiler, config}) ->

        p = if source
          Promise.resolve source
        else
          fs.readFile sourceFile

        p.then (source) ->
          source = source.toString()

          result.output = compiler.compile source, merge config, options, {sourceFile, sourceRoot}
          result.readCount++

          Promise.all array result.output.compiled, (text, extension) ->
            basename = path.basename sourceFile, path.extname sourceFile
            result.outputFiles.push outputFilename

            if outputDirectory
              result.writeCount++
              outputFilename = path.join outputDirectory, "#{basename}.#{extension}"
              fs.writeFile outputFilename, text
            else
              Promise.resolve text

      .then -> result
      .catch (e) ->
        log.error "error compiling: #{sourceFile}"
        throw e