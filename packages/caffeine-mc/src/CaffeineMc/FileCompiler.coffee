{defineModule, array, log, merge, present, find, each, w} = require 'art-foundation'
FsPromise = require 'fs-promise'
path = require 'path'
CaffeineMc = require './namespace'
{getCaffeineInit, caffeineInitFileName, findSourceRoot} = require './SourceRoots'

defineModule module, class FileCompiler

  @compileFile: (sourceFile, options = {})->
    {outputDirectory, prettier} = options
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

        FsPromise.readFile sourceFile
        .then (contents) ->
          contents = contents.toString()

          result.output = CaffeineMc.compile contents, merge(options, {sourceFile, sourceRoot}), caffeineInit
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