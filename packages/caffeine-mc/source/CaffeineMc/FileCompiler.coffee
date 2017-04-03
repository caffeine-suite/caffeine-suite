{defineModule, array, log, merge, present, find, each, w} = require 'art-standard-lib'
FsPromise = require 'fs-promise'
path = require 'path'
CaffeineMc = require './namespace'
{
  getCaffeineInit, caffeineInitFileName, findSourceRoot
  getCaffeineInitSync, findSourceRootSync
} = require './SourceRoots'

defineModule module, class FileCompiler

  @compileFileSync: (sourceFile, options = {}) ->
    throw new Error "outputDirectory unsupported" if options.outputDirectory

    {source} = options

    caffeineInit = getCaffeineInitSync sourceRoot = findSourceRootSync sourceFile

    source ||= (FsPromise.readFileSync sourceFile).toString()

    CaffeineMc.compile source, merge(options, {sourceFile, sourceRoot}), caffeineInit

  @compileFile: (sourceFile, options = {})->
    {outputDirectory, prettier, source} = options
    findSourceRoot sourceFile
    .then (sourceRoot) ->

      result =
        readCount: 0
        writeCount: 0
        outputFiles: []
        output: null

      FsPromise.exists sourceFile
      .then (exists) ->
        throw new Error "sourceFile not found: #{sourceFile}" unless exists
        getCaffeineInit sourceRoot

      .then (caffeineInit) ->

        p = if source
          Promise.resolve source
        else
          FsPromise.readFile sourceFile

        p.then (source) ->
          source = source.toString()

          result.output = CaffeineMc.compile source, merge(options, {sourceFile, sourceRoot}), caffeineInit
          result.readCount++

          Promise.all array result.output.compiled, (text, extension) ->
            basename = path.basename sourceFile, path.extname sourceFile
            result.outputFiles.push outputFilename

            if prettier && extension == "js"
              try
                text = require("prettier").format text
              catch e
                log e.message
                return Promise.reject()


            if outputDirectory
              result.writeCount++
              outputFilename = path.join outputDirectory, "#{basename}.#{extension}"
              FsPromise.writeFile outputFilename, text
            else
              Promise.resolve()

      .then -> result
      .catch (e) ->
        log.error "error compiling: #{sourceFile}"
        throw e